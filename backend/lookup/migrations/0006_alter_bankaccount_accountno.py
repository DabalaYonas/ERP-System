# Generated by Django 4.2.5 on 2024-08-16 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lookup', '0005_alter_bankaccount_accountno'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bankaccount',
            name='accountNo',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
