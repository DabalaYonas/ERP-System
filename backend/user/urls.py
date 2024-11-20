
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/api/', views.RegisterView.as_view()),
    path('login/api/', views.LoginView.as_view()),
    # path('api/all/', views.AllUsersAPI.as_view()),
    path('logout/api/', views.LogoutView.as_view()),
    path('api/assign-role/', views.assign_role, name="assign_role"),
    path('api/roles/', views.list_roles, name="list_roles"),
    path('api/all/', views.list_users_and_roles, name="list_users_and_roles"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', views.UserView.as_view()),
]
