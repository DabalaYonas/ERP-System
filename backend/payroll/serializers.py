from rest_framework import serializers
from .models import Payroll
from employee.serializers import EmployeeSerializer
from employee.models import Employee

class PayrollSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    employee_id = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), write_only=True, source='employee'
    )

    class Meta:
        model = Payroll
        fields = "__all__"