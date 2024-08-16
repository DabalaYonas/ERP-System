
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api', views.PayrollView, 'Payroll')
router.register('payslip/api', views.PaysliptView, 'Payslip')

urlpatterns = [
    path('', include(router.urls)),
]
