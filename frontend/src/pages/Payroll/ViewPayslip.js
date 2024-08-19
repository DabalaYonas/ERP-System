import React, { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Flex, Skeleton, } from 'antd'
import MyTypography from '../../components/MyTypography';
import { ToWords } from 'to-words';
import PageTitle from '../../components/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs  from 'dayjs';

const colums = [
  {
    title: 'Salary Structure',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
]

const colums2 = [
  {
    title: 'Deduction',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
]

const items = [{
  key: 1,
  label: "Basic Salary",
  children: "44,823",
  span: 1,
},
{
  key: 3,
  label: "Transport Allowance",
  children: "8,823",
  span: 1,
},
{
  key: 4,
  label: "Position Allowance",
  children: "13,823",
  span: 1,
},
{
  key: 5,
  label: "Overtime",
  children: "13,823",
  span: 1,
},
{
  key: 6,
  label: "Penalty",
  children: "13,823",
  span: 1,
},
{
  key: 7,
  label: "Gross Earning",
  children: "63,823",
  span: 3,
},]


const items2 =[
{
  key: 8,
  label: "Taxable Income",
  children: "13,823",
  span: 1,
},
{
  key: 9,
  label: "Income Tax",
  children: "13,823",
  span: 1,
},
{
  key: 10,
  label: "Staff Loan",
  children: "13,823",
  span: 1,
},
{
  key: 11,
  label: "Cost Sharing",
  children: "13,823",
  span: 1,
},
{
  key: 12,
  label: "Pension 7%",
  children: "13,823",
  span: 1,
},
{
  key: 13,
  label: "Pension 11%",
  children: "13,823",
  span: 1,
},
{
  key: 14,
  label: "Pension Total 18%",
  children: "13,823",
  span: 1,
},
{
  key: 15,
  label: "Other Deductions",
  children: "13,823",
  span: 1,
},
{
  key: 16,
  label: "Total Deduction",
  children: "13,823",
  span: 1,
},
{
  key: 17,
  label: "Net Pay",
  children: "263,823",
  span: 3,
},
]

const SalaryTable = ({ colums, items }) => {

  return <table className='custom-table'>
  <thead>
      <tr>
    {colums && colums.map(item => (
        <th key={item.key}>{item.title}</th>
    ))}
    </tr>
  </thead>
  
  <tbody>
    {items && items.map((item) => (
      <tr key={item.key}><td>{item.label}</td>
      <td>{formatNumber(item.amount)}</td></tr>
    )
    )}
  </tbody>
</table>
}

const formatNumber = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}


function ViewPayslip() {
  const {payslipId} = useParams();  
  const [salaryStructure, setSalaryStructure] = useState([]);
  const [deduction, setDeduction] = useState();
  const [payslipData, setPayslipData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: 'Birr',
        plural: 'Birrs',
        symbol: 'Br',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: '',
        },
      },
    },});

  const salaryKeys = [
    {key: "basic_salary", title: "Basic Salary"},
    {key: "non_tax_transp_allow", title: "Non Taxable Transport Allowance"},
    {key: "transp_allow", title: "Transport Allowance"},
    {key: "tele_allow", title: "Telephone Allowance"},
    {key: "pos_allow", title: "Position Allowance"},
    {key: "overtime", title: "Overtime"},
    {key: "penalty", title: "Penalty"},
    {key: "gross_earning", title: "Gross Earning"},
  ]
  const deductionKeys = [
    {key: "taxable_income", title: "Taxable Income"},
    {key: "income_tax", title: "Income Tax"},
    {key: "staff_loan", title: "Staff Loan"},
    {key: "cost_sharing", title: "Cost Sharing"},
    {key: "pension_7", title: "Pension 7%"},
    {key: "pension_11", title: "Pension 11%"},
    // {key: "", title: "Pension Total 18%"},
    {key: "other_deductions", title: "Other Deductions"},
    {key: "total_deduction", title: "Total Deduction"},
    {key: "net_salary", title: "Net Pay"},
  ]

    useEffect(() => {
      const loadPayslipData = async() => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/payroll/payslip/api/${payslipId}/`);
          setPayslipData(response.data);
          setLoading(false);
          const salaryData = [];
          const deductionData = [];
          let i = 0;
          for( const [key, value] of Object.entries(response.data)) {
            // console.log(key, value);
            
            if (i < 11 && i > 2) {
            salaryData.push({
              key: i, 
              label: salaryKeys.find(item => item.key == key).title,
              amount: value.toString(),
            })
              
            }
            if (i > 10) {              
              deductionData.push({
                key: i, 
                label: deductionKeys.find(item => item.key == key).title,
                amount: value.toString(),
              })
            }
            i += 1;            
          }
          setSalaryStructure(salaryData);
          setDeduction(deductionData);
            
        } catch (error) {
          console.log(error);
        }
      }

      loadPayslipData();
    }, []);

    if (loading) {
      return <Skeleton />
    }

  return <>
  <PageTitle backable />
    <Card className='my-2'>
      <Flex align='center' justify='space-between'>
        <div>
          <MyTypography level={1}>{payslipData.employee.name}</MyTypography>
          <p className='text-lg black-text'>{payslipData.employee.job_position.name}</p>
        </div>
        <Button size='large' type='primary' onClick={() => {navigate("edit-payslip/")}}>Edit Payslip</Button>
      </Flex>
    </Card>
    <Card className='my-2'>      
      <Descriptions className='mb-4' size='middle' title="Salary Payslip" items={[{key: 1, label: "Month", children: dayjs(payslipData.payment_date).format("MMMM")}, {key: 2, label: "Year", children: dayjs(payslipData.payment_date).year()}]} />
      <Flex gap={20} align='flex-start'>
        <SalaryTable colums={colums} items={salaryStructure} />
        <div>
          <SalaryTable colums={colums2} items={deduction} />
          <p className='font-semibold py-3 text-base black-text'>Net Salary in Words: {toWords.convert(payslipData.net_salary)}</p>
        </div>
      </Flex>
    </Card>
  </>
}

export default ViewPayslip