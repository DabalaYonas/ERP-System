# Generated by Django 4.2.5 on 2024-08-12 18:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0002_alter_employee_bank_acc_alter_employee_department_and_more'),
        ('lookup', '0003_degree_stage'),
        ('recruitment', '0007_rename_applicant_id_application_applicant_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='degree',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='applicants', to='lookup.degree'),
        ),
        migrations.AlterField(
            model_name='application',
            name='applicant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='recruitment.applicant'),
        ),
        migrations.AlterField(
            model_name='application',
            name='department_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='applications', to='lookup.department'),
        ),
        migrations.AlterField(
            model_name='application',
            name='recruitment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='recruitment.recruitment'),
        ),
        migrations.AlterField(
            model_name='application',
            name='stage_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='applications', to='lookup.stage'),
        ),
        migrations.AlterField(
            model_name='recruitment',
            name='recruiter',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='recruitments', to='employee.employee'),
        ),
    ]