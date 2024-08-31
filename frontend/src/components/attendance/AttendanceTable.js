import React, { useEffect, useState } from 'react'
import { getAttedances } from '../../services/handleAttendance';
import dayjs from "dayjs";
import { Table, Tag } from 'antd';

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
      let color = status.toLowerCase() === "late" ? 'red' : 'green';
      return <Tag color={color} key={status}>
        {status}
      </Tag>
    }
    },
    ];

const formatTime = "hh:mm A";

function isLate(scheduledTime, tolerance = 0) {
  const startTime = dayjs('08:30 AM', formatTime);

  const latestArrivalTime = dayjs(scheduledTime).add(tolerance, 'minute');
  
  return startTime.isBefore(dayjs(latestArrivalTime, formatTime));
}
  
export const attendanceStatus = (value) => {
  const status = isLate(value) ? "Late" : "On Time";
  
  return status;
}

function AttendanceTable({ date = dayjs(), rowSelection = false }) {
    const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const getAttedancesData = () => {
      getAttedances().then(response => {

        const data = [];

        response.forEach(attend => {          
          if (dayjs(attend.checkIn).isSame(date, 'day')) {
            data.push({
                key: attend.id,
                employee: attend.employee.name,
                checkin: dayjs(attend.checkIn).format(formatTime),
                checkout: dayjs(attend.checkOut).format(formatTime),
                workinghour: dayjs(attend.checkOut).subtract(dayjs(attend.checkIn)).format(formatTime),
                status: attendanceStatus(attend.checkIn),
              });
          }
        });

        setDataSource(data);

      });
    }

    getAttedancesData();
  }, [dayjs(date).format("YYYY-MM-DD")]);

  return <>
        <Table rowSelection={rowSelection} columns={columItems} dataSource={dataSource}/>
    </>
}

export default AttendanceTable