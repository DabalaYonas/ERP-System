# Generated by Django 4.2.5 on 2024-08-13 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0002_alter_employee_bank_acc_alter_employee_department_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='jop_position',
            new_name='job_position',
        ),
    ]