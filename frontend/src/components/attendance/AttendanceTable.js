import React, { useEffect, useState } from 'react'
import { getAttedances } from '../../services/handleAttendance';
import dayjs from "dayjs";
import { Badge, Table, Tag } from 'antd';
import TableNameWithAvatar from '../TableNameWithAvatar';

const formatTime = "hh:mm A";

const columItems = [
    {
    key: "employee",
    dataIndex: "employee",
    title: "Employee",
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
    render: (_, { checkout }) => {
      return checkout ? <p>{dayjs(checkout).format(formatTime)}</p> : <Badge status='processing' color='green' text="Still working"/>
    },
    align: 'center'
    },
    // {
    // key: "break",
    // dataIndex: "break",
    // title: "Break",
    // },
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
      let color = status && status.toLowerCase() === "late" ? 'red' : 'green';
      return <Tag color={color} key={status}>
        {status === "ON_TIME" ? "On Time" : "Late"}
      </Tag>
    }
    },
    ];

function isLate(scheduledTime, tolerance = 0) {
  const startTime = dayjs('08:30 AM', formatTime);
  const latestArrivalTime = dayjs(scheduledTime).add(tolerance, 'minute');
  
  return startTime.isBefore(dayjs(latestArrivalTime, formatTime));
}
  
export const AttendanceStatus = (value) => {
  const status = isLate(value) ? "LATE" : "ON TIME";
  
  return status;
}

const calculateWorkingHour = (checkIn, checkOut) => {  
  const diffInMinutes = dayjs(checkOut).diff(dayjs(checkIn), 'minute');

  const hours = Math.max(Math.floor(diffInMinutes / 60), 0);
  const minutes = Math.max(diffInMinutes % 60, 0);

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} hr`;

  return formattedTime;
}

function AttendanceTable({ date = dayjs(), rowSelection = false, maxShow }) {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttedancesData = () => {
      getAttedances().then(response => {

        const data = [];

        response.forEach(attend => {          
          if (dayjs(attend.checkIn).isSame(date, 'day')) {
            data.push({
                key: attend.id,
                employee: <TableNameWithAvatar name={attend.employee.name} picture={attend.employee.profilePic} />,
                checkin: dayjs(attend.checkIn).format(formatTime),
                checkout: attend.checkOut,
                workinghour: attend.checkOut ? calculateWorkingHour(attend.checkIn, attend.checkOut) : calculateWorkingHour(attend.checkIn, dayjs()) ,
                status: attend.status,
              });
          }
        });
        setDataSource(maxShow ? data.slice(0, [Math.min(maxShow, data.length)]) : data);
      });
      
      setLoading(false);
    }

    fetchAttedancesData();
  }, [dayjs(date).format("YYYY-MM-DD")]);

  return <>
        <Table 
          loading={loading}
          pagination={dataSource.length > 10} 
          rowSelection={rowSelection} 
          columns={columItems} 
          dataSource={dataSource}/>
    </>
}

export default AttendanceTable