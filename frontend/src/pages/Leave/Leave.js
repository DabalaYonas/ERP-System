import { Button, Calendar, Flex, List, Progress, Table, Tabs, Tag, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import StatisticCard from '../../components/StatisticCard'
import MyTypography from '../../components/MyTypography'
import MyCard from '../../components/MyCard'
import { getHolidays } from '../../services/handleLeaves'
import dayjs from "dayjs";

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
  const [holidayItems, setHolidayItems] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await getHolidays();
        const datas = response.map(item => ({
          name: item.name,
          date: dayjs(item.date).format("MMM DD"),
          day: dayjs(item.date).format("dddd"),
        }));
        setHolidayItems(datas);        
      } catch (error) {
        console.error(error);
      }
    }

    fetchHolidays();

  }, []);

  return <>
  <PageTitle title="Employee Leave" items={[
    {
      path: '/leave',
      title: 'Leave',
    }
  ]} />

  <Flex gap="middle" align='flex-start'>
    <Flex gap="middle" className='flex-grow'  vertical>
      <Flex gap="middle">
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
    
    <MyCard title="Holidays" className='w-80'>
        <List
          className='px-2'
          dataSource={holidayItems}
          renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                  avatar={<div className='w-12 h-12 p-1 text-sm flex justify-center items-center bg-gradient-to-t to-pink-400 from-primary-400 font-semibold text-white rounded-lg text-center'>{item.date}</div>}
                  description={item.day}
                  title={<h3 className='font-semibold text-sm text-black text-opacity-85'>{item.name}</h3>}>

                </List.Item.Meta>
            </List.Item>
          )}>

        </List>
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