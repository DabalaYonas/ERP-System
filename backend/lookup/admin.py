from django.contrib import admin
from . import models

admin.site.register(models.Department)
admin.site.register(models.JobPosition)
admin.site.register(models.BankAccount)
admin.site.register(models.ContractType)
admin.site.register(models.Degree)
admin.site.register(models.Stage)
