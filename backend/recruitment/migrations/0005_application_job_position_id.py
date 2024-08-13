# Generated by Django 4.2.5 on 2024-08-09 11:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lookup', '0003_degree_stage'),
        ('recruitment', '0004_alter_recruitment_job_position_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='job_position_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='lookup.jobposition'),
        ),
    ]