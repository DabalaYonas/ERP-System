import React, { useState } from 'react';
import {
  DashboardOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  SettingOutlined,
  SignatureOutlined,
  CarryOutOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomHeader from './Header';
import Logo from './Logo';

const { Sider, Content } = Layout;

const items = [
  {
    key: '',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'employee',
    icon: <TeamOutlined />,
    label: 'All Employee',
  },
  {
    key: 'payroll',
    icon: <DollarOutlined />,
    label: 'Payroll',
  },
  {
    key: 'attendance',
    icon: <CarryOutOutlined />,
    label: 'Attendance',
  },
  {
    key: 'recruitment',
    icon: <SignatureOutlined />,
    label: 'Recruitment',
  },
  {
    key: 'leave',
    icon: <FieldTimeOutlined />,
    label: 'Leave',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

const Sidebar = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const hideSidebarPath = ['/login', '/signup'];
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  if(hideSidebarPath.includes(location.pathname)) {
    return <>{children}</>
  }

  return (
    <Layout hasSider style={{height: '100vh'}}>
      <Sider 
        width={250}
        theme="light" 
        trigger={null} 
        collapsible 
        collapsed={collapsed}>

          <Logo />
        
        <Menu  
          className='flex flex-col gap-3 font-medium'
          theme="light"
          mode="inline"
          defaultSelectedKeys={['']}
          onSelect={(info) => {navigate('/' + info.key)}}
          items={items}
        />

      </Sider>

      <Layout>

       <CustomHeader collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />

        <Content
          style={{
            margin: '0 16px',
          }}>

            <Breadcrumb
              style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;