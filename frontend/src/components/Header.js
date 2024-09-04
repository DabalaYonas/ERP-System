import React, { useContext, } from 'react'
import { Layout, Input, Typography, Flex, Button, Avatar, Row, Col, Dropdown, Badge} from 'antd';
import {
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import NotificationDropDown from './NotificationDropDown';

const { Header } = Layout;

const items = [
  {
  label: <Link to="/settings/account">Profile</Link>,
  key: '0',
  icon: <UserOutlined />
  },
  {
    label: "Logout",
    key: '1',
    icon: <LogoutOutlined />
  }
]
const notifItems = [
  {
    avatar: "/photo_profile.jpg",
    content: <p className='text-black text-opacity-55'><span className='text-black text-opacity-85 font-semibold'>Dabala Yonas</span> ask for annual leave for 12 days.</p>,
    time: "1h ago",
  },
  {
    avatar:null,
    content: <p className='text-black text-opacity-55'><span className='text-black text-opacity-85 font-semibold'>4 new applicant</span> are applied for <span className='text-black text-opacity-85 font-semibold'>developer</span> job.</p>,
    time: "20m ago",
  },
]  

export default function CustomHeader({ profilePic, collapsed, setCollapsed, colorBgContainer }) {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClick = async({key}) => {
    switch (key) {
      case '1':
        await logout();
        navigate("/login");
        break;
    }
  }

  return (
    <Header
    style={{
      padding: 0,
      background: colorBgContainer,
    }}>
      <Flex align='center' justify='space-between'>
        <Flex align='center' gap='20px'>
          
          <Button
            type="text"
            icon={<FaBars size={20} className='opacity-60' />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Typography.Title level={3} type='secondary' style={{margin: '0px'}}>Hello, {user.name.split(" ")[0]}</Typography.Title>
        </Flex>

        <Flex align='center' style={{marginRight: '50px'}}>
          <Flex align='center'>
            <Row>
              <Col xs={0} md={0} lg={24} className='mr-20'>
                <Input.Search placeholder='Search here' style={{width: '320px', display: "block"}} />
              </Col>
              
              <Col xs={24} md={24} lg={0} className='mr-6'>
                <Button type='primary' shape='circle' icon={<SearchOutlined />}></Button>
              </Col>
            </Row>
          </Flex>

          <Flex align='center' gap='middle' >
            <NotificationDropDown
              title="Notification (2)"
              showIcon
              onIconClick={() => {navigate("/settings/notification")}}
              subTitle="Today"
              items={notifItems}>
              <Badge count={2}>
                <BellOutlined className='text-base bg-slate-100 p-2 rounded-md text-slate-800' />
              </Badge>
            </NotificationDropDown>
           
            {1 ? <MoonOutlined className='text-base cursor-pointer bg-slate-100 p-2 rounded-md text-slate-800' /> :
            <SunOutlined className='text-base cursor-pointer bg-slate-100 p-2 rounded-md text-slate-800' />}
           
            <Dropdown 
              className='cursor-pointer'
              menu={{items, onClick}}
              trigger={['click']}>
              {profilePic ? <Avatar src={profilePic} /> : <Avatar icon={<UserOutlined />} />}
            </Dropdown>
          </Flex>
          
        </Flex>
      </Flex>
  </Header>

  )
}
