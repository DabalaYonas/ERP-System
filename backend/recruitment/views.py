from .models import Recruitment, Application, Applicant
from rest_framework import viewsets
from .serializers import RecruitmentSerializer, ApplicationSerializer, ApplicantSerializer

class RecruitmentView(viewsets.ModelViewSet):
    serializer_class = RecruitmentSerializer
    queryset = Recruitment.objects.all()

class ApplicationView(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()

class ApplicantView(viewsets.ModelViewSet):
    serializer_class = ApplicantSerializer
    queryset = Applicant.objects.all()
