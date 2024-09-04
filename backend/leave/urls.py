
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api', views.LeaveView, 'Leave View')
router.register('types/api', views.LeaveTypeView, 'Leave Type View')
router.register('public-holidays/api', views.PublicHolidayView, 'Public Holiday View')

urlpatterns = [
    path('', include(router.urls)),
]
