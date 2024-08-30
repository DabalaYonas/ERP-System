import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Dropdown, Flex, Form, Input, Select, Space, Table } from 'antd';
import MyTypography from '../../components/MyTypography';
import { EditOutlined, UserOutlined, DeleteOutlined, MoreOutlined} from "@ant-design/icons";
import NewButton from '../../components/NewButton';
import { DescText } from '../../components/DecriptionText';
import axios from 'axios';
import dayjs from "dayjs";
import SearchInput from '../SearchInput';

const fetchRoles = async() => {
  return await axios.get("http://127.0.0.1:8000/user/api/role/").then(response => response.data);
}

const ManageUser = () => {
  const [dataSource, setDataSource] = useState();
  const [loading, setLoading] = useState(true);
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
        key: "id",
        dataIndex: "id",
        title: "ID"
      },
      { 
        key: "user",
        dataIndex: "user",
        title: "User"
      },
      { 
        key: "email",
        dataIndex: "email",
        title: "Email"
      },
      { 
        key: "role",
        dataIndex: "role",
        title: "Role",
        render: (value, _) => {
          return <Form.Item initialValue={value} style={{marginBottom: 0}}>
            <SearchInput serverData={fetchRoles} placeholder="Permission"></SearchInput>
            </Form.Item>
        }
      },
      { 
        key: "last_login",
        dataIndex: "last_login",
        title: "Last active",
        render: (value, _) => {

          return value.toLowerCase() === "online" ? <Badge status="processing" color='green' text="Online" /> : <p>{value}</p>;
        }
      },
      { 
        key: "date_added",
        dataIndex: "date_added",
        title: "Date Joined",
        render: (value, _) => {

          return <Flex justify="space-between">{value} <Dropdown menu={{items}} trigger={["click"]}><MoreOutlined /></Dropdown></Flex>
        }
      },
    ]

    useEffect(() => {
      const fetchUsersData = async() => {
        setLoading(true);
        try {
          const response = await axios.get("http://127.0.0.1:8000/user/api/all/", {headers: {"Content-Type": "application/json"}, withCredentials: true});
          const data = response.data.map(values => ({
            key: values.id,
            id: values.id,
            user: values.name,
            email: values.email,
            role: values.role && values.role.id,
            last_login: dayjs(values.last_login).format("MMM DD, YY - hh:mm A"),
            date_added: dayjs(values.date_joined).format("MMM DD, YYYY"),
          }));

          setDataSource(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
        
      }

      const interval = setInterval(() => {
        fetchUsersData();
      }, 300000);

      fetchUsersData();

      return () => clearInterval(interval);
    }, []);
  
    const SelectMenu = ({defaultValue}) => (
      <Select style={{ width: 180}} defaultValue={defaultValue} placeholder="Permission">
        <Select.Option value={1}>Admin</Select.Option>
        <Select.Option value={2}>Viewer</Select.Option>
      </Select>);
  
    return <>
    
      <MyTypography level={3}>User management</MyTypography>
      <DescText>Manage HavenERP users and their account permission.</DescText>
  
      <Flex justify='space-between' className='py-3'>
        <MyTypography level={3}>All users {dataSource && dataSource.length}</MyTypography>
        <Space>
          <Input.Search style={{width: 350}} placeholder='Search' />
          <NewButton>Add User</NewButton>
          <Button>Invite User</Button>
        </Space>
      </Flex>
      <Table columns={columns} dataSource={dataSource} pagination={dataSource && dataSource.length > 10} loading={loading} />
    </>
  }

  export default ManageUser;