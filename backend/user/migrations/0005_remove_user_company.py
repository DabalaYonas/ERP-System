# Generated by Django 4.2.5 on 2024-08-22 10:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_user_company'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='company',
        ),
    ]