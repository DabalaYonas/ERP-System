# Generated by Django 4.2.5 on 2024-10-18 12:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lookup', '0001_initial'),
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reference', models.CharField(max_length=200)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('wage', models.FloatField()),
                ('wage_type', models.CharField(choices=[('Hourly', 'Hourly Wage'), ('Fixed', 'Fixed Wage')], max_length=200)),
                ('schedule_pay', models.CharField(choices=[('Annually', 'Annually'), ('SemiAnnually', 'Semi-Annually'), ('Quarterly', 'Quarterly'), ('BiMonthly', 'Bi-Monthly'), ('Monthly', 'Monthly'), ('SemiMonthly', 'Semi-Monthly'), ('BiWeekly', 'Bi-Weekly'), ('Weekly', 'Weekly'), ('Daily', 'Daily')], max_length=200)),
                ('contract_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='lookup.contracttype')),
                ('employee_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
            ],
        ),
    ]
