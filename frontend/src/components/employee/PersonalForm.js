import React from 'react';
import { Button, Col, DatePicker, Flex, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../SearchInput';
import { getBankAccounts } from '../../services/handleLookupDatas';
import ImageUpload from '../ImageUpload';

function PersonalForm({ setActiveKey }) {
  const navigate = useNavigate();

  return (
  <>
    <Row gutter={20}>
          <Col span={24} className='py-3'>
            <Form.Item name="profilePic" className='mb-0' label="Profile Image">
                <ImageUpload />
            </Form.Item>
          </Col>
      <Col span={12} className='py-2'>
        <Form.Item label="Full Name" name="name" className='mb-0'>
          <Input placeholder='Enter Your Full Name' />
        </Form.Item>
      </Col>
      <Col span={12} className='py-2'>
        <Form.Item label="Email" name="email" className='mb-0'>
          <Input placeholder='Enter Email' />
        </Form.Item>
      </Col>
      <Col span={12} className='py-2'>
        <Form.Item label="Gender" name="gender" className='mb-0'>
          <Select placeholder="Gender" className='w-full'>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Femela</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12} className='py-2'>
        <Form.Item label="Phone Number" name="phone_number" className='mb-0'>
          <Input placeholder='Enter Phone Number' />
        </Form.Item>
      </Col>

      <Col span={12} className='py-3'>
          <Form.Item label="Birth Date" name="bdate" className='mb-0'>
            <DatePicker className='w-full'/>
          </Form.Item>
      </Col>

      <Col span={12} className='py-3'>
          <Form.Item label="Bank Account" name="bank_acc" className='mb-0'>
            <InputNumber className='w-full' placeholder='Account Number'/>
          </Form.Item>
      </Col>
    </Row>

    <Flex className='py-3' justify='end'>
      <Space>
        <Button type='default' onClick={() => {navigate("/employees")}}>Cancel</Button>
        <Button type='primary' onClick={() => {setActiveKey("work");}}>Next</Button>
      </Space>
    </Flex>
    </>
  )
}

export default PersonalForm;