import React from 'react';
import { Avatar, Badge, Button, Dropdown, Flex, Input, Select, Space, Table } from 'antd';
import MyTypography from '../../components/MyTypography';
import { EditOutlined, UserOutlined, DeleteOutlined, MoreOutlined} from "@ant-design/icons";
import NewButton from '../../components/NewButton';
import { DescText } from '../../components/DecriptionText';

const ManageUser = () => {
    const items = [
      {
        label: 'Edit User',
        key: '1',
        icon: <EditOutlined />,
      },
      {
        label: 'View User',
        key: '2',
        icon: <UserOutlined />,
      },
      {
        label: 'Delete User',
        key: '3',
        icon: <DeleteOutlined />,
        danger: true,
      },
    ]
  
    const columns = [
      { 
        key: "user",
        dataIndex: "user",
        title: "User"
      },
      { 
        key: "role",
        dataIndex: "role",
        title: "Role"
      },
      { 
        key: "last_login",
        dataIndex: "last_login",
        title: "Last active"
      },
      { 
        key: "date_added",
        dataIndex: "date_added",
        title: "Date added"
      },
    ]
  
    const SelectMenu = () => (
      <Select style={{ width: 180}} defaultValue={2} placeholder="Permission">
        <Select.Option value={1}>Admin</Select.Option>
        <Select.Option value={2}>Viewer</Select.Option>
      </Select>);
  
    const dataSource = [
      {user: <Flex align='center' gap={10}><Avatar src="./photo_profile.jpg"></Avatar><p>Dabala Yonas</p></Flex>,
        role: <SelectMenu></SelectMenu>,
        last_login: <Badge status="processing" color='green' text="Online" />,
        date_added: <Flex justify='space-between'>Jul 10, 2024 <Dropdown menu={{items}} trigger={["click"]}><MoreOutlined /></Dropdown></Flex>
      },
      {user: <Flex align='center' gap={10}><Avatar src="./photo_profile.jpg"></Avatar><p>Robera Yonas</p></Flex>,
        role: <SelectMenu></SelectMenu>,
        last_login: "Aug 5, 2024",
        date_added: <Flex justify="space-between">Jul 22, 2024 <Dropdown menu={{items}} trigger={["click"]}><MoreOutlined /></Dropdown></Flex>,
      }
    ]
  
    return <>
    
      <MyTypography level={3}>User management</MyTypography>
      <DescText>Manage HavenERP users and their account permission.</DescText>
  
      <Flex justify='space-between' className='py-3'>
        <MyTypography level={3}>All users {dataSource.length}</MyTypography>
        <Space>
          <Input.Search style={{width: 350}} placeholder='Search' />
          <NewButton>Add User</NewButton>
          <Button>Invite User</Button>
        </Space>
      </Flex>
      <Table rowSelection columns={columns} dataSource={dataSource} />
    </>
  }

  export default ManageUser;