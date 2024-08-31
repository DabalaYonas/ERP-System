from .models import Recruitment, Application, Applicant
from rest_framework import viewsets
from .serializers import RecruitmentSerializer, ApplicationSerializer, ApplicantSerializer
from user.models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt

class RecruitmentView(viewsets.ModelViewSet):
    serializer_class = RecruitmentSerializer
    queryset = Recruitment.objects.all()

    def perform_create(self, serializer): 
        token = self.request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("UnAuthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("UnAuthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        
        company_id = user.company.id

        data = serializer.validated_data
        data["company_id"] = company_id
        serializer.save()
        
    def get_queryset(self):
        token = self.request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("UnAuthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("UnAuthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        
        company_id = user.company.id

        return Recruitment.objects.filter(company=company_id)

class ApplicationView(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()

class ApplicantView(viewsets.ModelViewSet):
    serializer_class = ApplicantSerializer
    queryset = Applicant.objects.all()
