from rest_framework import viewsets
from .models import Attendance
from .serializers import AttendanceSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils import timezone
from .models import Attendance
from django.utils import timezone
from employee.models import Employee


@api_view(['GET'])
def attendance_summary(request):
    date = request.GET.get("date", timezone.now().date())
    today_attend = Attendance.objects.filter(checkIn__date=date)
    on_time = today_attend.filter(status="ON_TIME").count()
    late = today_attend.filter(status="LATE").count()
    
    company_id = request.user.company.id
    total_absent = Employee.objects.filter(company=company_id).count() - today_attend.count()

    return Response({
        'total_attend': today_attend.count(),
        'total_absent': total_absent,
        'total_on_time': on_time,
        'total_late': late,
    })

class AttendaceView(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer
    queryset = Attendance.objects.all()
    
       
