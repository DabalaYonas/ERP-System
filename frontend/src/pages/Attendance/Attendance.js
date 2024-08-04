import { Flex, Input, Table, Tag } from 'antd';
import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';

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

function Attendance() {
  return (
    <>
    <Breadcrumbs items={[
      {
        path: '/attendance',
        title: 'Attendance',
      }
    ]} />

    <Flex className='mb-4'>
      <Input.Search placeholder='Search Employee Attendance' size='large' />
    </Flex>
    <Table columns={columItems} dataSource={fakeData}/>
    </>
  );
}

export default Attendance