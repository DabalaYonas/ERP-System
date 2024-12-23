# Generated by Django 4.2.5 on 2024-11-02 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leave', '0004_alter_leave_end_date_alter_leave_start_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='leavetype',
            name='allow_atteched_docs',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='allow_negative',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='approval',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='can_carryover',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='carryover_period',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='eligible_department',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='eligible_gender',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='eligible_position',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='eligible_worked_period',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='holiday_included',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='kind',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='max_accrued_amount',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='max_carryover_amount',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='max_taken_amount',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='negative_amount',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='notified_officer',
        ),
        migrations.RemoveField(
            model_name='leavetype',
            name='take_in',
        ),
        migrations.AddField(
            model_name='leavetype',
            name='days_allowed',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='leavetype',
            name='is_annual',
            field=models.BooleanField(default=False),
        ),
    ]
