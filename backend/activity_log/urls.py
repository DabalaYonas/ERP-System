
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', views.ActivityLogViewSet, 'Activity Log ViewSet')

urlpatterns = [
    path('api/', include(router.urls)),
]
