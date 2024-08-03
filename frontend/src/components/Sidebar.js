import React, { useEffect, useState } from 'react';
import {
  DashboardOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  SettingOutlined,
  SignatureOutlined,
  CarryOutOutlined,
  DollarOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { Breadcrumb, Divider, Layout, Menu, theme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomHeader from './Header';
import Logo from './Logo';
import axios from 'axios';

const { Sider, Content } = Layout;

const items = [
  {
    key: '',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'employees',
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

const logout = () => {
  return axios.post('http://127.0.0.1:8000/user/logout/api/');
}

const Sidebar = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('personal');

  const location = useLocation();
  const hideSidebarPath = ['/login', '/signup', '*'];
  const navigate = useNavigate();

  
  const onClick = (info) => {
    if(info.key == 'logout') {
      localStorage.removeItem('jwtToken');
      logout();
      navigate('/login');
    } else {
      setCurrent(info.key);
      navigate('/' + info.key); 
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const currentPath = location.pathname.slice(1).split("/")[0];
    setCurrent(currentPath);
    console.log(currentPath.split("/"));
  }, [location]);

  
  if(hideSidebarPath.includes(location.pathname)) {
    return <>{children}</>
  }

  return (
    <Layout hasSider className='custom-scroll' style={{height: '100vh'}}>
      <Sider 
        width={250}
        theme="light" 
        trigger={null} 
        collapsible 
        collapsed={collapsed}>

          <Logo />
        
        <Menu  
          className='mysidebar-menu flex flex-col gap-3 font-medium'
          theme="light"
          mode="inline"
          selectedKeys={current}
          defaultSelectedKeys={['']}
          onClick={onClick}
          items={items}
        />

        <div className='absolute bottom-4 w-full p-2'>
          
          <Divider />
          <Menu 
            className='logout-menu' 
            onClick={onClick}
            items={[{label: 'Logout', key: 'logout', icon: <ArrowLeftOutlined />}]} />

        </div>

      </Sider>

      <Layout>

       <CustomHeader collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />

        <Content className='custom-scroll' 
          style={{
            margin: '0 16px',
            overflowY: "auto",
          }}>

            {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;