
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api', views.PayrollView, 'Payroll')

urlpatterns = [
    path('api/payslips/<int:payroll_id>', views.payslip_view, name="Payslip"),
    path('api/employee-list/', views.ready_payroll_view, name='Employee List'),
    path('api/payroll-summary/', views.payroll_summary, name="Payroll Summary"),
    path('api/submit/', views.process_payroll, name="Process Payroll"),
    path('', include(router.urls)),
]
