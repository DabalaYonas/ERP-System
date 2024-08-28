from django.db import models
from lookup.models import Currency

def upload_logo_to(int, filename):
    return ("images/logo" + int.name + "_" + filename)

class Company(models.Model):
    name = models.CharField(max_length=200)
    logo_img = models.ImageField(upload_to=upload_logo_to, null=True, blank=True)
    email = models.EmailField(max_length=200, null=True, blank=True)
    website = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=200, null=True, blank=True)
    brand_color = models.CharField(max_length=200, null=True, blank=True)
    tin = models.CharField(max_length=200, null=True, blank=True)
    currency = models.ForeignKey(to=Currency, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self) -> str:
        return self.name
