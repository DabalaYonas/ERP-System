# Generated by Django 4.2.5 on 2024-10-18 12:54

from django.db import migrations, models
import django.db.models.deletion
import leave.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lookup', '0001_initial'),
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PublicHoliday',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('date', models.DateField()),
                ('description', models.TextField(blank=True, null=True)),
                ('is_recurring', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='LeaveType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('approval', models.CharField(choices=[('NO_VALIDATION', 'No Validation'), ('ADMIN', 'Admin')], max_length=50)),
                ('kind', models.CharField(choices=[('ABSENCE', 'Absence'), ('WORKED_TIME', 'Worked Time')], max_length=50)),
                ('take_in', models.CharField(choices=[('DAY', 'Day'), ('HALF_DAY', 'Half-day'), ('HOUR', 'Hour')], max_length=50)),
                ('holiday_included', models.BooleanField(default=True)),
                ('allow_negative', models.BooleanField(default=False)),
                ('negative_amount', models.IntegerField(blank=True, null=True)),
                ('allow_atteched_docs', models.BooleanField(default=True)),
                ('max_taken_amount', models.IntegerField(blank=True, null=True)),
                ('max_accrued_amount', models.IntegerField(blank=True, null=True)),
                ('can_carryover', models.BooleanField(default=False)),
                ('max_carryover_amount', models.IntegerField(blank=True, null=True)),
                ('carryover_period', models.IntegerField(blank=True, null=True)),
                ('eligible_gender', models.CharField(blank=True, choices=[('MALE', 'Male'), ('FEMALE', 'Female')], max_length=50, null=True)),
                ('eligible_worked_period', models.IntegerField(blank=True, null=True)),
                ('eligible_department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='lookup.department')),
                ('eligible_position', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='lookup.jobposition')),
                ('notified_officer', models.ManyToManyField(to='employee.employee')),
            ],
        ),
        migrations.CreateModel(
            name='Leave',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('reason', models.CharField(blank=True, max_length=250, null=True)),
                ('document', models.FileField(blank=True, null=True, upload_to=leave.models.upload_to)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
                ('leave_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='leave.leavetype')),
            ],
        ),
    ]
