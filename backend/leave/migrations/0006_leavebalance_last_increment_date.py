# Generated by Django 4.2.5 on 2024-11-02 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leave', '0005_remove_leavetype_allow_atteched_docs_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='leavebalance',
            name='last_increment_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
