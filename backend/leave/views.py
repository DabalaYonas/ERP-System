from .models import Leave, LeaveType
from rest_framework import viewsets
from .serializers import LeaveSerializer, LeaveTypeSerializer

class LeaveView(viewsets.ModelViewSet):
    serializer_class = LeaveSerializer
    queryset = Leave.objects.all()

class LeaveTypeView(viewsets.ModelViewSet):
    serializer_class = LeaveTypeSerializer
    queryset = LeaveType.objects.all()
