from .models import Company
from rest_framework import viewsets
from .serializers import CompanySerializer

class CompanyView(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
