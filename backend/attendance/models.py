from django.db import models
from employee.models import Employee

class Attendance(models.Model):
    checkIn = models.DateTimeField()
    checkOut = models.DateTimeField()
    employee = models.ForeignKey(to=Employee, on_delete=models.CASCADE)
    # status = models.CharField(max_length=200, choices=(("ON_TIME", "On Time"), ("LATE", "Late")), null=True, blank=True)

    # def save(self, *args, **kwargs):
    #     return super().save(args, kwargs)
