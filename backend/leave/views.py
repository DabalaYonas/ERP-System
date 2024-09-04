from .models import Leave, LeaveType, PublicHoliday
from rest_framework import viewsets
from .serializers import LeaveSerializer, LeaveTypeSerializer, PublicHolidaySerializer

class LeaveView(viewsets.ModelViewSet):
    serializer_class = LeaveSerializer
    queryset = Leave.objects.all()

class LeaveTypeView(viewsets.ModelViewSet):
    serializer_class = LeaveTypeSerializer
    queryset = LeaveType.objects.all()

class PublicHolidayView(viewsets.ModelViewSet):
    serializer_class = PublicHolidaySerializer
    queryset = PublicHoliday.objects.all()
