from django.db import models
from lookup.models import JobPosition, Department, Degree, Stage
from employee.models import Employee

class Recruitment(models.Model):
    job_position_id = models.ForeignKey(to=JobPosition, on_delete=models.CASCADE)
    email_alias = models.CharField(max_length=200)
    target = models.IntegerField()
    recruiter = models.ForeignKey(to=Employee, on_delete=models.SET_NULL, null=True, blank=True)

class Applicant(models.Model):
    name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    degree = models.ForeignKey(to=Degree, on_delete=models.SET_NULL, null=True, blank=True)
    linkidin_profile = models.CharField(max_length=200)

class Application(models.Model):
    recruitment_id = models.ForeignKey(to=Recruitment, on_delete=models.CASCADE)
    applicant_id = models.ForeignKey(to=Applicant, on_delete=models.CASCADE)
    department_id = models.ForeignKey(to=Department, on_delete=models.SET_NULL, null=True, blank=True)
    expected_salary = models.FloatField()
    proposed_salary = models.FloatField()
    stage_id = models.ForeignKey(to=Stage, on_delete=models.SET_NULL, null=True, blank=True)

