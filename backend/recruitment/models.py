from django.db import models
from lookup.models import JobPosition, Department, Degree, Stage
from employee.models import Employee
# from company.models import Company

class Recruitment(models.Model):
    job_position_id = models.ForeignKey(to=JobPosition, on_delete=models.CASCADE, null=True, blank=True)
    job_position_name = models.CharField(max_length=200)
    email_alias = models.CharField(max_length=200)
    target = models.IntegerField(null=True, blank=True)
    recruiter = models.ForeignKey(to=Employee, on_delete=models.SET_NULL, related_name='recruiter', null=True, blank=True)

    def save(self, *args, **kwargs):
        jobPosition = JobPosition(name=self.job_position_name)
        jobPosition.save()
        self.job_position_id = jobPosition

        return super().save(*args, **kwargs)
    
class Applicant(models.Model):
    name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, null=True, blank=True)
    degree = models.ForeignKey(to=Degree, on_delete=models.SET_NULL, related_name='appl_degree', null=True, blank=True)
    linkidin_profile = models.CharField(max_length=200, null=True, blank=True)


class Application(models.Model):
    recruitment = models.ForeignKey(to=Recruitment, related_name='app_recruitment', on_delete=models.CASCADE)
    applicant = models.ForeignKey(to=Applicant, related_name='app_applicant', on_delete=models.CASCADE)
    department_id = models.ForeignKey(to=Department, related_name='app_department', on_delete=models.SET_NULL, null=True, blank=True)
    expected_salary = models.FloatField(null=True, blank=True)
    proposed_salary = models.FloatField(null=True, blank=True)
    stage_id = models.ForeignKey(to=Stage, on_delete=models.SET_NULL, related_name='app_stage', null=True, blank=True)

