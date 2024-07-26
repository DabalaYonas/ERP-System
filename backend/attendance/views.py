from rest_framework import viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from django.http import JsonResponse
from .models import Attendance
from .serializers import AttendanceSerializer

class AttendaceView(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = AttendanceSerializer
    queryset = Attendance.objects.all()

    def post(self, request):
        data = request.data
        serialzer = AttendanceSerializer(data=data)

        if serialzer.is_valid():
            serialzer.save()
            return JsonResponse("Attendance added seccussfully", safe=False)
        return JsonResponse("Failed to add Attendance", safe=False)
    
    def put(self, request, id=None):
        data_to_update = Attendance.objects.get(id=id)
        serializer = AttendanceSerializer(
            instance=data_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Attendance updated Successfully", safe=False)
        return JsonResponse("Failed To Update Attendance", safe=False)
