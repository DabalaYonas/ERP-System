
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('types', views.LeaveTypeView, 'Leave Type View')
router.register('public-holidays', views.PublicHolidayView, 'Public Holiday View')
router.register('balances', views.LeaveBalanceViewSet, 'Leave Balances')
router.register('', views.LeaveViewSet, 'Leave View')

urlpatterns = [
    path('api/leave-summary/', views.LeaveSummaryView.as_view(), name='leave-summary'),
    path('api/', include(router.urls)),
]
