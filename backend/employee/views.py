from .models import Employee
from rest_framework import viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from .serializers import EmployeeSerializer
from django.http import JsonResponse
from django.utils import timezone
import math
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def employee_count(request):
    user = request.user
    company_id = user.company.id
    count = Employee.objects.filter(company=company_id).count()
    return Response({'total_employees': count})

class EmployeeView(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
    
    def perform_create(self, serializer): 
        user = self.request.user
        
        company_id = user.company.id

        data = serializer.validated_data
        data["company_id"] = company_id

        serializer.save()
    
    def get_queryset(self):        
        user = self.request.user      
        company_id = user.company.id

        return Employee.objects.filter(company=company_id)
    


