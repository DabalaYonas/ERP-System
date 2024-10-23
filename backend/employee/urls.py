
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', views.EmployeeView, 'Employees')
# router.register('<int:pk>/', views.EmployeeView, 'Employee-detail')

urlpatterns = [
    path('api/employee-count/', views.employee_count, name="employee-count"),
    path('api/', include(router.urls)),
]
