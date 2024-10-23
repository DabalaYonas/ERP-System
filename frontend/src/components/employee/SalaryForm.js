import { Col, Divider, Form, InputNumber, Row} from 'antd';
import React from 'react';

const CURRENCY_SYMBOL = "Br";

function SalaryForm() {

    const formatNumber = (number) => {
        const parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

  return (
    <>
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
    </Row>
    <Divider orientation='left'>
        Deductions
    </Divider>
        <Row gutter={20}>
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
                <Form.Item label="Other Deductions" name="other_deductions">
                    <InputNumber
                    formatter={formatNumber}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')} className='w-full' suffix={CURRENCY_SYMBOL} placeholder="Other Deductions" />
                </Form.Item>
            </Col>
        </Row>
    </>
  )
}

export default SalaryForm;