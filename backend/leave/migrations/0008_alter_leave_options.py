# Generated by Django 4.2.5 on 2024-11-14 21:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('leave', '0007_remove_leave_document_leaverequestattachment'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='leave',
            options={'permissions': [('apply_leave', 'Can apply for leave')]},
        ),
    ]
