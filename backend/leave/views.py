from .models import Leave, LeaveType, PublicHoliday, LeaveBalance, LeaveRequestAttachment
from .serializers import LeaveSerializer, LeaveTypeSerializer, PublicHolidaySerializer, LeaveBalanceSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from employee.models import Employee
from datetime import datetime
from django.db.models import Count, Q
from rest_framework.views import APIView

class LeaveSummaryView(APIView):
    def get(self, request):
        leave_summary = {
            "total_leaves": Leave.objects.count(),
            "approved_leaves": Leave.objects.filter(status="Approved").count(),
            "pending_leaves": Leave.objects.filter(status="Pending").count(),
            "rejected_leaves": Leave.objects.filter(status="Rejected").count(),
            "annual_leaves": Leave.objects.filter(status="Approved", leave_type__is_annual=True).count(),
            "sick_leaves": Leave.objects.filter(status="Approved", leave_type__name="Sick Leave").count(),
        }
        
        # Optionally add employee-specific data
        employee_leave_summary = (
            Leave.objects.values('employee__name')
            .annotate(
                total_leaves=Count('id'),
                approved_leaves=Count('id', filter=Q(status="Approved")),
                pending_leaves=Count('id', filter=Q(status="Pending")),
                rejected_leaves=Count('id', filter=Q(status="Rejected")),
            )
        )

        return Response({
            "overall_summary": leave_summary,
            "employee_leave_summary": employee_leave_summary,
        })
    
class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer

    @action(detail=False, methods=['get'])
    def pending(self, request):
        pending_leaves = Leave.objects.filter(status='Pending')
        serializer = LeaveSerializer(pending_leaves, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def approved(self, request):
        approved_leaves = Leave.objects.filter(status='Approved')
        serializer = LeaveSerializer(approved_leaves, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        employee_id = request.data.get('employee_id')
        employee = Employee.objects.get(id=employee_id)
        leave_type = LeaveType.objects.get(id=request.data.get('leave_type_id'))

        start_date = datetime.strptime(request.data.get('start_date'), '%Y-%m-%d').date()
        end_date = datetime.strptime(request.data.get('end_date'), '%Y-%m-%d').date()

        files = request.FILES.getlist('documents')

        overlapping_leaves = Leave.objects.filter(
            employee=employee,
            status='Approved',
            start_date__lte=end_date,
            end_date__gte=start_date
        )
        
        if overlapping_leaves.exists():
            return Response({"error": "You already have approved leave during the requested dates."}, status=status.HTTP_400_BAD_REQUEST)

        leave_serializer = self.get_serializer(data=request.data)
        leave_serializer.is_valid(raise_exception=True)
        leave = leave_serializer.save()

        days_requested = (end_date - start_date).days + 1
        leave_balance = LeaveBalance.objects.filter(employee=employee, leave_type=leave_type).first()
        
        if leave_balance and leave_balance.balance >= days_requested:
            leave_balance.balance -= days_requested
            leave_balance.save()

            for file in files:
                LeaveRequestAttachment.objects.create(leave_request=leave, file=file)

            headers = self.get_success_headers(leave_serializer.data)
            return Response(leave_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({"error": "Insufficient leave balance"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    def approve(self, request, pk=None):
        leave = self.get_object()
        leave.status = 'Approved'
        leave.approved_at = timezone.now()
        leave.save()
        return Response({'status': 'Leave approved'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def reject(self, request, pk=None):
        leave = self.get_object()
        leave_type = leave.leave_type
        employee = leave.employee

        days_requested = (leave.end_date - leave.start_date).days + 1    
        try:
            leave_balance = LeaveBalance.objects.get(employee=employee, leave_type=leave_type)
            leave_balance.balance += days_requested
            leave_balance.save()
        except:
            pass

        leave.status = 'Rejected'
        leave.save()
        return Response({'status': 'Leave rejected'}, status=status.HTTP_200_OK)

class LeaveBalanceViewSet(viewsets.ModelViewSet):
    queryset = LeaveBalance.objects.all()
    serializer_class = LeaveBalanceSerializer

class LeaveTypeView(viewsets.ModelViewSet):
    serializer_class = LeaveTypeSerializer
    queryset = LeaveType.objects.all()

class PublicHolidayView(viewsets.ModelViewSet):
    serializer_class = PublicHolidaySerializer
    queryset = PublicHoliday.objects.all()
