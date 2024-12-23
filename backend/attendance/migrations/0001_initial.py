# Generated by Django 4.2.5 on 2024-10-18 12:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('checkIn', models.DateTimeField()),
                ('checkOut', models.DateTimeField(blank=True, null=True)),
                ('status', models.CharField(blank=True, choices=[('ON_TIME', 'On Time'), ('LATE', 'Late')], max_length=200, null=True)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
            ],
            options={
                'ordering': ['checkIn'],
            },
        ),
    ]
