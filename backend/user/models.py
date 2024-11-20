from django.db import models
from django.contrib.auth.models import AbstractUser
from company.models import Company

def upload_image_to(int, filename):
    return ("images/profilePic/" + int.name + "_" + filename)

class User(AbstractUser):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    profilePic = models.ImageField(upload_to=upload_image_to, blank=True, null=True)
    company = models.ForeignKey(to=Company, on_delete=models.CASCADE)
    last_login = models.DateTimeField()

    username = None
    first_name = None
    last_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self) -> str:
        return f'{self.name} {self.email}'
    
    class Meta:
        ordering = ["date_joined"]