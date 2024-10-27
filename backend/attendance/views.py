from rest_framework import viewsets, status
from .models import Attendance
from .serializers import AttendanceSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils import timezone
from .models import Attendance
from django.utils import timezone
from employee.models import Employee

@api_view(['POST'])
def check_in(request):
    data = request.data
    employee_id = data.get("employee_id")
    employee = Employee.objects.get(id=employee_id)
    date = data.get("date", timezone.now().date())
    check_in = data.get("check_in", timezone.now())
    
    attendance, created = Attendance.objects.get_or_create(employee=employee, date=date)

    if attendance.checkIn is None:
        attendance.checkIn = check_in
        attendance.save()

        return Response({"message": "Checked in successfully"}, status=status.HTTP_200_OK)
    return Response({"message": "Already checked in"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def start_break(request):
    data = request.data
    employee_id = data.get("employee_id")
    employee = Employee.objects.get(id=employee_id)
    date = data.get("date", timezone.now().date())
    start_break = data.get("start_break", timezone.now())
    attendance = Attendance.objects.get(employee=employee, date=date)

    if attendance.break_start is None:
        attendance.break_start = start_break
        attendance.save()
        return Response({"message": "Break started successfully"}, status=status.HTTP_200_OK)
    return Response({"message": "Break already started"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def end_break(request):
    data = request.data
    employee_id = data.get("employee_id")
    employee = Employee.objects.get(id=employee_id)
    date = data.get("date", timezone.now().date())
    end_break = data.get("end_break", timezone.now())
    attendance = Attendance.objects.get(employee=employee, date=date)
    if attendance.break_start and attendance.break_end is None:
        attendance.break_end = end_break
        attendance.save()
        return Response({"message": "Break ended successfully"}, status=status.HTTP_200_OK)
    return Response({"message": "No break to end or already ended"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def check_out(request):
    data = request.data
    employee_id = data.get("employee_id")
    employee = Employee.objects.get(id=employee_id)
    date = data.get("date", timezone.now().date())
    check_out = data.get("check_out", timezone.now())
    attendance = Attendance.objects.get(employee=employee, date=date)
    if attendance.checkOut is None:
        attendance.checkOut = check_out
        attendance.save()
        return Response({"message": "Checked out successfully"}, status=status.HTTP_200_OK)
    return Response({"message": "Already checked out"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def attendance_summary(request):
    date = request.GET.get("date", timezone.now().date())

    attendances = Attendance.objects.filter(date=date)

    total_present = attendances.filter(checkIn__isnull=False).count()
    # total_absent = attendances.filter(checkIn__isnull=True).count()
    total_late = sum(1 for a in attendances if a.get_status() == 'Late')
    total_on_time = sum(1 for a in attendances if a.get_status() == 'On Time')


    today_attend = Attendance.objects.filter(date=date)
    on_time = today_attend.filter(status="ON_TIME").count()
    late = today_attend.filter(status="LATE").count()
    
    company_id = request.user.company.id
    total_absent = Employee.objects.filter(company=company_id).count() - today_attend.count()

    return Response({
        'total_attend':today_attend.count(),
        'total_absent': total_absent,
        'total_on_time': total_on_time,
        'total_late': total_late,
    })

class AttendaceView(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer
    queryset = Attendance.objects.all()
    
       
