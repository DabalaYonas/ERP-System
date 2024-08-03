import React, { useState } from 'react';
import dayjs from "dayjs";
import { Button, Col, DatePicker, Flex, Form, Input, message, Row, Select, Space, Upload } from 'antd';
import { CameraOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop';
import { postEmployees } from "../../actions/handleEmployee";

function PersonalForm({ disabled, setActiveKey }) {
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const onFinish = (value) => {
    console.log(value);
    let formData = new FormData();
    formData.append("name", value.name);
    formData.append("email", value.email);
    formData.append("phone_number", value.phone_number);
    formData.append("gender", value.gender);
    formData.append("bdate", value.bdate.format("YYYY-MM-DD"));
    if (fileList.length > 0) {
      formData.append("profilePic", fileList[0], fileList[0].name);
    }
    // formData.append("bank_acc", value.bank_acc);
    // value.department = null;
    // value.jop_position = null;
    // try {
    //   // postEmployees(formData);
    //   message.success("Employee Added Seccussfully!");
    //   form.resetFields();
    //   setFileList([]);
      
    // } catch (error) {
    //   message.error("Can't upload this employee");
    //   console.log("There is an error uploading this employee!", error);
    // }
    setActiveKey("work");
  }

  const handleBeforeUpload = (file) => {
    setFileList([file]); 
    return false;
  }

  const handleChange = (file) => {
    const imgUrl = URL.createObjectURL(file.file);
    setImageUrl(imgUrl);
  }

  return (
    <Form
      onFinish={onFinish}
      size='large'
      disabled={disabled}
      initialValues={{
          remember: true,
          name: "Dabala Yonas Asafa",
          email: "dabo.yonasl@gmail.com",
          gender: "Male",
          bdate: dayjs('2015-01-01', 'YYYY-MM-DD'),
          phone_number: "0910227023",
          bank_acc: "1000418121037"
      }}
      layout='vertical'>

    <Row gutter={20}>
          <Col span={24} className='py-3'>
            <Form.Item name="profilePic" className='mb-0' label="Upload">
              <ImgCrop>
                <Upload
                  fileList={fileList}
                  showUploadList={false}
                  onChange={handleChange}
                  beforeUpload={handleBeforeUpload}
                  listType='picture-card'>
                    {imageUrl ? <img src={imageUrl} alt="profile-image" className='w-full' /> :
                    <Button type='text' style={{
                          border: 0,
                          background: 'none',
                        }} icon={<CameraOutlined />}> Upload</Button>}
                  </Upload>
              </ImgCrop>
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
        <Button type='default'>Cancel</Button>
        <Button htmlType='sumbit' type='primary' >Next</Button>
      </Space>
    </Flex>
</Form>
  )
}

export default PersonalForm;