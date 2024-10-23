import React, { useState } from 'react'
import PageTitle from '../../components/PageTitle';
import { Button, Card, Col, DatePicker, Form, Input, message, Row } from 'antd';
import dayjs  from 'dayjs';
import PayslipTable from '../../components/payroll/PayslipTable';
import { postPayroll } from '../../services/handlePayroll';

const items = [
    {
      path: '/payroll',
      title: 'Payroll',
    },
    {
      path: '/generate',
      title: 'Generate',
    }
  ]

function GeneratePayroll() {
    const [paymentDate, setPaymentDate] = useState(true);
    const [tableCount, setTableCount] = useState(null);
    const [generated, setGenerated] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (value) => {
      const month_year = dayjs(value.month_year);
      setPaymentDate(month_year);
      setGenerated(true);
    }

    const onSubmit = async() => {
        try {
            const formData = new FormData();
            formData.append("name", form.getFieldValue("name"));
            formData.append("payment_month_year", form.getFieldValue("month_year").format("YYYY-MM-DD"));
    
            await postPayroll(formData);
            message.success("Successfully generate payroll!");
        } catch (error) {
            console.error(error);
            message.error("Can't generate this payroll!");
        }
    }
    
  return <>
    <PageTitle title="Generate Payroll" items={items} />
    <Card title="Generate Payroll">
        <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        size='large'>
            <Row gutter={20}>
                <Col span={8}>
                    <Form.Item label="Payment name" name="name" rules={[{required: true, message: "Payment name is required!"}]}>
                        <Input placeholder='Payment name' />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Date generated">
                        <DatePicker className='w-full' defaultValue={new dayjs()} format={"DD-MM-YYYY"} allowClear={false} disabled/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Payment month & year" name="month_year" rules={[{required: true, message: "Payment month is required!"}]}>
                        <DatePicker className='w-full' picker='month' />
                    </Form.Item>
                </Col>
                <Col span={24} />
                <Col span={24}>
                    <Button className='px-10' type='primary' htmlType='submit'>Generate Payroll</Button>
                </Col>
            </Row>
        </Form>
    </Card>

    {generated && <Card className='my-3' title="Employee Details">
        <PayslipTable infinity noActions callback={setTableCount}/>
        {tableCount && <Button className='mt-4 px-12' size='large' type='primary' onClick={onSubmit}>Submit</Button>}
    </Card>}
  </>
}

export default GeneratePayroll;