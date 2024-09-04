from .models import Recruitment, Application, Applicant
from rest_framework import viewsets
from .serializers import RecruitmentSerializer, ApplicationSerializer, ApplicantSerializer

class RecruitmentView(viewsets.ModelViewSet):
    serializer_class = RecruitmentSerializer
    queryset = Recruitment.objects.all()

    def perform_create(self, serializer): 
        user = self.request.user
        
        company_id = user.company.id

        data = serializer.validated_data
        data["company_id"] = company_id
        serializer.save()
        
    def get_queryset(self):
        user = self.request.user        
        company_id = user.company.id

        return Recruitment.objects.filter(company=company_id)

class ApplicationView(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()
        
    def get_queryset(self):
        user = self.request.user        
        company_id = user.company.id
        recruitment = Recruitment.objects.filter(company=company_id)

        return Application.objects.all()

class ApplicantView(viewsets.ModelViewSet):
    serializer_class = ApplicantSerializer
    queryset = Applicant.objects.all()
