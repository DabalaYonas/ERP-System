from rest_framework import viewsets
from . import serializers, models

class DepartmentView(viewsets.ModelViewSet):
    serializer_class = serializers.DepartmentSerializer
    queryset = models.Department.objects.all()


class JobPositionView(viewsets.ModelViewSet):
    serializer_class = serializers.JobPositionSerializer
    queryset = models.JobPosition.objects.all()


class BankAccountView(viewsets.ModelViewSet):
    serializer_class = serializers.BankAccountSerializer
    queryset = models.BankAccount.objects.all()


class ContractTypeView(viewsets.ModelViewSet):
    serializer_class = serializers.ContractTypeSerializer
    queryset = models.ContractType.objects.all()


class DegreeView(viewsets.ModelViewSet):
    serializer_class = serializers.DegreeSerializer
    queryset = models.Degree.objects.all()

class StageView(viewsets.ModelViewSet):
    serializer_class = serializers.StageSerializer
    queryset = models.Stage.objects.all()

class CurrencyView(viewsets.ModelViewSet):
    serializer_class = serializers.CurrencySerializer
    queryset = models.Currency.objects.all()
