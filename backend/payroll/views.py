from .models import Payslip, Payroll
from rest_framework import viewsets
from .serializers import PayslipSerializer, PayrollSerializer

class PayrollView(viewsets.ModelViewSet):
    serializer_class = PayrollSerializer
    queryset = Payroll.objects.all()

class PaysliptView(viewsets.ModelViewSet):
    serializer_class = PayslipSerializer
    queryset = Payslip.objects.all()
