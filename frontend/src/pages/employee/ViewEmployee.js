import { Button, Card, Divider, Flex, Image, Table, Tag, Typography } from 'antd';
import { PaperClipOutlined, MailOutlined, EditOutlined, UserOutlined, FileDoneOutlined, ProjectOutlined, FieldTimeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import EmployeeTab from '../../components/employee/EmployeeTab';
import { getEmployee } from '../../services/handleEmployee';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import dayjs from "dayjs";
import { attendanceStatus } from '../../components/attendance/AttendanceTable';

const AttendanceChild = () => {
    const [dataSource, setDataSource] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const params = useParams();
    const userId = params ? params.userId : null;  

    useEffect(() =>{
      const loadDatas = async() => {
        setLoading(true);
        try {
          const responseDatas = await axios.get("http://127.0.0.1:8000/attendance/api/", {withCredentials: true}).then(response => response.data);
          const result = responseDatas.filter(data => data.employee.id == userId);     
          const datas = result.map(data => ({
            date: dayjs(data.checkIn).format("MMM DD, YYYY"),
            checkin: dayjs(data.checkIn).format("hh:mm A"),
            checkout: dayjs(data.checkOut).format("hh:mm A"),
            workinghour: dayjs(data.checkIn).subtract(dayjs(data.checkOut)).format("hh:mm A"),
            status: attendanceStatus(dayjs(data.checkIn)),
          }));
  
          setLoading(false);
          setDataSource(datas);
        } catch (error) {
          console.error(error);
        }
      }

      loadDatas();
    }, []);

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
          key: "workinghour",
          dataIndex: "workinghour",
          title: "Working Hour",
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

    return <Table 
              pagination={dataSource.length > 10} 
              className='w-full' 
              loading={loading}
              columns={columItems} 
              dataSource={dataSource}></Table>
};

const ComingSoon = () => (
  <Typography.Title>Coming Soon</Typography.Title>
);

const sideTabItems = (mDisabled) =>  {
  return [
  {   key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
      children: <EmployeeTab hasInitial={true} disabled={mDisabled} />
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

function ViewEmployee() {
    const [disabledForm, setDisabledForm] = useState(true);
    const [email, setEmail] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState(null);
    const [gender, setGender] = useState(null);
    const [jobPosition, setJobPosition] = useState(null);
    const params = useParams();
    const userId = params ? params.userId : null;  

    useEffect(() => {
      if (userId) {
        getEmployee(userId).then(data => {
          setEmail(data.email);
          setName(data.name);
          setProfilePic(data.profilePic);
          setGender(data.gender);
          
          data.job_position && setJobPosition(data.job_position.name);
          
        });
      }
    }, []);

    const handleEdit = (e) => {
      setDisabledForm(!disabledForm);
    }

    const breadcrumbItems = [
        {
          path: '/employees',
          title: 'All Employee',
        },
        {
          path: `/employees/${userId}`,
          title: name,
        }
      ];
    
    
    return (
        <>
        <PageTitle items={breadcrumbItems} title="Employee Detail" />
        <Card className='text-opacity-85 mb-5 mr-5'>
            <Flex justify='space-between'>
              <Flex gap={20}>
                  <Image src={profilePic ? profilePic : (gender == "Male" ? "/male-placeholder.jpg" : "/female-placeholder.jpg")} width={100} height={100} className='rounded-md object-cover object-center'></Image>
                  <Flex vertical gap={2}>
                    <h2 className='text-2xl font-semibold'> {name}</h2>
                    {jobPosition && <p><PaperClipOutlined /> {jobPosition}</p>}
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