from rest_framework import serializers
from .models import Attendance
from employee.serializers import EmployeeSerializer
from employee.models import Employee

class AttendanceSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    employee_id = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), write_only=True, source='employee'
    )

    class Meta:
        model = Attendance
        fields = '__all__'