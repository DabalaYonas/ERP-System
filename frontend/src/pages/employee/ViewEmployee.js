import { Button, Card, Col, DatePicker, Divider, Flex, Form, Image, Input, Row, Select, Table, Tag, Typography } from 'antd';
import { PaperClipOutlined, MailOutlined, EditOutlined, UserOutlined, FileTextOutlined, FileDoneOutlined, ProjectOutlined, FieldTimeOutlined, FolderOpenOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import PersonalForm from '../../components/employee/PersonalForm';
import WorkForm from '../../components/employee/WorkForm';
import Tab from '../../components/employee/EmployeeTab';
import DocumentForm from '../../components/employee/DocumentForm';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getEmployee } from '../../actions/handleEmployee';
import { getJopPosition } from '../../actions/handleJopPosition';
import PageTitle from '../../components/PageTitle';

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
      children: <Tab hasInitial={true} disabled={mDisabled} 
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
    const [disabledForm, setDisabledForm] = useState(true);
    const [email, setEmail] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState(null);
    const [gender, setGender] = useState(null);
    const [jopPosition, setJopPosition] = useState(null);
    const params = useParams();

    useEffect(() => {
      const userId = params ? params.userId : null;
      if (userId) {
        getEmployee(userId).then(data => {
          setEmail(data.email);
          setName(data.name);
          setProfilePic(data.profilePic);
          setGender(data.gender);

          data.jop_position && setJopPosition(data.jop_position.name);
          
        });
      }
    }, []);

    const handleEdit = (e) => {
      setDisabledForm(!disabledForm);
    }
    
    return (
        <>
        <PageTitle items={breadcrumbItems} title="Employee Detail" />
        <Card className='text-opacity-85 mb-5 mr-5'>
            <Flex justify='space-between'>
              <Flex gap={20}>
                  <Image src={profilePic ? profilePic : (gender == "Male" ? "/male-placeholder.jpg" : "/female-placeholder.jpg")} width={100} height={100} className='rounded-md'></Image>
                  <Flex vertical gap={2}>
                    <h2 className='text-2xl font-semibold'> {name}</h2>
                    {jopPosition && <p><PaperClipOutlined /> {jopPosition}</p>}
                    <p><MailOutlined /> {email}</p>
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