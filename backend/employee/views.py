from .models import Employee
from rest_framework import viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from .serializers import EmployeeSerializer
from django.http import JsonResponse

class EmployeeView(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

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

