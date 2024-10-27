from django.db import models
from employee.models import Employee
from django.core.exceptions import ValidationError
from lookup.models import Department

class OvertimeRules(models.Model):
    department = models.ForeignKey(to=Department, null=True, blank=True, on_delete=models.SET_NULL) 
    regular_working_hours = models.DecimalField(max_digits=4, decimal_places=2, default=8.0)
    overtime_multiplier = models.DecimalField(max_digits=3, decimal_places=2, default=1.5)
    max_regular_hours = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return f"Overtime Rule: {self.overtime_multiplier}x after {self.regular_working_hours} hours"

class Payroll(models.Model):
    employee = models.ForeignKey(to=Employee, on_delete=models.CASCADE)
    payPeriod = models.CharField(max_length=20)
    processed_date = models.DateField(auto_now_add=True)

    # Salary Structure
    basic_salary = models.FloatField()
    non_tax_transp_allow = models.FloatField(default=0)
    transp_allow = models.FloatField(default=0)
    tele_allow = models.FloatField(default=0)
    pos_allow = models.FloatField(default=0)
    
    overtime = models.FloatField(default=0)    
    penalty = models.FloatField(default=0)    

    gross_earning = models.FloatField(default=0)
    taxable_income = models.FloatField(default=0)

    # Deductions
    income_tax = models.FloatField(default=0)
    staff_loan = models.FloatField(default=0)
    cost_sharing = models.FloatField(default=0)
    pension_7 = models.FloatField(default=0)
    pension_11 = models.FloatField(default=0)
    other_deductions = models.FloatField(default=0)    
    total_deduction = models.FloatField(default=0)

    # Net Salary
    net_salary = models.FloatField(default=0)
    status = models.CharField(max_length=200, choices=(("paid", "Paid"), ("pending", "Pending")), default="pending")

    def calculate_income_tax(self, taxable_income):
        #IF(Q9<600,0,IF(Q9<1651,Q9*0.1-60,IF(Q9<3201,Q9*0.15-142.5,IF(Q9<5251,Q9*0.2-302.5,IF(Q9<7801,Q9*0.25-565,IF(Q9<10900,Q9*0.3-955,IF(Q9>10900,Q9*0.35-1500,0)))))))
        if taxable_income < 600:
            return 0
        elif taxable_income < 1651:
            return taxable_income * 0.1 - 60
        
        elif taxable_income < 3201:
            return taxable_income * 0.15 - 142.5
        
        elif taxable_income < 5251:
            return taxable_income * 0.2 - 302.5
        
        elif taxable_income < 7801:
            return taxable_income * 0.25 - 565
        
        elif taxable_income < 10900:
            return taxable_income * 0.3 - 955
        
        elif taxable_income > 10900:
            return taxable_income * 0.35 - 1500
        
        return 0

    def calculate_net_salary(self):
        self.gross_earning = self.basic_salary + self.non_tax_transp_allow + self.transp_allow + self.tele_allow + self.pos_allow + self.overtime
        self.taxable_income = self.basic_salary + self.transp_allow + self.tele_allow + self.pos_allow + self.overtime

        self.income_tax = self.calculate_income_tax(self.taxable_income)
        self.pension_7 = self.basic_salary * 0.07
        self.pension_11 = self.basic_salary * 0.11

        self.total_deduction = self.income_tax + self.staff_loan + self.pension_7 + self.other_deductions + self.cost_sharing + self.penalty

        self.net_salary = self.gross_earning - self.total_deduction

        self.gross_earning = round(self.gross_earning, 3)
        self.taxable_income = round(self.taxable_income, 3)
        self.income_tax = round(self.income_tax, 3)
        self.pension_7 = round(self.pension_7, 3)
        self.pension_11 = round(self.pension_11, 3)
        self.total_deduction = round(self.total_deduction, 3)
        self.net_salary = round(self.net_salary, 3)


    def save(self, *args, **kwargs):
        # if Payroll.objects.filter(employee=self.employee, payPeriod=self.payPeriod).exists():
        #     raise ValidationError(f"Payroll for {self.employee} in {self.payPeriod} already exists.")
        
        self.calculate_net_salary()

        super().save(*args, **kwargs)


    def mark_as_paid(self):
        self.status = 'paid'
        self.save()


    def generate_payslip(self):
        return {
            'employee_name': self.employee.name,
            'payPeriod': self.payPeriod,
            'basic_salary': self.basic_salary,
            'non_tax_transp_allow': self.non_tax_transp_allow,
            'transp_allow': self.transp_allow,
            'tele_allow': self.tele_allow,
            'pos_allow': self.pos_allow,
            'overtime': self.overtime,
            'penalty': self.penalty,
            'gross_earning': self.gross_earning,
            'taxable_income': self.taxable_income,
            'income_tax': self.income_tax,
            'staff_loan': self.staff_loan,
            'cost_sharing': self.cost_sharing,
            'pension_7': self.pension_7,
            'pension_11': self.pension_11,
            'other_deductions': self.other_deductions,
            'total_deduction': self.total_deduction,
            'net_salary': self.net_salary,
            'status': self.status,
        }

    def __str__(self):
        return f"{self.employee.name} - {self.payPeriod} - {self.status}"
    
    class Meta:
        unique_together = ('employee', 'payPeriod')
    