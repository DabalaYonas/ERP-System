from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=200)
    parentDepartment = models.ForeignKey(to='self', null=True, blank=True, on_delete=models.CASCADE)

class JobPosition(models.Model):
    name = models.CharField(max_length=200)

class BankAccount(models.Model):
    accountNo = models.IntegerField()
    bank = models.CharField(max_length=200)

class ContractType(models.Model):
    name = models.CharField(max_length=200)

class Degree(models.Model):
    name = models.CharField(max_length=200)

class Stage(models.Model):
    name = models.CharField(max_length=200)
