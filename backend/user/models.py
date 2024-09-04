from django.db import models
from django.contrib.auth.models import AbstractUser
from company.models import Company

def upload_image_to(int, filename):
    return ("images/profilePic/" + int.name + "_" + filename)

class Role(models.Model):
    name = models.CharField(max_length=200)
    manage_employee = models.BooleanField(default=False)
    manage_payroll = models.BooleanField(default=False)
    manage_attendance = models.BooleanField(default=False)
    manage_recruitment = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name
    
    class Meta:
        ordering = ["id"]

class User(AbstractUser):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    profilePic = models.ImageField(upload_to=upload_image_to, blank=True, null=True)
    company = models.ForeignKey(to=Company, on_delete=models.CASCADE)
    role = models.ForeignKey(to=Role, on_delete=models.SET_NULL, null=True, blank=True)
    last_login = models.DateTimeField(auto_now=True)
    is_online = models.BooleanField(default=False)

    username = None
    first_name = None
    last_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self) -> str:
        return f'{self.name} {self.email}'
    
    class Meta:
        ordering = ["date_joined"]

class UserActivity(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    last_active = models.DateTimeField(auto_now=True)
    online = models.BooleanField(default=False)

    def __str__(self):
        return self.user.name