from django.db import models
from employee.models import Employee
from lookup.models import Department, JobPosition

def upload_to(int, filename):
    return ("files/leave document/" + int.name + "_" + filename)

class PublicHoliday(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField()
    description = models.TextField(null=True, blank=True)
    is_recurring = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.name} on {self.date}"
    
    class Meta:
        ordering = ["date"]

class LeaveType(models.Model):
    name = models.CharField(max_length=200)
    approval = models.CharField(max_length=50, choices=(("NO_VALIDATION", "No Validation"),
                                                         ("ADMIN", "Admin")))
    
    notified_officer = models.ManyToManyField(to=Employee)

    kind = models.CharField(max_length=50, choices=(("ABSENCE", "Absence"),
                                                     ("WORKED_TIME", "Worked Time")))

    take_in = models.CharField(max_length=50, choices=(("DAY", "Day"),
                                                        ("HALF_DAY", "Half-day"),
                                                        ("HOUR", "Hour")))

    holiday_included = models.BooleanField(default=True)
    allow_negative = models.BooleanField(default=False)
    negative_amount = models.IntegerField(null=True, blank=True)
    allow_atteched_docs = models.BooleanField(default=True)
    max_taken_amount = models.IntegerField(null=True, blank=True)
    max_accrued_amount = models.IntegerField(null=True, blank=True)
    can_carryover = models.BooleanField(default=False)
    max_carryover_amount = models.IntegerField(null=True, blank=True)
    carryover_period = models.IntegerField(null=True, blank=True)
    eligible_gender = models.CharField(max_length=50, choices=(("MALE", "Male"),
                                                                ("FEMALE", "Female")), null=True, blank=True)

    eligible_department = models.ForeignKey(to=Department, on_delete=models.SET_NULL, null=True, blank=True)
    eligible_position = models.ForeignKey(to=JobPosition, on_delete=models.SET_NULL, null=True, blank=True)
    eligible_worked_period = models.IntegerField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name

class Leave(models.Model):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    employee = models.ForeignKey(to=Employee, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(to=LeaveType, on_delete=models.CASCADE)
    reason = models.CharField(max_length=250, null=True, blank=True)
    document = models.FileField(upload_to=upload_to, null=True, blank=True)
