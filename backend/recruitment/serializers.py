from rest_framework import serializers
from .models import Recruitment, Applicant, Application

class RecruitmentSerializer(serializers.ModelSerializer):
    application_count = serializers.IntegerField(source='app_recruitment.count', read_only=True)

    class Meta:
        model = Recruitment
        fields = '__all__'
        

class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    applicant = ApplicantSerializer(read_only=True)
    recruitment = RecruitmentSerializer(read_only=True)
    applicant_id = serializers.PrimaryKeyRelatedField(
        queryset=Applicant.objects.all(), write_only=True, source='applicant'
    )

    recruitment_id = serializers.PrimaryKeyRelatedField(
        queryset=Recruitment.objects.all(), write_only=True, source='recruitment'
    )

    class Meta:
        model = Application
        fields = "__all__"