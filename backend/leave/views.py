from .models import Leave
from rest_framework import viewsets
from .serializers import LeaveSerializer

class LeaveView(viewsets.ModelViewSet):
    serializer_class = LeaveSerializer
    queryset = Leave.objects.all()
