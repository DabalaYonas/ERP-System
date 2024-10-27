from django.db import models
from employee.models import Employee
from django.utils import timezone
from django.core.exceptions import ValidationError

class Attendance(models.Model):
    employee = models.ForeignKey(to=Employee, on_delete=models.CASCADE)
    date = models.DateField()
    checkIn = models.DateTimeField(null=True, blank=True)
    checkOut = models.DateTimeField(null=True, blank=True)
    break_start = models.DateTimeField(null=True, blank=True)
    break_end = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=200, choices=(("ON_TIME", "On Time"), ("LATE", "Late")), null=True, blank=True)

    def save(self, *args, **kwargs):
        # if Attendance.objects.filter(employee=self.employee, checkIn__date=self.checkIn).exists():
        #     if Attendance.objects.filter(employee=self.employee, checkIn__date=self.checkIn).first().checkOut is not None:
        #         raise ValidationError("Employee has already checked in today.")
        
        # work_start_time = timezone.datetime.strptime('08:30:00', '%H:%M:%S').time()
        # if self.checkIn.time() > work_start_time:
        #     self.status = "LATE"
        # else:
        #     self.status = "ON_TIME"
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.name} - {self.date}"

    def get_status(self):
        work_start_time = timezone.now().replace(hour=8, minute=30, second=0, microsecond=0)

        if self.checkIn:
            checkIn_time = self.checkIn
            if timezone.is_naive(checkIn_time):
                checkIn_time = timezone.make_aware(checkIn_time, timezone.get_current_timezone())

            if checkIn_time.astimezone().time() > work_start_time.time():
                return 'Late'
            return 'On Time'
        return 'Absent'
    
    class Meta:
        ordering = ["checkIn"]
        unique_together = ('employee', 'date')
