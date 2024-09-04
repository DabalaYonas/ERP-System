import React, { useContext } from 'react';
import {Button, Col, ColorPicker, Divider, Flex, Form, Input, message, Row, Skeleton } from 'antd';
import MyTypography from '../../components/MyTypography';
import SearchInput from '../../components/SearchInput';
import axios from 'axios';
import ImageUpload from '../ImageUpload';
import { DescText } from '../DecriptionText';
import { AuthContext } from '../../context/AuthContext';

const getCurrency = async() => {
  return await axios.get("http://127.0.0.1:8000/lookup/api/currency/").then(response => response.data);
}

const CompanySetting = () => {
    const [companyForm] = Form.useForm();
    const { company } = useContext(AuthContext);
  
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
      await axios.patch(`${COMPANY_URL + company.id}/`, formData).then(response => {
        message.success("Company informations are updated!");   
        window.location.reload();        
      }).catch(error => {
            message.error("Can't update company informations!");
            console.error(error);
        });  
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
      initialValues={{...company,  currency_id: company.currency && company.currency.id}}>
  
        <Row gutter={32}>
          <Col span={24}>
            <MyTypography level={3}>Company Profile</MyTypography>
            <DescText>Choose how company are displayed.</DescText>
          </Col>
          <Col span={12}>
            <Form.Item label="Company Name" name="name">
              <Input placeholder='Enter Company Name' />
            </Form.Item>
            <Button type='primary' onClick={() => {onClick(["name", "logo_img"])}}>
              Save Changes
            </Button>
          </Col>
          <Col span={6}>
            <Form.Item label="Logo" name="logo_img">
              <ImageUpload listType={"picture-circle"}/>
            </Form.Item>
          </Col>
          
          <Divider />
          
          <Col span={24}>
            <MyTypography level={3}>Email and Phone</MyTypography>
            <DescText>Manage the email and phone number you use to sign in into HavenERP and recieve notification.</DescText>
          </Col>
          <Col span={12}>
          <Flex align='center' gap="middle">
            <Form.Item className='flex-grow' name="email" label="Email">
              <Input placeholder='Enter you email' />
            </Form.Item>
            <Button  type='primary' className='mt-1' onClick={() => {onClick(["email"])}}>Update</Button>
  
          </Flex>
          </Col>
          <Col span={12}>
            <Flex align='center' gap="middle">
              <Form.Item className='flex-grow' name="phone_number" label="Phone Number">
                <Input placeholder='Enter you Phone Number'/>
              </Form.Item>
  
              <Button type='primary' className='mt-1' onClick={() => {onClick(["phone_number"])}}>Update</Button>
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
                  onChangeComplete={() => {onClick(["brand_color"])}}
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
            <Button  type='primary' className='mt-1' onClick={() => {onClick(["website"])}} >Update</Button>
  
          </Flex>
          </Col>
          <Col span={12}>
            <Flex align='center' gap="middle">
              <Form.Item className='flex-grow' label="TIN" name="tin">
                <Input placeholder='Enter your TIN'/>
              </Form.Item>
  
              <Button type='primary' className='mt-1' onClick={() => {onClick(["tin"])}}>Update</Button>
            </Flex>
          </Col>
  
          <Divider />
          
          <Col span={24}>
            <MyTypography level={3}>Currency</MyTypography>
            <DescText>Select the currency for your website as default.</DescText>
          </Col>
          <Col span={12}>
            <Flex align='center' gap="middle">
              <Form.Item className='flex-grow' label="Currency" name="currency_id">
                <SearchInput placeholder="Currency" serverData={getCurrency} />
              </Form.Item>

              <Button type='primary' className='mt-1' onClick={() => {onClick(["currency_id"])}}>Update</Button>
            </Flex>
          </Col>
  
        </Row>
  
      </Form>
    </Flex>
  </>
  }
  
  export default CompanySetting;