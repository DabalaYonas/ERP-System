# Generated by Django 4.2.5 on 2024-10-20 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payroll',
            name='payPeriod',
            field=models.CharField(max_length=10),
        ),
    ]
