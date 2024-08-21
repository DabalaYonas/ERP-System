import React from 'react';
import PageTitle from '../../components/PageTitle';
import { Button, Card, Col, ColorPicker, Divider, Flex, Form, Input, Row, Tabs, Upload } from 'antd';
import MyTypography from '../../components/MyTypography';
import { CameraOutlined, LockOutlined, SafetyCertificateOutlined, SafetyOutlined, WarningOutlined} from "@ant-design/icons";
import SearchInput from '../../components/SearchInput';

const DescText = ({ children }) => {
  return <p className='text-black text-opacity-70 text-base font-normal mb-5 mt-1'>{children}</p>
}

const UserSetting = () => {

  return <>
  {/* <Card className='mb-4'> */}
  <Flex className='my-2' align='center' vertical>
    <Form
    layout='vertical'
    className='max-w-screen-xl'
    size='large'
    initialValues={{ remember: true}}>
      <Row gutter={32}>
        <Col span={24}>
          <MyTypography level={2}>Your Profile</MyTypography>
          <DescText>Choose how you are displayed.</DescText>
        </Col>
        <Col span={12}>
          <Form.Item label="Name" rules={[{required: true}]}>
            <Input placeholder='Name' />
          </Form.Item>
          <Button htmlType='submit' type='primary'>
            Save Changes
          </Button>
        </Col>
        <Col span={6}>
          <Form.Item label="Profile Picture" rules={[{required: true}]}>
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
          <MyTypography level={2}>Email and Phone</MyTypography>
          <DescText>Manage the email and phone number you use to sign in into HavenERP and recieve notification.</DescText>
        </Col>
        <Col span={12}>
        <Flex align='center' gap="middle">
          <Form.Item className='flex-grow' label="Email" rules={[{required: true}]}>
            <Input placeholder='Enter you email' />
          </Form.Item>
          <Button  type='primary' className='mt-1'>Update</Button>

        </Flex>
        </Col>
        <Col span={12}>
          <Flex align='center' gap="middle">
            <Form.Item className='flex-grow' label="Phone Number" rules={[{required: true}]}>
              <Input placeholder='Enter you Phone Number' />
            </Form.Item>

            <Button type='primary' className='mt-1'>Update</Button>
          </Flex>
        </Col>
        <Divider />
        <Col span={24}>
          <MyTypography level={2}>Password and Security</MyTypography>
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
          <MyTypography level={2}>Delete Account</MyTypography>
          <DescText>If you no longer wish to use HavenERP, you can permanently delete your account.</DescText>
          <Button className='mt-2' type='primary' icon={<WarningOutlined />} danger>Delete My Account</Button>
        </Col>

      </Row>

    </Form>

  </Flex>
  {/* </Card> */}
  </>
}

const CompanySetting = () => {
  return <>
  <Flex className='my-2' align='center' vertical>
    <Form
    layout='vertical'
    className='max-w-screen-xl'
    size='large'
    initialValues={{ remember: true}}>

      <Row gutter={32}>
        <Col span={24}>
          <MyTypography level={2}>Company Profile</MyTypography>
          <DescText>Choose how company are displayed.</DescText>
        </Col>
        <Col span={12}>
          <Form.Item label="Company Name" rules={[{required: true}]}>
            <Input placeholder='Enter Company Name' />
          </Form.Item>
          <Button htmlType='submit' type='primary'>
            Save Changes
          </Button>
        </Col>
        <Col span={6}>
          <Form.Item label="Logo" rules={[{required: true}]}>
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
          <MyTypography level={2}>Email and Phone</MyTypography>
          <DescText>Manage the email and phone number you use to sign in into HavenERP and recieve notification.</DescText>
        </Col>
        <Col span={12}>
        <Flex align='center' gap="middle">
          <Form.Item className='flex-grow' label="Email" rules={[{required: true}]}>
            <Input placeholder='Enter you email' />
          </Form.Item>
          <Button  type='primary' className='mt-1'>Update</Button>

        </Flex>
        </Col>
        <Col span={12}>
          <Flex align='center' gap="middle">
            <Form.Item className='flex-grow' label="Phone Number" rules={[{required: true}]}>
              <Input placeholder='Enter you Phone Number' />
            </Form.Item>

            <Button type='primary' className='mt-1'>Update</Button>
          </Flex>
        </Col>
        
        <Divider />

        <Col span={24}>
          <MyTypography level={2}>Custom Brand Color</MyTypography>
          <DescText>Customize your own brand colour.</DescText>
        </Col>

        <Col span={12}>
            <Form.Item label="Brand Color (Light Theme)">
              <ColorPicker 
                allowClear 
                showText
                mode={['single', 'gradient']}
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
          <MyTypography level={2}>Website and Tax Identification number (TIN)</MyTypography>
          <DescText>Enter your company's website address and Tax Identification Number.</DescText>
        </Col>
        <Col span={12}>
        <Flex align='center' gap="middle">
          <Form.Item className='flex-grow' label="Website">
            <Input addonBefore="https://" placeholder='Enter you website' />
          </Form.Item>
          <Button  type='primary' className='mt-1'>Update</Button>

        </Flex>
        </Col>
        <Col span={12}>
          <Flex align='center' gap="middle">
            <Form.Item className='flex-grow' label="TIN" rules={[{required: true}]}>
              <Input placeholder='Enter your TIN' />
            </Form.Item>

            <Button type='primary' className='mt-1'>Update</Button>
          </Flex>
        </Col>

        <Divider />
        
        <Col span={24}>
          <MyTypography level={2}>Currency</MyTypography>
          <DescText>Select the currency for your website as default.</DescText>
        </Col>
        <Col span={12}>
          <Flex align='center' gap="middle">
            <Form.Item className='flex-grow' label="Currency">
              <SearchInput placeholder="Currency"/>
            </Form.Item>
          </Flex>
        </Col>

      </Row>

    </Form>
  </Flex>
</>
}

const GeneralSetting = () => {
  return <>
  <Row>
    <Col span={24}>
      <MyTypography level={4}>Theme</MyTypography>
      <DescText>This theme applies in all pages.</DescText>
    </Col>
    <Col span={8}>
      
    </Col>
  </Row>
  </>
}

const tabItems = [
  {
    key: 1,
    label: "General",
    children: <GeneralSetting />
  },
  {
    key: 2,
    label: "Account",
    children: <UserSetting />
  },
  {
    key: 3,
    label: "Company",
    children: <CompanySetting />
  },
  {
    key: 4,
    label: "Notification",
    children: "Notification"
  },
]

export default function Settings() {
  return (
    <>
      <PageTitle title="Settings"
        description="Manage your account setting and preference."
        items={[
      {
        path: '/settings',
        title: 'Settings',
      }
    ]} />
    <Card className='mb-4'>
      <Tabs size='large' centered items={tabItems} />
    </Card>
    </>
  )
}
