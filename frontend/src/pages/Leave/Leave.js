import { Badge, Button, Calendar, Card, Flex, Progress, Table, Tabs, Tag, Timeline } from 'antd'
import React from 'react'
import PageTitle from '../../components/PageTitle'
import StatisticCard from '../../components/StatisticCard'
import MyTypography from '../../components/MyTypography'
import MyCard from '../../components/MyCard'

const requestColumn = [{
  dataIndex: "name",
  title: "Employee name",
},
{
  dataIndex: "type",
  title: "Leave type",
  render: (value, _) => {
    const valueLowerCase = value.toString().toLowerCase();
    const color = valueLowerCase === "annual leave" ? "blue" : valueLowerCase === "sick leave" ? "red" : "green";
    return <Tag color={color}>{value}</Tag>
  },
},
{
  dataIndex: "job_position",
  title: "Job position",
},
{
  dataIndex: "date",
  title: "Date",
},
{
  dataIndex: "duration",
  title: "Duration",
},
{
  dataIndex: "action",
  title: "Action",
  render: (value, _) => {
    return <Flex gap={6}><Button size='small' type='primary'>Approve</Button>
    <Button size='small' type='primary' danger>Reject</Button></Flex>
  }
  
},
]

const calendarColumn = [
{
  dataIndex: "name",
  title: "Employee name",
},
{
  dataIndex: "type",
  title: "Leave type",
},
{
  dataIndex: "job_position",
  title: "Job position",
},
{
  dataIndex: "date",
  title: "Date",
},
{
  dataIndex: "due_date",
  title: "Due date"
},
]

const fakeData = [
  {
    name: "Dabala Yonas",
    type: "Annual Leave",
    job_position: "Developer",
    date: "Aug 29 - Sep 10",
    duration: "11 days",
    status: "Pending",
    action: "",
  },
  {
    name: "Bonsa Asafa",
    type: "Sick Leave",
    job_position: "Developer",
    date: "Aug 1 - Sep 20",
    duration: "20 days",
    status: "Pending",
    action: "",
  },
]

const fakeData2 = [
  {
    name: "Dabala Yonas",
    type: <Tag color='blue'>Anual Leave</Tag>,
    job_position: "Developer",
    date: "Aug 25 - Sep 5",
    due_date: "7 days",
  },
  {
    name: "Robera Yonas",
    type: <Tag color='red'>Sick Leave</Tag>,
    job_position: "Project Manager",
    date: "Aug 27 - Sep 2",
    due_date: "3 days",
  },
]

const LeaveSummary = () => {

  return <>
  <PageTitle title="Employee Leave" items={[
    {
      path: '/leave',
      title: 'Leave',
    }
  ]} />

  <Flex gap="middle" align='flex-start' className='mb-4'>
    <Flex gap="middle" className='flex-grow' vertical>
      <Flex gap="middle">
        {/* <Card><Progress 
          type="dashboard"
          percent={100}
          steps={{
            count: 3,
            gap: 5,
          }}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20} /></Card> */}
        <StatisticCard value={100} title="Anual Leave"/>
        <StatisticCard value={20} title="Sick Leave"/>
        <StatisticCard value={10} title="Other Leave"/>
      </Flex>
      <MyCard title="Leave Requests">
        <Table pagination={fakeData2.length > 10} columns={requestColumn} dataSource={fakeData}/>
      </MyCard>
      <MyCard title="Leave Calander">
        <Table pagination={fakeData2.length > 10} columns={calendarColumn} dataSource={fakeData2}/>
      </MyCard>
      {/* <Calendar /> */}
    </Flex>
    
    <MyCard title="Upcoming Holidays" className='flex-shrink w-72'>
      <Timeline
          mode='left'
          items={[
            {
              label: '2017-01-01',
              children: 'Fasika',
            },
            {
              label: '2017-01-12',
              children: 'Irrecha',
            },
            {
              label: '2017-01-17',
              children: 'Meskel',
            },
            {
              label: '2017-03-05',
              children: 'Gana',
            },
          ]}
        />
    </MyCard>
  </Flex>
  </>
}

const tabsItems = [
  {
    key: 1,
    label: "Summary",
    children: <LeaveSummary />,
  },
  {
    key: 2,
    label: "My Leave",
    children: "My Leave",
  },
];

function Leave() {
  return (
    <>
    <Tabs items={tabsItems} />
    </>
  )
}

export default Leave