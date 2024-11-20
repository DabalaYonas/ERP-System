from .models import Payroll
from rest_framework import viewsets
from .serializers import PayrollSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from employee.models import Employee
from employee.serializers import EmployeeSerializer
from attendance.models import Attendance
from attendance.serializers import AttendanceSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import datetime
from django.db.models import Sum, Avg, Max, Min
from utils.decorators import role_required

@api_view(['POST'])
def process_payroll(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        payrollsData = data.get('payrollsData', [])
        payPeriod = data.get('payPeriod', "")        

        for payrollData in payrollsData:
            employee = Employee.objects.get(id=payrollData.get("id"))
            payroll = Payroll(employee=employee, 
                              payPeriod=payPeriod,
                              basic_salary=employee.basic_salary, 

                              non_tax_transp_allow=payrollData.get("non_tax_transp_allow", 0),
                              transp_allow=payrollData.get("transp_allow", 0),
                              tele_allow=payrollData.get("tele_allow", 0),
                              pos_allow=payrollData.get("pos_allow", 0),

                              penalty=payrollData.get("penalty", 0),
                              staff_loan=payrollData.get("staff_loan", 0),
                              cost_sharing=payrollData.get("cost_sharing", 0),
                              other_deductions=payrollData.get("other_deductions", 0),
                              )
            payroll.save()

        return JsonResponse({'message': 'Payroll processed successfully', 'processed_employees': payrollsData})
    return JsonResponse({'error': 'Invalid request'}, status=400)

@api_view(['GET'])
def payroll_summary(request):
    company_id = request.user.company.id
    payPeriod = request.GET.get("payPeriod", datetime.date.today().strftime("%B %Y"))
    total_employees = Employee.objects.filter(company_id=company_id).count()
    processed_employees = Payroll.objects.filter(payPeriod=payPeriod)
    processed_count = processed_employees.count()
    unprocessed_employees = total_employees - processed_count
    
    total_payroll_costs = processed_employees.aggregate(Sum('net_salary'))['net_salary__sum'] or 0
    average_salary = processed_employees.aggregate(Avg('net_salary'))['net_salary__avg'] or 0
    highest_salary = processed_employees.aggregate(Max('net_salary'))['net_salary__max'] or 0
    lowest_salary = processed_employees.aggregate(Min('net_salary'))['net_salary__min'] or 0

    summary = {
        'total_employees': total_employees,
        'processed_employees': processed_count,
        'unprocessed_employees': unprocessed_employees,
        'total_payroll_costs': total_payroll_costs,
        'average_salary': average_salary,
        'highest_salary': highest_salary,
        'lowest_salary': lowest_salary,
    }

    return Response(summary)

@api_view(['GET'])
def ready_payroll_view(request):
    payPeriod = request.GET.get("payPeriod", datetime.date.today().strftime("%B %Y"))    
    user = request.user
    company_id = user.company.id
    employees = Employee.objects.filter(company=company_id)
    
    unprocessed_employees = employees.exclude(
        payroll__payPeriod=payPeriod,
    )

    pending_payroll = []
    for employee in unprocessed_employees:

        today = datetime.date.today()
        start_date = today - datetime.timedelta(days=30)
        
        if not start_date or not today:
            return JsonResponse({"error": "Invalid or missing date range."}, status=400)
        
        attendance_records = Attendance.objects.filter(
            employee=employee,
            checkIn__date__gte=start_date,
            checkOut__date__lte=today
        )
        
        attendance_data = AttendanceSerializer(attendance_records, many=True).data
        
        total_hours = sum(record['total_hours'] for record in attendance_data)
        total_overtime = sum(record['overtime'] for record in attendance_data)

        pending_payroll.append(
            {
                'payPeriod': payPeriod,
                'employee': EmployeeSerializer(employee).data,
                "total_hours": total_hours,
                "total_overtime": total_overtime,
            }
        )

    return JsonResponse(pending_payroll, safe=False, status=status.HTTP_200_OK)

@role_required("HR")
@api_view(['GET'])
def payslip_view(request, payroll_id):
    payroll = get_object_or_404(Payroll, pk=payroll_id)
    payslip = payroll.generate_payslip()
    serializer = PayrollSerializer(payslip)
    return Response(serializer.data)

class PayrollView(viewsets.ModelViewSet):
    serializer_class = PayrollSerializer
    queryset = Payroll.objects.all()

