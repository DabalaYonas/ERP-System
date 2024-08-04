from rest_framework import serializers
from .models import Employee
from lookup.serializers import DepartmentSerializer, JobPositionSerializer

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'