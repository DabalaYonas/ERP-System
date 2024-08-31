import { Button, Card, Col, DatePicker, Flex, Form, InputNumber, message, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/SearchInput';
import { getEmployee, getEmployees } from '../../services/handleEmployee';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dayjs from "dayjs";

const CURRENCY_SYMBOL = "Br";

function NewPayslip() {
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState();
    const [loading, setLoading] = useState(true);
    const { payslipId } = useParams();

    useEffect(() => {
        const loadInitialValue = async() => {
            if (payslipId) {
                const data = await axios.get(`http://127.0.0.1:8000/payroll/payslip/api/${payslipId}/`).then(response => response.data);
                data.name = data.employee.id;
                data.accountNo = data.employee.bank_acc && data.employee.bank_acc.accountNo;
                data.payment_date = dayjs(data.payment_date);
                setLoading(false);
                setInitialValues(data);
            } else {
                setLoading(false);
            }
        }
        loadInitialValue();
    }, []);

    const onEmployeeChanges = (data) => {        
        data && getEmployee(data.value).then(data => {
            form.setFieldValue("accountNo", data.bank_acc)
        })
    }

    const calcIncomeTax = (taxable_income) => { 
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

    const getField = (field_name) => {
        return form.getFieldValue(field_name) ? form.getFieldValue(field_name) : 0;
    }

    const calculateFields = () => {
        const gross_earning = getField("basic_salary") 
                            + getField("non_tax_transp_allow") 
                            + getField("transp_allow") 
                            + getField("tele_allow") 
                            + getField("pos_allow")
                            + getField("overtime");

        const taxable_income = getField("basic_salary") 
                                + getField("transp_allow") 
                                + getField("tele_allow") 
                                + getField("pos_allow") 
                                + getField("overtime");

        const income_tax = calcIncomeTax(taxable_income);
        const pension_7 = getField("basic_salary") * 0.07;
        const pension_11 = getField("basic_salary") * 0.11;

        const total_deduction = income_tax
                                + getField("staff_loan") 
                                + pension_7
                                + getField("other_deductions") 
                                + getField("cost_sharing")
                                + getField("penalty");
                                
        const net_salary = gross_earning - total_deduction;

        form.setFieldsValue({
            gross_earning: gross_earning,
            taxable_income: taxable_income,
            income_tax: income_tax,
            pension_7: pension_7,
            pension_11: pension_11,
            total_deduction: total_deduction,
            net_salary: net_salary,
        });
    }

    const handleFormChange = (_, { values, forms}) => {
        calculateFields();
    }

    const formatNumber = (number) => {
        const parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    const onFinish = async (values) => {
        const checkNullNumber = (value) => {
            return value ? value : 0;
        }
        
       const formData = new FormData();
       formData.append("employee_id", values.name);
       formData.append("payment_date", values.payment_date.format("YYYY-MM-DD"));
       formData.append("basic_salary", values.basic_salary);

       formData.append("non_tax_transp_allow", checkNullNumber(values.non_tax_transp_allow));
       formData.append("transp_allow", checkNullNumber(values.transp_allow));
       formData.append("tele_allow", checkNullNumber(values.tele_allow));
       formData.append("pos_allow", checkNullNumber(values.pos_allow));
       formData.append("overtime", checkNullNumber(values.overtime));
       formData.append("penalty", checkNullNumber(values.penalty));
       formData.append("staff_loan", checkNullNumber(values.staff_loan));
       formData.append("cost_sharing", checkNullNumber(values.cost_sharing));
       formData.append("other_deductions", checkNullNumber(values.other_deductions));

       try {
        if (payslipId) {
            await axios.put(`http://127.0.0.1:8000/payroll/payslip/api/${payslipId}/`, formData);
            message.success("Payslip saved successfully!");
        } else {
            await axios.post("http://127.0.0.1:8000/payroll/payslip/api/", formData);
            message.success("Payslip created successfully!");
            form.resetFields();
        }
       } catch (error) {
        console.log(error);
        message.error("Incorrect employee payslip! Please try again!")
       }
    }

    if (loading) {
        return <Skeleton />
    }

  return (
    <>
        {/* <PageTitle title="Payslip" items={[
      {
        path: '/payroll',
        title: 'Payroll',
      },
      {
        path: '/payslip',
        title: 'Payslip',
      }]}/> */}
      <PageTitle backable />
      <Form.Provider onFormChange={handleFormChange}>
        <Form
            initialValues={initialValues}
            onFinish={onFinish}
            className='my-3'
            form={form}
            size='large'
            layout='vertical'>

            <Card title="Basic Information" className='mb-3'>
                <Row gutter={20}>
                    <Col span={8}>       
                        <Form.Item label="Employee Name" name="name" rules={[{required: true, message: "Employee Name is required!"}]}>
                            <SearchInput placeholder="Employee Name" serverData={getEmployees} onSelect={onEmployeeChanges}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Bank Account" name="accountNo">
                            <InputNumber placeholder='Bank Account' className='w-full'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Payment Date" name="payment_date" rules={[{required: true, message: "Payment date is required!"}]}>
                            <DatePicker placeholder='Payment Date' className='w-full' picker='month'/>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            <Card title="Salary Structure" className='mb-3'>
                <Row gutter={20}>
                    <Col span={8}>       
                        <Form.Item label="Basic Salary" name="basic_salary" rules={[{required: true, message: "Basic salary is required!"}]}>
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                            className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Basic Salary" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Non taxable Transport Allowance" name="non_tax_transp_allow">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Non taxable Transport Allowance" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Taxable Transport Allowance" name="transp_allow">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Taxable Transport Allowance " />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Telephone allowance taxable" name="tele_allow">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Telephone  allowance taxable" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Position Allowance Taxable" name="pos_allow">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Position Allowance Taxable" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Overtime" name="overtime">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Overtime" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Gross Earning" name="gross_earning">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} 
                            className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Gross Earning" readOnly/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Taxable Income" name="taxable_income">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Taxable Income" readOnly/>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            <Card title="Deductions" className='mb-3'>
                <Row gutter={20}>
                    <Col span={8}>      
                        <Form.Item label="Income Tax" name="income_tax">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Income Tax" readOnly/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Penalty / Absent" name="penalty">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Penalty / Absent" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Staff Loan" name="staff_loan">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Staff Loan" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Cost Sharing" name="cost_sharing">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Cost Sharing" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Pension 7%" name="pension_7">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Pension 7%" readOnly/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Pension 11%" name="pension_11">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Pension 11%" readOnly/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Other Deductions" name="other_deductions">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Other Deductions" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Total Deduction" name="total_deduction">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Total Deduction" readOnly/>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            <Card title="Net Salary" className='mb-3'>
                <Row gutter={20}>
                    <Col span={8}>       
                        <Form.Item label="Net Salary" name="net_salary">
                            <InputNumber
                            formatter={formatNumber}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Net Salary" readOnly/>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            <Flex justify='end'>
                <Button type='primary' htmlType='sumbit'>{payslipId ? "Save Payslip" : "Create Payslip"}</Button>
            </Flex>
        </Form>
        </Form.Provider>
    </>
  )
}

export default NewPayslip;