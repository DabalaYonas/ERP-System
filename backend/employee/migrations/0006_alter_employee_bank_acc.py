# Generated by Django 4.2.5 on 2024-08-27 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0005_alter_employee_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='bank_acc',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]