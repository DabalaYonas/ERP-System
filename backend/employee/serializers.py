from rest_framework import serializers
from .models import Employee
from lookup.serializers import DepartmentSerializer, JobPositionSerializer, BankAccountSerializer
from lookup.models import JobPosition, Department, BankAccount
from company.models import Company
from company.serializers import CompanySerializer
from rest_framework.exceptions import ValidationError

class EmployeeSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    job_position = JobPositionSerializer(read_only=True)
    # bank_acc = BankAccountSerializer(read_only=True)
    # company = CompanySerializer(read_only=True)
    # company_id = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), write_only=True, source="company")
    
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), write_only=True, allow_null=True, source='department'
    )

    job_position_id = serializers.PrimaryKeyRelatedField(
        queryset=JobPosition.objects.all(), write_only=True, allow_null=True, source='job_position'
    )

    # bank_acc_id = serializers.PrimaryKeyRelatedField(
    #     queryset=BankAccount.objects.all(), write_only=True, allow_null=True, source='bank_acc'
    # )
    
    class Meta:
        model = Employee
        fields = '__all__'