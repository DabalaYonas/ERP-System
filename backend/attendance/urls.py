
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', views.AttendaceView, 'Attendance')

urlpatterns = [
    path('api/attendance-summary/', views.attendance_summary, name="attendance-summary"),
    path('check_in/', views.check_in, name='check_in'),
    path('start_break/', views.start_break, name='start_break'),
    path('end_break/', views.end_break, name='end_break'),
    path('check_out/', views.check_out, name='check_out'),
    path('api/', include(router.urls)),
]
