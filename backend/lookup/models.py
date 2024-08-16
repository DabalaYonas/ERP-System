from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=200)
    parentDepartment = models.ForeignKey(to='self', null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class JobPosition(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return self.name

class BankAccount(models.Model):
    accountNo = models.CharField(max_length=200, unique=True)
    bank = models.CharField(max_length=200, null=True, blank=True)
    
    def __str__(self) -> str:
        return self.accountNo

class ContractType(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return self.name

class Degree(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return self.name

class Stage(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return self.name
