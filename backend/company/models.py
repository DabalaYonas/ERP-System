from django.db import models

def upload_logo_to(int, filename):
    return ("images/logo" + int.name + "_" + filename)

class Company(models.Model):
    name = models.CharField(max_length=200)
    logo_img = models.ImageField(upload_to=upload_logo_to)
    email = models.EmailField(max_length=200)
    website = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)
