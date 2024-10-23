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
    
    # def list(self, request, *args, **kwargs):
    #     for instance in self.queryset:
    #         leave_balance = 0

    #         if (timezone.now() - instance.date_joined).days >= 365:
    #             worked_year = (timezone.now() - instance.date_joined).days // 365
    #             leave_balance = 15 + math.ceil(worked_year / 2)
    #             leave_balance = min(leave_balance, 30)
            
    #         instance.annual_leave_balance = leave_balance
    #         instance.save()
            
    #     queryset = self.filter_queryset(self.get_queryset())
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)
    
    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()

    #     #Calculate annual leave balance
    #     leave_balance = 0
    #     if (timezone.now() - instance.date_joined).days >= 365:
    #         worked_year = (timezone.now() - instance.date_joined).days // 365
    #         leave_balance = 15 + math.ceil(worked_year / 2)
    #         leave_balance = min(leave_balance, 30)
            
    #     instance.annual_leave_balance = leave_balance
    #     instance.save()

    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)
    


