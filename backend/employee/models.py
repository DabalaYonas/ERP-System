from django.db import models
from lookup.models import Department, JobPosition, BankAccount

def upload_profile_to(int, filename):
    return ("images/profilePic/" + int.name + "_" + filename)


def upload_id_to(int, filename):
    return ("images/IDImg/" + int.name + "_" + filename)

class Employee(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)

    GEND = (("Male", "Male"),
            ("Female", "Female"))
    
    gender = models.CharField(max_length=200, choices=GEND)
    phone_number = models.CharField(max_length=200)
    bdate = models.DateField()

    profilePic = models.ImageField(upload_to=upload_profile_to, null=True, blank=True)
    idImg = models.ImageField(upload_to=upload_id_to, null=True, blank=True)

    department = models.ForeignKey(Department, null=True, blank=True, on_delete=models.SET_NULL)
    jop_position = models.ForeignKey(to=JobPosition, null=True, blank=True, on_delete=models.SET_NULL)
    bank_acc = models.ForeignKey(to=BankAccount, null=True, blank=True, on_delete=models.SET_NULL)

