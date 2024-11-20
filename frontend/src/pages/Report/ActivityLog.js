import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import { Flex, Input, Select, Space, Table } from 'antd'
import MyTypography from '../../components/MyTypography'
import dayjs from "dayjs";
import API from '../../services/api'

const columns = [
    {
        dataIndex: "date",
        title: "Date",
        render: (text) => dayjs(text).format("DD MMM, YY - hh:mm A"),
        sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
        dataIndex: "action",
        title: "Action",
        render: (text) => {
            const getValueByKey = (key) => {
            
            const actionFilter = [
                {login: 'Login'},
                {logout: 'Logout'},
                {view: 'View'},
                {create: 'Create'},
                {update: 'Update'},
                {delete: 'Delete'},
                {failed_login: 'Failed Login'},
            ]
              const matchedItem = actionFilter.find(item => item[key]);
              return matchedItem ? matchedItem[key] : key;
            };

            return getValueByKey(text)
        },
        filters: [
            {
                text: "CRUD",
                value: "crud",
                children: [
                    {
                        text: "View",
                        value: "view"
                    },
                    {
                        text: "Create",
                        value: "create"
                    },
                    {
                        text: "Update",
                        value: "update"
                    },
                    {
                        text: "Delete",
                        value: "delete"
                    },
                ]
            },
            {
                text: "Authentications",
                value: "auth",
                children: [
                    {
                        text: "Login",
                        value: "login"
                    },
                    {
                        text: "Logout",
                        value: "logout"
                    },
                    {
                        text: "Failed Login",
                        value: "failed_login"
                    },
                ]
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.action.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },
    {
        dataIndex: "user",
        title: "User",
        sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
        dataIndex: "details",
        title: "Details",
    },
    {
        dataIndex: "ipAddress",
        title: "IP address",
    }
]


function ActivityLog() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await API.get("/activity-log/api/")
            .then(response => {
                const datas = response.data.map(data => ({
                    id: data.id,
                    key: data.id,
                    user: data.user ? data.user.name : "Guest",
                    action: data.action,
                    date: data.timestamp,
                    details: data.details,
                    ipAddress: data.ip_address,
                }));

                setDataSource(datas);
                setLoading(false);
            }).catch(errInfo =>{
                console.error(errInfo);
            });
        }

        fetchData();
    }, []);

  return <>
    <PageTitle 
        title="Activity Log"
        description="View all users activity logs" />

    <Space className='w-full'
        size="large"
        direction='vertical'>
            <Flex justify='space-between' align='center'>
                <MyTypography level={3}>User Activities</MyTypography>
                <Space>
                    <Input.Search placeholder='Search user' className='w-96' />
                    <Select placeholder="Filter" className='w-28'>
                        <Select.Option value={1}>View</Select.Option>
                        <Select.Option value={2}>Edit</Select.Option>
                        <Select.Option value={3}>Delete</Select.Option>
                        <Select.Option value={4}>Create</Select.Option>
                    </Select>
                </Space>
            </Flex>
            
            <Table 
                columns={columns}
                loading={loading}
                dataSource={dataSource} />
    </Space>
  </>
}

export default ActivityLog