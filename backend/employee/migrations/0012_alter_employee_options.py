# Generated by Django 4.2.5 on 2024-09-04 07:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0011_employee_active_employee_annual_leave_balance_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='employee',
            options={'ordering': ['date_joined']},
        ),
    ]
