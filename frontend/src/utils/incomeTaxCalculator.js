
export const calculateIncomeTax = (taxable_income) => { 
    if(taxable_income < 600)
        return 0
    else if(taxable_income < 1651)
        return taxable_income * 0.1 - 60
    
    else if(taxable_income < 3201)
        return taxable_income * 0.15 - 142.5
    
    else if(taxable_income < 5251)
        return taxable_income * 0.2 - 302.5
    
    else if(taxable_income < 7801)
        return taxable_income * 0.25 - 565
    
    else if(taxable_income < 10900)
        return taxable_income * 0.3 - 955
    
    else if(taxable_income > 10900)
        return taxable_income * 0.35 - 1500

    return 0
}