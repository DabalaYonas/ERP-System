from django.db import models
from employee.models import Employee
from datetime import datetime

class Payroll(models.Model):
    name = models.CharField(max_length=200)
    date_generated = models.DateField(auto_now=True)
    payment_month_year = models.DateField()
    status = models.CharField(max_length=200, choices=(("paid", "Paid"), ("pending", "Pending"), ("cancelled", "Cancelled")), default="pending")

class Payslip(models.Model):
    # Basic Information
    employee = models.ForeignKey(to=Employee, on_delete=models.CASCADE, related_name="payslip_employee")
    payment_date = models.DateField()

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

    
    def calcIncomeTax(self, taxable_income):
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
        

    def save(self, *args, **kwargs):
        self.gross_earning = self.basic_salary + self.non_tax_transp_allow + self.transp_allow + self.tele_allow + self.pos_allow + self.overtime
        self.taxable_income = self.basic_salary + self.transp_allow + self.tele_allow + self.pos_allow + self.overtime

        self.income_tax = self.calcIncomeTax(self.taxable_income)
        self.pension_7 = self.basic_salary * 0.07
        self.pension_11 = self.basic_salary * 0.11

        self.total_deduction = self.income_tax + self.staff_loan + self.pension_7 + self.other_deductions + self.cost_sharing + self.penalty

        self.net_salary = self.gross_earning - self.total_deduction
        

        super().save(*args, **kwargs)