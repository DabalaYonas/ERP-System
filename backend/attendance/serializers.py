from rest_framework import serializers
from .models import Attendance
from employee.serializers import EmployeeSerializer
from employee.models import Employee

class AttendanceSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    employee_id = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), write_only=True, source='employee'
    )

    total_hours = serializers.SerializerMethodField()
    overtime = serializers.SerializerMethodField()

    class Meta:
        model = Attendance
        fields = ['id', 'employee_id', 'employee', 'date', 'checkIn', 'checkOut', 'break_start', 'break_end', 'total_hours', 'overtime']
        read_only_fields = ['total_hours', 'overtime']

    def get_total_hours(self, obj):
        return obj.total_hours
    
    def get_overtime(self, obj):
        return obj.overtime