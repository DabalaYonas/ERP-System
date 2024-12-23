from rest_framework import serializers
from .models import Company
from lookup.models import Currency
from lookup.serializers import CurrencySerializer

class CompanySerializer(serializers.ModelSerializer):
    currency = CurrencySerializer(read_only=True)
    currency_id = serializers.PrimaryKeyRelatedField(queryset=Currency.objects.all(), write_only=True, allow_null=True, source='currency')

    class Meta:
        model = Company
        fields = '__all__'