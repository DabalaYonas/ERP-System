
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('activities', views.UserActivityViewSet, 'User Activity View Set')
router.register('role', views.RoleViewSet, 'User Role View Set')

urlpatterns = [
    path('register/api/', views.RegisterView.as_view()),
    path('login/api/', views.LoginView.as_view()),
    path('api/', views.UserView.as_view()),
    path('logout/api/', views.LogoutView.as_view()),
    path('api/', include(router.urls))
]
