import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Flex, Form, Input, message, Row, Skeleton, Upload } from 'antd';
import MyTypography from '../../components/MyTypography';
import { CameraOutlined, LockOutlined, SafetyOutlined, WarningOutlined} from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { DescText } from '../DecriptionText';
import axios from 'axios';


const UserSetting = () => {
    const user = useSelector(state => state.user.user);
    const [userForm] = Form.useForm();
  
    const USER_URL = "http://127.0.0.1:8000/user/api/";

    const onClick = async (values) => {
      const formData = new FormData();
      values.forEach(name => {
        const value = userForm.getFieldValue(name);
        if (!(name == "profilePic" && typeof(value) === "string")) {
          value && formData.append(name, value);
        }    
      });

      await axios.patch(`${USER_URL}`, formData, {headers : {"Content-Type": "application/json"}, withCredentials: true}).then(response => {
        window.location.reload(); 
        message.success("User informations are updated!");   
      }).catch(error => {
            message.error("Can't update User informations!");
            console.log(error);
        });  
    }
  
    if (!user) {
      return <Skeleton />
    }
    
  
    return <>
    {/* <Card className='mb-4'> */}
    <Flex className='my-2' align='center' vertical>
      <Form
      form={userForm}
      layout='vertical'
      className='max-w-screen-xl'
      size='large'
      initialValues={user}>
        <Row gutter={32}>
          <Col span={24}>
            <MyTypography level={3}>Your Profile</MyTypography>
            <DescText>Choose how you are displayed.</DescText>
          </Col>
          <Col span={12}>
            <Form.Item label="Name" name="name">
              <Input placeholder='Name' />
            </Form.Item>
            <Button htmlType='submit' type='primary' onClick={() => {onClick(["name", "profilePic"])}}>
              Save Changes
            </Button>
          </Col>
          <Col span={6}>
            <Form.Item label="Profile Picture" name="profilePic">
              <Upload 
                showUploadList={false}
                listType='picture-circle'>
                  <div className='flex items-center justify-center w-full h-full relative rounded-full to-primary-400 from-purple-400 bg-gradient-to-t'>
                      <Button type='text' className=' border-0 bg-none text-white'icon={<CameraOutlined />}> Upload</Button>
                  </div>
              </Upload>
            </Form.Item>
          </Col>
      <Divider />
          <Col span={24}>
            <MyTypography level={3}>Email and Phone</MyTypography>
            <DescText>Manage the email and phone number you use to sign in into HavenERP and recieve notification.</DescText>
          </Col>
          <Col span={12}>
          <Flex align='center' gap="middle">
            <Form.Item className='flex-grow' label="Email" name="email">
              <Input placeholder='Enter you email' />
            </Form.Item>
            <Button  type='primary' className='mt-1' onClick={() => {onClick(["email"])}}>Update</Button>
  
          </Flex>
          </Col>
          <Col span={12}>
            <Flex align='center' gap="middle">
              <Form.Item className='flex-grow' label="Phone Number" name="phone_number">
                <Input placeholder='Enter you Phone Number' />
              </Form.Item>
  
              <Button type='primary' className='mt-1' onClick={() => {onClick(["phone_number"])}}>Update</Button>
            </Flex>
          </Col>
          <Divider />
          <Col span={24}>
            <MyTypography level={3}>Password and Security</MyTypography>
            <DescText>Secure your account with password and two-factor authentication.</DescText>
          </Col>
          <Col span={24}>
            <Card className='cursor-default'>
              <Flex align='center' justify='space-between'>
                <Flex gap={16}>
                  <LockOutlined className='text-lg'/>
                  <div>
                    <MyTypography level={4}>Account Password</MyTypography>
                    <p className='text-black text-opacity-70'>Please follow the instruction in the email to finish setting your password.</p>
                  </div>
                </Flex>
                <Button>Set Password</Button>
              </Flex>
              <Divider />
              <Flex align='center' justify='space-between'>
                <Flex gap={16}>
                  <SafetyOutlined className='text-lg'/>
                  <div>
                    <MyTypography level={4}>Two-Factor Authentication</MyTypography>
                    <p className='text-black text-opacity-70'>Please set a password before enabling two-factor authentication.</p>
                  </div>
                </Flex>
                <Button>Enable 2FA</Button>
              </Flex>
            </Card>
          </Col>
  
          <Divider />
  
          <Col span={24}>
            <MyTypography level={3}>Delete Account</MyTypography>
            <DescText>If you no longer wish to use HavenERP, you can permanently delete your account.</DescText>
            <Button className='mt-2' type='primary' icon={<WarningOutlined />} danger>Delete My Account</Button>
          </Col>
  
        </Row>
  
      </Form>
  
    </Flex>
    {/* </Card> */}
    </>
  }

  export default UserSetting;