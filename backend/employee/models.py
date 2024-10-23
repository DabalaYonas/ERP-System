from django.db import models
from lookup.models import Department, JobPosition
from company.models import Company

def upload_profile_to(int, filename):
    return ("images/profilePic/" + int.name + "_" + filename)


def upload_id_to(int, filename):
    return ("images/IDImg/" + int.name + "_" + filename)

class Employee(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200,null=True, blank=True)

    GEND = (("Male", "Male"),
            ("Female", "Female"))
    
    gender = models.CharField(max_length=200, choices=GEND, null=True, blank=True)
    phone_number = models.CharField(max_length=200, null=True, blank=True)
    bdate = models.DateField(null=True, blank=True)

    profilePic = models.ImageField(upload_to=upload_profile_to, null=True, blank=True)
    idImg = models.ImageField(upload_to=upload_id_to, null=True, blank=True)

    department = models.ForeignKey(Department, null=True, blank=True, on_delete=models.SET_NULL)
    job_position = models.ForeignKey(to=JobPosition, null=True, blank=True, on_delete=models.SET_NULL)
    bank_acc = models.CharField(null=True, blank=True, unique=True)
    company = models.ForeignKey(to=Company, on_delete=models.CASCADE, null=True, blank=True)

    date_joined = models.DateTimeField(auto_now_add=True, editable=False)
    active = models.BooleanField(default=True)

    annual_leave_balance = models.IntegerField(default=0)

    basic_salary = models.FloatField()
    #allowance
    non_tax_transp_allow = models.FloatField(default=0)
    transp_allow = models.FloatField(default=0)
    tele_allow = models.FloatField(default=0)
    pos_allow = models.FloatField(default=0)  
    
    # Deductions
    staff_loan = models.FloatField(default=0)
    cost_sharing = models.FloatField(default=0)
    other_deductions = models.FloatField(default=0)
    

    def __str__(self) -> str:
        return self.name
    
    class Meta:
        ordering =["date_joined"]

# class SalaryStructure(models.Model):
#     employee = models.OneToOneField(Employee, on_delete=models.CASCADE, related_name='salary_structure')
#     basic_salary = models.FloatField()

#     #allowance
#     non_tax_transp_allow = models.FloatField(default=0)
#     transp_allow = models.FloatField(default=0)
#     tele_allow = models.FloatField(default=0)
#     pos_allow = models.FloatField(default=0)  
    
#     # Deductions
#     income_tax = models.FloatField(default=0)
#     staff_loan = models.FloatField(default=0)
#     cost_sharing = models.FloatField(default=0)
#     pension_7 = models.FloatField(default=0)
#     pension_11 = models.FloatField(default=0)
#     other_deductions = models.FloatField(default=0)
    
#     def __str__(self):
#         return f"{self.employee.name}'s Salary Structure"

