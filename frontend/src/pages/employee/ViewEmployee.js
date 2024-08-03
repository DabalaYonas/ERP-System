import { Button, Card, Col, DatePicker, Divider, Flex, Form, Image, Input, Row, Select, Table, Tag, Typography } from 'antd';
import { PaperClipOutlined, MailOutlined, EditOutlined, UserOutlined, FileTextOutlined, FileDoneOutlined, ProjectOutlined, FieldTimeOutlined, FolderOpenOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import PersonalForm from '../../components/employee/PersonalForm';
import WorkForm from '../../components/employee/WorkForm';
import Tab from '../../components/employee/EmployeeTab';
import DocumentForm from '../../components/employee/DocumentForm';
import Breadcrumbs from '../../components/Breadcrumbs';

const AttendanceChild = () => {
    const fakeData = [{
        key: "1",
        date: "Jul 9, 2024",
        checkin: "09:10 AM",
        checkout: "07:33 AM",
        break: "00:30 Hrs",
        workinghour: "08:00 Hrs",
        status: "On Time"
    },
    {
      key: "2",
      date: "Nov 12, 2024",
      checkin: "08:10 PM",
      checkout: "05:33 AM",
      break: "00:28 Hrs",
      workinghour: "07:30 Hrs",
      status: "Late",
  },];

const columItems = [
  {
      key: "date",
      dataIndex: "date",
      title: "Date",
  },
  {
      key: "checkin",
      dataIndex: "checkin",
      title: "Check In",
  },
  {
      key: "checkout",
      dataIndex: "checkout",
      title: "Check Out",
  },
  {
      key: "break",
      dataIndex: "break",
      title: "Break",
  },
  {
      key: "workinghour",
      dataIndex: "workinghour",
      title: "Working Houre",
  },
  {
      key: "status",
      dataIndex: "status",
      title: "Status",
      render: (_, { status }) => {
        let color = status.toLowerCase() === "late" ? 'red' : 'green';
        return <Tag color={color} key={status}>
          {status}
        </Tag>
      }
  },
];
    return <Table className='w-full' rowSelection columns={columItems} dataSource={fakeData}></Table>
};

const ComingSoon = () => (
  <Typography.Title>Coming Soon</Typography.Title>
);

const sideTabItems = (mDisabled) =>  {
  return [
  {   key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
      children: <Tab disabled={mDisabled} 
        PersonalChildern={PersonalForm} 
        WorkChildren={WorkForm} 
        DocumentChildren={DocumentForm} />
  },
  {   key: 'attendance',
      label: 'Attendance',
      icon: <FileDoneOutlined />,
      children: <AttendanceChild />
  },
  {   key: 'project',
      label: 'Project',
      icon: <ProjectOutlined />,
      children: <ComingSoon />
  },
  {   key: 'leave',
      label: 'Leave',
      icon: <FieldTimeOutlined />,
      children: <ComingSoon />
  },
]};

const breadcrumbItems = [
    {
      path: '/employees',
      title: 'All Employee',
    },
    {
      path: '/employees/1',
      title: 'Dabala Yonas',
    }
  ];


function ViewEmployee() {
    const userId = useParams();
    const [disabledForm, setDisabledForm] = useState(true);

    const handleEdit = (e) => {
      setDisabledForm(!disabledForm);
    }
    
    return (
        <>
        <Breadcrumbs items={breadcrumbItems} />
        <Card className='text-opacity-85'>
            <Flex justify='space-between'>
              <Flex gap={20}>
                  <Image src='/photo_profile.jpg' width={100} height={100} className='rounded-md'></Image>
                  <Flex vertical gap={2}>
                    <h2 className='text-2xl font-semibold'>Dabala Yonas</h2>
                    <p><PaperClipOutlined /> Content Creator</p>
                    <p><MailOutlined /> dabo.yonasl@gmail.com</p>
                  </Flex>
              </Flex>

              <Button type='primary' 
                disabled={!disabledForm}
                onClick={handleEdit} 
                icon={<EditOutlined />} 
                className='py-5 self-end'>Edit Employee</Button>

            </Flex>

            <Divider />
            
            <Flex>
              <Tabs
                  defaultActiveKey="1"
                  tabPosition="left"
                  style={{
                    width: "100%"
                  }}
                  items={sideTabItems(disabledForm)}
              />
            </Flex>
        </Card>
        </>
    )
}

export default ViewEmployee;