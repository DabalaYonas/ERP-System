from rest_framework import serializers
from .models import Leave, LeaveType, PublicHoliday, LeaveBalance, LeaveRequestAttachment
from employee.models import Employee
from employee.serializers import EmployeeSerializer

class LeaveRequestAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequestAttachment
        fields = ['id', 'file', 'uploaded_at']

class PublicHolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicHoliday
        fields = "__all__"

class LeaveTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveType
        fields = "__all__"

class LeaveBalanceSerializer(serializers.ModelSerializer):
    leave_type = LeaveTypeSerializer(read_only=True)
    leave_type_id = serializers.PrimaryKeyRelatedField(queryset=LeaveType.objects.all(), write_only=True, source="leave_type")

    employee = EmployeeSerializer(read_only=True)
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), write_only=True, source="employee")
    class Meta:
        model = LeaveBalance
        fields = '__all__'

class LeaveSerializer(serializers.ModelSerializer):
    leave_type = LeaveTypeSerializer(read_only=True)
    leave_type_id = serializers.PrimaryKeyRelatedField(queryset=LeaveType.objects.all(), write_only=True, source="leave_type")
    
    employee = EmployeeSerializer(read_only=True)
    employee_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), write_only=True, source="employee")
    
    attachments = LeaveRequestAttachmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Leave
        fields = "__all__"