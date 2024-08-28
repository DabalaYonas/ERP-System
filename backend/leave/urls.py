
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api', views.LeaveView, 'Leave View')
router.register('type/api', views.LeaveTypeView, 'Leave Type View')

urlpatterns = [
    path('', include(router.urls)),
]
