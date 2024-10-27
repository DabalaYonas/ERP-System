import React, { useEffect, useState } from 'react'
import { getAttedances } from '../../services/handleAttendance';
import dayjs from "dayjs";
import { Badge, Table, Tag } from 'antd';
import NameWithAvatar from '../NameWithAvatar';

const formatTime = "hh:mm A";

const columItems = [
    {
      dataIndex: "id",
      title: "ID",
      sorter: (a, b) => a.id - b.id,
    },
    {
      dataIndex: "employee",
      title: "Employee",
      sorter: (a, b) => a.employee.localeCompare(b.employee),
      render: (_, item) => {
        return <NameWithAvatar name={item.employee} picture={item.profilePic} />
      }
    },
    {
      dataIndex: "checkin",
      title: "Check In",
    },
    {
      dataIndex: "checkout",
      title: "Check Out",
      render: (_, { checkout }) => {
        return checkout ? <p>{dayjs(checkout).format(formatTime)}</p> : <Badge status='processing' color='green' text="Still working"/>
      },
    },
    {
      dataIndex: "break",
      title: "Break",
      render: (_, { break_start, break_end }) => {
        return break_end ? <p>{calcDiffHour(break_start, break_end, "minute")}</p> : break_start ? <Badge status='processing' color='green' text="On break"/> : <p>00:00 min</p>
      },
    },
    {
      dataIndex: "workinghour",
      title: "Working Hour",
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (_, { status }) => {
        let color = status && status.toLowerCase() === "late" ? 'red' : 'green';
        return <Tag color={color} key={status}>
          {status}
        </Tag>
      }
    },
    ];

function isLate(scheduledTime, tolerance = 0) {
  const startTime = dayjs('08:30 AM', formatTime).set('date', 1);
  const latestArrivalTime = dayjs(scheduledTime).add(tolerance, 'minute').set('date', 1);
  
  return startTime.isBefore(dayjs(latestArrivalTime, formatTime));
}
  
export const AttendanceStatus = (value) => {
  const status = isLate(value) ? "Late" : "On Time";
  
  return status;
}

const calcDiffHour = (checkIn, checkOut, formated = "hour") => {  
  const diffInSecond = dayjs(checkOut).diff(dayjs(checkIn), 'second');

  const hours = Math.max(Math.floor((diffInSecond / 60) / 60), 0);
  const minutes = Math.max(Math.floor(diffInSecond / 60), 0);
  const second = Math.max(diffInSecond % 60, 0);

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} hr`;
  const minutesSecondsFormat = `${String(minutes).padStart(2, '0')}:${String(second).padStart(2, '0')} min`;


  if (formated == "minute") {
    return minutesSecondsFormat;
  } else {
    return formattedTime;
  }
}

function AttendanceTable({ date = dayjs(), rowSelection = false, maxShow, reload }) {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttedancesData = () => {
      getAttedances().then(response => {

        const data = [];

        response.forEach(attend => {  
          if (dayjs(attend.date).isSame(date, 'day')) {
            data.push({
                key: attend.employee.id,
                id: attend.employee.id,
                employee: attend.employee.name,
                profilePic: attend.employee.profilePic,
                checkin: dayjs(attend.checkIn).format(formatTime),
                checkout: attend.checkOut,
                break_start: attend.break_start,
                break_end: attend.break_end,
                workinghour: attend.checkOut ? calcDiffHour(attend.checkIn, attend.checkOut) : calcDiffHour(attend.checkIn, dayjs()),
                status: AttendanceStatus(attend.checkIn)
              });
          }
        });
        setDataSource(maxShow ? data.slice(0, [Math.min(maxShow, data.length)]) : data);
      });
      
      setLoading(false);
    }

    fetchAttedancesData();
  }, [dayjs(date).format("YYYY-MM-DD"), reload]);

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