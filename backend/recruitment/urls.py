
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/', views.RecruitmentView, 'Recruitment')
router.register('applicant/api/', views.ApplicantView, 'Applicant')
router.register('application/api/', views.ApplicationView, 'Application')

urlpatterns = [
    path('', include(router.urls)),
]
