# Generated by Django 4.2.5 on 2024-11-16 20:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_user_last_login'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_online',
        ),
    ]