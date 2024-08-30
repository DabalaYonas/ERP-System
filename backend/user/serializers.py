from rest_framework import serializers
from .models import User, UserActivity, Role
from company.models import Company
from company.serializers import CompanySerializer

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), write_only=True, source="company")

    role = RoleSerializer(read_only=True)
    role_id = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), write_only=True, allow_null=True, source="role")
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'profilePic', 'company', 'company_id', 'role', 'role_id', 'last_login', 'is_online', "date_joined"]
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
    

class UserActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivity
        fields = ['id', 'user', 'last_active', 'online']