from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from employee.models import Employee
from leave.models import LeaveType, LeaveBalance

class Command(BaseCommand):
    help = "Update annual leave balances for employees based on their years of service."

    def handle(self, *args, **options):
        annual_leave_type = LeaveType.objects.filter(is_annual=True).first()
        if not annual_leave_type:
            self.stdout.write(self.style.ERROR("Annual leave type not found."))
            return

        today = timezone.now().date()

        for employee in Employee.objects.all():
            employment_duration = today - employee.date_joined.date()
            years_worked = employment_duration.days // 365

            if years_worked < 1:
                continue

            leave_balance, created = LeaveBalance.objects.get_or_create(
                employee=employee,
                leave_type=annual_leave_type,
                defaults={'balance': 16, 'last_increment_date': today}
            )

            if not created and leave_balance.last_increment_date:
                last_increment_years = (today - leave_balance.last_increment_date).days // 365
                if last_increment_years >= 1:
                    leave_balance.balance = 16 + (years_worked - 1)
                    leave_balance.last_increment_date = today
                    leave_balance.save()
                    self.stdout.write(self.style.SUCCESS(
                        f"Updated leave balance for {employee.name} to {leave_balance.balance} days."
                    ))
            elif created:
                self.stdout.write(self.style.SUCCESS(
                    f"Assigned initial annual leave balance for {employee.name}."
                ))
