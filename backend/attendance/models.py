from django.db import models
from employee.models import Employee

class Attendance(models.Model):
    checkIn = models.DateTimeField()
    checkOut = models.DateTimeField()
    employeeId = models.ForeignKey(to=Employee, on_delete=models.CASCADE)

