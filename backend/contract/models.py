from django.db import models
from employee.models import Employee
from lookup.models import ContractType

class Contract(models.Model):
    reference = models.CharField(max_length=200)
    employee_id = models.ForeignKey(to=Employee, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    contract_type = models.ForeignKey(to=ContractType, on_delete=models.SET_NULL, null=True, blank=True)
    
    wage = models.FloatField()
    wage_type = models.CharField(max_length=200, choices=(("Hourly", "Hourly Wage"), ("Fixed", "Fixed Wage")))

    SCHEDULEPAY = (("Annually", "Annually"),
                ("SemiAnnually", "Semi-Annually"),
                ("Quarterly", "Quarterly"),
                ("BiMonthly", "Bi-Monthly"),
                ("Monthly", "Monthly"),
                ("SemiMonthly", "Semi-Monthly"),
                ("BiWeekly", "Bi-Weekly"),
                ("Weekly", "Weekly"),
                ("Daily", "Daily"))
    
    schedule_pay = models.CharField(max_length=200, choices=SCHEDULEPAY)