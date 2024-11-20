import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Flex, Form, Input, message, Space, Table } from 'antd';
import MyTypography from '../MyTypography';
import { EditOutlined, UserOutlined, DeleteOutlined, MoreOutlined} from "@ant-design/icons";
import NewButton from '../NewButton';
import { DescText } from '../DecriptionText';
import dayjs from "dayjs";
import { AuthContext } from '../../context/AuthContext';
import DataSelect from '../DataSelect';
import API from '../../services/api';

const fetchRoles = async() => {
  return await API.get("/user/api/roles/").then(response => response.data).catch(error => {console.error(error);
  });
}

const ManageUsers = () => {
  const [dataSource, setDataSource] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchUsersData = async() => {
    setLoading(true);
    try {
      const response = await API.get("/user/api/all/", 
        {headers: {"Content-Type": "application/json"}, 
        withCredentials: true});

      const data = response.data.map(values => ({
        key: values.id,
        id: values.id,
        user: values.name,
        email: values.email,
        role: values.groups__id,
        last_login: values.last_login,
        date_added: values.date_joined,
      }));

      setDataSource(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    
  }

  const updateRole = async(user_id, role_id) => {
    try {
      await API.post("/user/api/assign-role/", 
        {user_id: user_id, role_id: role_id});
      
      message.success("Successfully updated user role!");
      fetchRoles();
    } catch (error) {
      if (error.response.data.error) {
        message.error(error.response.data.error);
      } else if (error.response.data.detail) {
        message.error(error.response.data.detail);
      } else {
        message.error("Can't updated user role!");
      }
    }
  }
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
        render: (_, {id, role}) => {
          return <Form initialValues={{role: role}}>
                  <Form.Item className='w-52' name="role" style={{marginBottom: 0}}>
                    <DataSelect placeholder="Select role" link="http://127.0.0.1:8000/user/api/roles/" 
                        onChange={(role_id) => {updateRole(id, role_id)}} />
                  </Form.Item>
                </Form>
        }
      },
      { 
        key: "last_login",
        dataIndex: "last_login",
        title: "Last login",
        render: (value, _) => {
          return dayjs(value.last_login).format("MMM DD, YY hh:mm A");
        }
      },
      { 
        key: "date_added",
        dataIndex: "date_added",
        title: "Date Joined",
        render: (value, _) => {
          return <Flex justify="space-between">
                    {dayjs(value.date_joined).format("MMM DD, YYYY")}
                    <Dropdown menu={{items}} trigger={["click"]}><MoreOutlined /></Dropdown>
                  </Flex>
        }
      },
    ]

    useEffect(() => {
      fetchUsersData();
    }, []);
  
    return <>
      <MyTypography level={3}>User management</MyTypography>
      <DescText>Manage all your users and their account role.</DescText>
  
      <Flex justify='space-between' className='py-3'>
        <MyTypography level={3}>All users {dataSource && dataSource.length}</MyTypography>
        <Space>
          <Input.Search style={{width: 350}} placeholder='Search' />
          <NewButton>Add User</NewButton>
          <Button>Invite User</Button>
        </Space>
      </Flex>
      
      <Table 
        columns={columns} 
        dataSource={dataSource} 
        pagination={dataSource && dataSource.length > 10} 
        loading={loading} />
    </>
  }

  export default ManageUsers;