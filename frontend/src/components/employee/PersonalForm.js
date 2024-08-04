import React, { useState } from 'react';
import { Button, Col, DatePicker, Flex, Form, Input, message, Row, Select, Space, Upload } from 'antd';
import { CameraOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop';
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

function PersonalForm({ setActiveKey }) {
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();

  const handleBeforeUpload = (file) => {
    setFileList([file]);
    return false;
  }

  const handleChange = (file) => {
    const imgUrl = URL.createObjectURL(file.file);
    setImageUrl(imgUrl);
    // setFileList([file]);
  }

  return (
  <>
    <Row gutter={20}>
          <Col span={24} className='py-3'>
            <Form.Item name="profilePic" className='mb-0' label="Profile Image">
              {/* <ImgCrop> */}
                <Upload
                  fileList={fileList}
                  showUploadList={false}
                  onChange={handleChange}
                  beforeUpload={handleBeforeUpload}
                  listType='picture-card'>
                  {imageUrl ? (<div className='w-full h-full rounded-lg relative bg-gray-100'>
                        <DeleteOutlined onClick={(e) => {setFileList([]); setImageUrl()}} className='z-50 absolute hover:bg-slate-600 hover:bg-opacity-60 p-1 text-lg top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 opacity-50 hover:opacity-100'/>
                        <img src={imageUrl} alt="profile-image" className='object-contain w-full h-full over' />
                      </div>) :
                    <Button type='text' style={{
                          border: 0,
                          background: 'none',
                        }} icon={<CameraOutlined />}> Upload</Button>}
                  </Upload>
              {/* </ImgCrop> */}
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
            <Input type='number' placeholder='Account Number'/>
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