# Generated by Django 4.2.5 on 2024-10-18 12:54

from django.db import migrations, models
import django.db.models.deletion
import employee.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lookup', '0001_initial'),
        ('company', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(blank=True, max_length=200, null=True)),
                ('gender', models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female')], max_length=200, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=200, null=True)),
                ('bdate', models.DateField(blank=True, null=True)),
                ('profilePic', models.ImageField(blank=True, null=True, upload_to=employee.models.upload_profile_to)),
                ('idImg', models.ImageField(blank=True, null=True, upload_to=employee.models.upload_id_to)),
                ('bank_acc', models.CharField(blank=True, null=True, unique=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=True)),
                ('annual_leave_balance', models.IntegerField(default=0)),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='company.company')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='lookup.department')),
                ('job_position', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='lookup.jobposition')),
            ],
            options={
                'ordering': ['date_joined'],
            },
        ),
    ]
