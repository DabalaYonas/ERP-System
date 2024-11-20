# Generated by Django 4.2.5 on 2024-11-10 18:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ActivityLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(choices=[('LOGIN', 'Login'), ('LOGOUT', 'Logout'), ('LOGIN_FAIL', 'Login Fail'), ('VIEW', 'View'), ('CREATE', 'Create'), ('UPDATE', 'Update'), ('DELETE', 'Delete')], max_length=20)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('details', models.TextField(blank=True, null=True)),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('user_agent', models.CharField(blank=True, max_length=255, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]