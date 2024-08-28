import React from 'react';
import {Button, Col, ColorPicker, Divider, Flex, Form, Input, message, Row, Skeleton } from 'antd';
import MyTypography from '../../components/MyTypography';
import SearchInput from '../../components/SearchInput';
import axios from 'axios';
import ImageUpload from '../../components/ImageUpload';
import { DescText } from '../DecriptionText';
import { useSelector } from 'react-redux';

const CompanySetting = () => {
    const company = useSelector(state => state.company);
    const [companyForm] = Form.useForm();
  
    const COMPANY_URL = "http://127.0.0.1:8000/company/api/";

    const onClick = async (values) => {
      const formData = new FormData();
      values.forEach(name => {
        const value = companyForm.getFieldValue(name);
        if (name == "logo_img" && typeof(value) === "string") {
          return  
        }    

        formData.append(name, name == "brand_color" ? value.toHexString() : value);
      });
      await axios.patch(`${COMPANY_URL + company.company.id}/`, formData).then(response => {
        message.success("Company informations are updated!");   
        window.location.reload(); 
      }).catch(error => {
            message.error("Can't update company informations!");
            console.log(error);
        });  
        
      // const title = values[0].charAt(0).toUpperCase() + values[0].slice(1);
    }
    
    if (!company) {
        return <Skeleton />
    }    

    return <>
    <Flex className='my-2' align='center' vertical>
      <Form
      form={companyForm}
      layout='vertical'
      className='max-w-screen-xl'
      size='large'
      initialValues={company.company}>
  
        <Row gutter={32}>
          <Col span={24}>
            <MyTypography level={3}>Company Profile</MyTypography>
            <DescText>Choose how company are displayed.</DescText>
          </Col>
          <Col span={12}>
            <Form.Item label="Company Name" name="name" rules={[{required: true}]}>
              <Input placeholder='Enter Company Name' />
            </Form.Item>
            <Button type='primary' onClick={() => {onClick(["name", "logo_img"])}}>
              Save Changes
            </Button>
          </Col>
          <Col span={6}>
            <Form.Item label="Logo" name="logo_img" rules={[{required: true}]}>
              <ImageUpload listType={"picture-circle"}/>
              {/* <Upload 
                showUploadList={false}
                listType='picture-circle'>
                  <div className='flex items-center justify-center w-full h-full relative rounded-full to-primary-400 from-purple-400 bg-gradient-to-t'>
                      <Button type='text' className=' border-0 bg-none text-white'icon={<CameraOutlined />}> Upload</Button>
                  </div>
              </Upload> */}
            </Form.Item>
          </Col>
          
          <Divider />
          
          <Col span={24}>
            <MyTypography level={3}>Email and Phone</MyTypography>
            <DescText>Manage the email and phone number you use to sign in into HavenERP and recieve notification.</DescText>
          </Col>
          <Col span={12}>
          <Flex align='center' gap="middle">
            <Form.Item className='flex-grow' name="email" label="Email" rules={[{required: true}]}>
              <Input placeholder='Enter you email' />
            </Form.Item>
            <Button  type='primary' className='mt-1' onClick={() => {onClick("email")}}>Update</Button>
  
          </Flex>
          </Col>
          <Col span={12}>
            <Flex align='center' gap="middle">
              <Form.Item className='flex-grow' name="phone_number" label="Phone Number" rules={[{required: true}]}>
                <Input placeholder='Enter you Phone Number'/>
              </Form.Item>
  
              <Button type='primary' className='mt-1' onClick={() => {onClick("phone_number")}}>Update</Button>
            </Flex>
          </Col>
          
          <Divider />
  
          <Col span={24}>
            <MyTypography level={3}>Custom Brand Color</MyTypography>
            <DescText>Customize your own brand colour.</DescText>
          </Col>
  
          <Col span={12}>
              <Form.Item label="Brand Color (Light Theme)" name="brand_color">
                <ColorPicker 
                  allowClear 
                  showText
                  mode={['single', 'gradient']}
                  onChangeComplete={() => {onClick("brand_color")}}
                  />
              </Form.Item>
          </Col>
  
          <Col span={12}>
              <Form.Item label="Brand Color (Dark Theme)">
                <ColorPicker 
                  allowClear 
                  showText
                  />
              </Form.Item>
          </Col>
  
          <Divider />
          
          <Col span={24}>
            <MyTypography level={3}>Website and Tax Identification number (TIN)</MyTypography>
            <DescText>Enter your company's website address and Tax Identification Number.</DescText>
          </Col>
          <Col span={12}>
          <Flex align='center' gap="middle">
            <Form.Item className='flex-grow' label="Website" name="website">
              <Input addonBefore="https://" placeholder='Enter you website'/>
            </Form.Item>
            <Button  type='primary' className='mt-1' onClick={() => {onClick("website")}} >Update</Button>
  
          </Flex>
          </Col>
          <Col span={12}>
            <Flex align='center' gap="middle">
              <Form.Item className='flex-grow' label="TIN" name="tin" rules={[{required: true}]}>
                <Input placeholder='Enter your TIN'/>
              </Form.Item>
  
              <Button type='primary' className='mt-1' onClick={() => {onClick("tin")}}>Update</Button>
            </Flex>
          </Col>
  
          <Divider />
          
          <Col span={24}>
            <MyTypography level={3}>Currency</MyTypography>
            <DescText>Select the currency for your website as default.</DescText>
          </Col>
          <Col span={12}>
            <Flex align='center' gap="middle">
              <Form.Item className='flex-grow' label="Currency" name="currency">
                <SearchInput placeholder="Currency" />
              </Form.Item>
            </Flex>
          </Col>
  
        </Row>
  
      </Form>
    </Flex>
  </>
  }
  
  export default CompanySetting;