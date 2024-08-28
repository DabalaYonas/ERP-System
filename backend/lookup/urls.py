from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('department', views.DepartmentView, 'Department')
router.register('job-position', views.JobPositionView, 'Job Position')
router.register('bank-account', views.BankAccountView, 'Bank Account')
router.register('contract-type', views.ContractTypeView, 'Contract Type')
router.register('degree', views.DegreeView, 'Degree Type')
router.register('stage', views.StageView, 'Stage Type')
router.register('currency', views.StageView, 'Currency')

urlpatterns = [
    path('api/', include(router.urls)),
    path('<str:id>/', include(router.urls)),
]
