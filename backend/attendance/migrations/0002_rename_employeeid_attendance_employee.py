# Generated by Django 4.2.5 on 2024-08-13 13:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='attendance',
            old_name='employeeId',
            new_name='employee',
        ),
    ]
