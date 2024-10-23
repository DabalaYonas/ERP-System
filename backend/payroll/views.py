from .models import Payroll
from rest_framework import viewsets
from .serializers import PayrollSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, date
from django.shortcuts import get_object_or_404
from rest_framework import status
from employee.models import Employee
from employee.serializers import EmployeeSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def process_payroll(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        employee_ids = data.get('employee_ids', [])
        payPeriod = data.get('payPeriod', "")

        for employee_id in employee_ids:
            employee = Employee.objects.get(id=employee_id)
            payroll = Payroll(employee=employee, 
                              payPeriod=payPeriod,
                              basic_salary=employee.basic_salary, 
                              non_tax_transp_allow=employee.non_tax_transp_allow,
                              transp_allow=employee.transp_allow,
                              tele_allow=employee.tele_allow)
            payroll.save()

        return JsonResponse({'message': 'Payroll processed successfully', 'processed_employees': employee_ids})
    return JsonResponse({'error': 'Invalid request'}, status=400)

@api_view(['GET'])
def monthly_payroll(request):
    date = request.GET.get("date", None)
    total_payment = []
    payrolls = Payroll.objects.filter(payPeriod=date).all() if date else Payroll.objects.all()
    if payrolls:
        for payroll in payrolls:
            total_payment.append({str(payroll.payPeriod): payroll.net_salary})

    return Response(tuple(total_payment))   


@api_view(['GET'])
def ready_payroll_view(request):
    payPeriod = request.GET.get("payPeriod", "")
    
    user = request.user      
    company_id = user.company.id
    employee = Employee.objects.filter(company=company_id)
    
    ready_employees = employee.exclude(
        payroll__payPeriod=payPeriod,
    )

    calculatedPayroll = []
    for employee in ready_employees:
        new_payroll = Payroll(employee=employee, 
                              payPeriod=datetime.now().date(), 
                              basic_salary=employee.basic_salary, 
                              non_tax_transp_allow=employee.non_tax_transp_allow,
                              transp_allow=employee.transp_allow,
                              tele_allow=employee.tele_allow)
        
        new_payroll.calculate_net_salary()
        calculatedPayroll.append(new_payroll)

    serializer = PayrollSerializer(calculatedPayroll, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def payslip_view(request, payroll_id):
    payroll = get_object_or_404(Payroll, pk=payroll_id)
    payslip = payroll.generate_payslip()
    serializer = PayrollSerializer(payslip)
    return Response(serializer.data)


class PayrollView(viewsets.ModelViewSet):
    serializer_class = PayrollSerializer
    queryset = Payroll.objects.all()

