from .models import Contract
from rest_framework import viewsets
from .serializers import ContractSerializer

class ContractView(viewsets.ModelViewSet):
    serializer_class = ContractSerializer
    queryset = Contract.objects.all()

