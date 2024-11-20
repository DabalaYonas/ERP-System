from django.db import models
from employee.models import Employee
from lookup.models import Department, JobPosition

def upload_to(int, filename):
    return ("files/leave_request_attachments/" + filename)

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
    days_allowed = models.PositiveIntegerField()
    is_annual = models.BooleanField(default=False)
    # approval = models.CharField(max_length=50, choices=(("NO_VALIDATION", "No Validation"),
    #                                                      ("ADMIN", "Admin")))
    
    # notified_officer = models.ManyToManyField(to=Employee)

    # kind = models.CharField(max_length=50, choices=(("ABSENCE", "Absence"),
    #                                                  ("WORKED_TIME", "Worked Time")))

    # take_in = models.CharField(max_length=50, choices=(("DAY", "Day"),
    #                                                     ("HALF_DAY", "Half-day"),
    #                                                     ("HOUR", "Hour")))

    # holiday_included = models.BooleanField(default=True)
    # allow_negative = models.BooleanField(default=False)
    # negative_amount = models.IntegerField(null=True, blank=True)
    # allow_atteched_docs = models.BooleanField(default=True)
    # max_taken_amount = models.IntegerField(null=True, blank=True)
    # max_accrued_amount = models.IntegerField(null=True, blank=True)
    # can_carryover = models.BooleanField(default=False)
    # max_carryover_amount = models.IntegerField(null=True, blank=True)
    # carryover_period = models.IntegerField(null=True, blank=True)
    # eligible_gender = models.CharField(max_length=50, choices=(("MALE", "Male"),
    #                                                             ("FEMALE", "Female")), null=True, blank=True)

    # eligible_department = models.ForeignKey(to=Department, on_delete=models.SET_NULL, null=True, blank=True)
    # eligible_position = models.ForeignKey(to=JobPosition, on_delete=models.SET_NULL, null=True, blank=True)
    # eligible_worked_period = models.IntegerField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name

class LeaveBalance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    balance = models.IntegerField()
    last_increment_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.employee.name} - {self.leave_type.name}: {self.balance} days"


class Leave(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]
    start_date = models.DateField()
    end_date = models.DateField()
    employee = models.ForeignKey(to=Employee, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(to=LeaveType, on_delete=models.CASCADE)
    reason = models.CharField(max_length=250, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.employee.name} - {self.leave_type.name} from {self.start_date} to {self.end_date}"
    
    class Meta:
        permissions = [
            ("apply_leave", "Can apply for leave"),
        ]


class LeaveRequestAttachment(models.Model):
    leave_request = models.ForeignKey(Leave, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to=upload_to)
    uploaded_at = models.DateTimeField(auto_now_add=True)