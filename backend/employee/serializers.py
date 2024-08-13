from rest_framework import serializers
from .models import Employee
from lookup.serializers import DepartmentSerializer, JobPositionSerializer
from lookup.models import JobPosition, Department

class EmployeeSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    job_position = JobPositionSerializer(read_only=True)
    
    applicant_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), write_only=True, source='department'
    )

    recruitment_id = serializers.PrimaryKeyRelatedField(
        queryset=JobPosition.objects.all(), write_only=True, source='job_position'
    )

    class Meta:
        model = Employee
        fields = '__all__'