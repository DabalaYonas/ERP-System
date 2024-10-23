
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', views.AttendaceView, 'Attendance')

urlpatterns = [
    path('api/attendance-summary/', views.attendance_summary, name="attendance-summary"),
    path('api/', include(router.urls)),
]
