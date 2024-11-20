from rest_framework import serializers
from .models import User
from company.models import Company
from company.serializers import CompanySerializer

class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), write_only=True, source="company")

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'profilePic', 'company', 'company_id', 'last_login', "date_joined"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance