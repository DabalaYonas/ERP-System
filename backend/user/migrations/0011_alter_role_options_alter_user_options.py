# Generated by Django 4.2.5 on 2024-09-04 07:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0010_alter_user_is_online'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='role',
            options={'ordering': ['id']},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': ['date_joined']},
        ),
    ]
