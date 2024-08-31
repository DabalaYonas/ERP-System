from .models import Employee
from rest_framework import viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from .serializers import EmployeeSerializer
from django.http import JsonResponse
from user.models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt

class EmployeeView(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

    def perform_create(self, serializer): 
        token = self.request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("UnAuthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("UnAuthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        
        company_id = user.company.id

        data = serializer.validated_data
        data["company_id"] = company_id
        serializer.save()

    def post(self, request):
        data = request.data
        serializer = EmployeeSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Employee Added Successfully", safe=False)
        return JsonResponse("Failed to Add Employee", safe=False)

    def put(self, request, id=None):
        data_to_update = Employee.objects.get(id=id)
        serializer = EmployeeSerializer(
            instance=data_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Employee updated Successfully", safe=False)
        return JsonResponse("Failed To Update Employee", safe=False)
    
    def get_queryset(self):
        token = self.request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("UnAuthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("UnAuthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        
        company_id = user.company.id

        return Employee.objects.filter(company=company_id)

