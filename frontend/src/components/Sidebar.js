import React, { useContext, useEffect, useState } from 'react';
import {
  DashboardOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  SettingOutlined,
  SignatureOutlined,
  CarryOutOutlined,
  DollarOutlined,
  ArrowLeftOutlined,
  FileTextOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Divider, Layout, Menu, message, Skeleton, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CustomHeader from './Header';
import Logo from './Logo';
import { AuthContext } from '../context/AuthContext';
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
  {
    type: "divider"
  },
  {
    key: 'activity-log',
    icon: <FileTextOutlined />,
    label: 'Activity Log',
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('personal');

  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, company } = useContext(AuthContext);

  const onClick = (info) => {
    setCurrent(info.key);
    navigate('/' + info.key); 
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const currentPath = location.pathname.slice(1).split("/")[0];
    setCurrent(currentPath);
  }, [location]);

  if (!user || !company) {
    return <Skeleton />
  }

  const handleLogout = async() => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      message.error("Can't logout for now!");
    } 
  }

  return (
    <Layout hasSider style={{height: '100vh'}}>
      <Sider 
        className='custom-scroll' 
        width={250}
        collapsedWidth={80}
        theme="light" 
        trigger={null} 
        collapsible 
        style={{
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          overflowY: 'auto', 
          zIndex: 10,
        }}
        collapsed={collapsed}>

        <div>
          <Logo logo={company.logo_img}/>

          <Menu  
            className='mysidebar-menu flex flex-col gap-3 font-medium'
            theme='light'
            mode="inline"
            selectedKeys={current}
            defaultSelectedKeys={['']}
            onClick={onClick}
            items={items}
          />
        </div>

        <div className='px-2 py-4'>
          <Button
            size='large'
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            block>
            {collapsed ? '' : 'Logout'}
          </Button>
        </div>

      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'all 0.2s' }}>

       <CustomHeader profilePic={`http://127.0.0.1:8000/${user.profilePic}`} collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />

        <Content className='custom-scroll' 
          style={{
            overflowY: "auto",
            padding: "10px 16px"
          }}>
            <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;