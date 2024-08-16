import { Button, Card, Col, DatePicker, Divider, Flex, Form, Input, message, Modal, Row, Space, Statistic, Table, Tag, TimePicker, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import SearchInput from '../../components/SearchInput';
import { getEmployees } from '../../actions/handleEmployee';
import { getAttedances, postAttedances } from '../../actions/handleAttendance';
import StatisticCard from '../../components/StatisticCard';
import PageTitle from '../../components/PageTitle';

const dateFormat = "DD-MM-YYYY";
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
},
{
key: "break",
dataIndex: "break",
title: "Break",
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

const isTodayHandler = (value, setDisableToday) => { 
  const currentDate = dayjs();
  setDisableToday(value.isSame(currentDate, 'day'));
}

function isLate(scheduledTime, tolerance = 0) {
  const startTime = dayjs('08:30 AM', formatTime);

  const latestArrivalTime = dayjs(scheduledTime).add(tolerance, 'minute');
  
  return startTime.isBefore(dayjs(latestArrivalTime, formatTime));
}

const attendanceStatus = (value) => {
  const status = isLate(value) ? "Late" : "On Time";
  
  return status;
}

function Attendance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledToday, setDisableToday] = useState(true);
  const [dateValue, setDateValue] = useState(dayjs());
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const getAttedancesData = () => {
      getAttedances().then(response => {

        const data = [];

        response.forEach(attend => {          
          if (dayjs(attend.checkIn).isSame(dateValue, 'day')) {
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
  }, [isModalOpen, dateValue]);

  const handleSetToday = () => {
    const datejs = dayjs();
    setDateValue(datejs);
    setDisableToday(true);
  }

  const handleDateChange = (value) => {
    setDateValue(value);  
    isTodayHandler(value, setDisableToday); 
  }

  const changeDate = (value) => {
    const currentDate = dateValue;
    const newDate = currentDate.add(value, 'day');
    setDateValue(newDate);
    isTodayHandler(newDate, setDisableToday);
  }

  const handleOk = () => {
    form.validateFields().then((value) => {
      const formData = new FormData();
      const checkIn = value.checkIn[0];
      const checkOut = value.checkIn[1];
      formData.append("employeeId", value.employee);
      formData.append("checkIn", checkIn.toISOString());
      formData.append("checkOut", checkOut.toISOString());

      try {
        postAttedances(formData);
        message.success("Attendance is saved!");
        form.resetFields();
        setIsModalOpen(false);
      } catch (error) {
        message.error("Can't save this Attendance!");
      }
    }).catch((errorInfo) => {
      console.log("Form Error");
    });

  }

  return (
    <>

    <PageTitle items={[
        {path: '/attendance',
          title: 'Attendance',}]} title="Employee Attendace" />

      <Flex justify='space-between' gap={20} className='mb-3'>
        <StatisticCard title="Total Present" value={50} percent={10} />
        <StatisticCard title="Total Absent" value={20} percent={10} />
        <StatisticCard title="Total On Times" value={32} percent={12} />
        <StatisticCard title="Total Lates" value={18} percent={34} decline={true} />
        {/* <StatisticCard title="Balance" value={-53} suffix="hr" percent={32} decline={true} /> */}
      </Flex>

    <Card>
        <Flex className="mb-3" gap={6} align='center' justify='space-between'>
          <Button type='primary' size='middle' onClick={() => {setIsModalOpen(true)}}>New Attendance</Button>
          <Input.Search placeholder='Search Employee Attendance' size='middle' enterButton/>
        </Flex>

        <Divider />
        
        <Flex className='mb-2' justify='space-between'>
          <Space>
            <Button onClick={(e) => {changeDate(-1)}} icon={<ArrowLeftOutlined className='opacity-80'/>}/>
            <DatePicker allowClear={false} value={dateValue} onChange={handleDateChange} defaultValue={dayjs("08/05/2024", dateFormat)}/>
            <Button onClick={(e) => {changeDate(1)}} icon={<ArrowRightOutlined className='opacity-80'/>} />
          </Space>

          <Button disabled={disabledToday} onClick={handleSetToday}>Today</Button>
        </Flex>

        <Table rowSelection columns={columItems} dataSource={dataSource}/>
    </Card>
        
    <Modal 
        open={isModalOpen} 
        title="Create Attendance"
        onOk={handleOk}
        onCancel={() => {form.resetFields(); setIsModalOpen(false)}}>
      <Form 
        size='large' 
        form={form}
        layout='vertical'>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item name="employee" label="Employee" rules={[ {required: true}]}>
              <SearchInput placeholder="Select Employee" canCreate={false} serverData={getEmployees}/>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Check In & Out" name="checkIn">
              <DatePicker.RangePicker 
                format={{format: "YYYY-MM-DD hh-mm-ss A"}}
                className='w-full'
                placeholder={["Check In", "Still Working"]}
                allowEmpty={[false, true]}
                showTime/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>

        </>
  );
}

export default Attendance