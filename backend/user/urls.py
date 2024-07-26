
from django.urls import path
from . import views

urlpatterns = [
    path('register/api/', views.RegisterView.as_view()),
    path('login/api/', views.LoginView.as_view()),
    path('api/', views.UserView.as_view()),
    path('logout/api/', views.LogoutView.as_view()),
]
