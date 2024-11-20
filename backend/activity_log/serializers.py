from rest_framework import serializers
from .models import ActivityLog
from user.models import User
from user.serializers import UserSerializer

class ActivityLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source="user")

    class Meta:
        model = ActivityLog
        fields = "__all__"
