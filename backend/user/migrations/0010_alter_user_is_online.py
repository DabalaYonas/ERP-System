# Generated by Django 4.2.5 on 2024-08-31 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_user_is_online_alter_user_last_login'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_online',
            field=models.BooleanField(default=False),
        ),
    ]