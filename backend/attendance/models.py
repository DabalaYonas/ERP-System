from django.db import models
from employee.models import Employee
from django.utils import timezone
from datetime import datetime
from django.core.exceptions import ValidationError

class Attendance(models.Model):
    checkIn = models.DateTimeField()
    checkOut = models.DateTimeField(null=True, blank=True)
    employee = models.ForeignKey(to=Employee, on_delete=models.CASCADE)
    status = models.CharField(max_length=200, choices=(("ON_TIME", "On Time"), ("LATE", "Late")), null=True, blank=True)

    def save(self, *args, **kwargs):
        if Attendance.objects.filter(employee=self.employee, checkIn__date=self.checkIn).exists():
            if Attendance.objects.filter(employee=self.employee, checkIn__date=self.checkIn).first().checkOut is not None:
                raise ValidationError("Employee has already checked in today.")
        
        # work_start_time = timezone.datetime.strptime('08:30:00', '%H:%M:%S').time()
        # if self.checkIn.time() > work_start_time:
        #     self.status = "LATE"
        # else:
        #     self.status = "ON_TIME"
        
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ["checkIn"]
