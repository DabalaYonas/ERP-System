from django.db import models
from employee.models import Employee

def upload_to(int, filename):
    return ("files/leave document/" + int.name + "_" + filename)

class LeaveType(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name

class Leave(models.Model):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    employee = models.ForeignKey(to=Employee, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(to=LeaveType, on_delete=models.CASCADE)
    reason = models.CharField(max_length=250, null=True, blank=True)
    document = models.FileField(upload_to=upload_to, null=True, blank=True)
