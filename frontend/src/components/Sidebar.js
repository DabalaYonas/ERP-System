import React, { useContext, useEffect, useState } from 'react';
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
import { Divider, Layout, Menu, message, Skeleton, theme } from 'antd';
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
];

const Sidebar = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('personal');

  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, company } = useContext(AuthContext);

  const onClick = async (info) => {
    if(info.key === 'logout') {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        message.error("Can't logout for now!");
      }
    } else {
      setCurrent(info.key);
      navigate('/' + info.key); 
    }
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

  return (
    <Layout hasSider className='custom-scroll' style={{height: '100vh'}}>
      <Sider 
        width={250}
        theme="light" 
        trigger={null} 
        collapsible 
        collapsed={collapsed}>

          <Logo logo={company.logo_img}/>
        
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