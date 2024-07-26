from django.db import models
from django.contrib.auth.models import AbstractUser

def upload_image_to(int, filename):
    return ("images/profilePic/" + int.name + "_" + filename)

class User(AbstractUser):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    profilePic = models.ImageField(upload_to=upload_image_to, blank=True, null=True)
    username = None
    first_name = None
    last_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
