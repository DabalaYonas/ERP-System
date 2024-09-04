import { Button, Card, Col, DatePicker, Divider, Flex, Form, Input, message, Modal, Row, Space, } from 'antd';
import React, { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import SearchInput from '../../components/SearchInput';
import { getEmployees } from '../../services/handleEmployee';
import { postAttedances } from '../../services/handleAttendance';
import StatisticCard from '../../components/StatisticCard';
import PageTitle from '../../components/PageTitle';
import AttendanceTable from '../../components/attendance/AttendanceTable';

const dateFormat = "DD-MM-YYYY";

const isTodayHandler = (value, setDisableToday) => { 
  const currentDate = dayjs();
  setDisableToday(value.isSame(currentDate, 'day'));
}

function Attendance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledToday, setDisableToday] = useState(true);
  const [dateValue, setDateValue] = useState(dayjs());
  const [form] = Form.useForm();

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

      <Flex justify='space-between' gap="middle" className='mb-3'>
        <StatisticCard title="Total Present" value={50} percent={10} />
        <StatisticCard title="Total Absent" value={20} percent={10} />
        <StatisticCard title="Total On Times" value={32} percent={12} />
        <StatisticCard title="Total Lates" value={18} percent={34} decline={true} />
        {/* <StatisticCard title="Balance" value={-53} suffix="hr" percent={32} decline={true} /> */}
      </Flex>

        <Divider />
        
        <Flex className='mb-2' justify='space-between'>
          <Space>
            <Space>
              <Button onClick={(e) => {changeDate(-1)}} icon={<ArrowLeftOutlined className='opacity-80'/>}/>
              <DatePicker allowClear={false} value={dateValue} onChange={handleDateChange} defaultValue={dayjs("08/05/2024", dateFormat)}/>
              <Button onClick={(e) => {changeDate(1)}} icon={<ArrowRightOutlined className='opacity-80'/>} />
            </Space>
            
            <Button disabled={disabledToday} icon={<CalendarOutlined />} onClick={handleSetToday}>Today</Button>
          </Space>
          <Space>
            <Input.Search style={{ width: "420px"}} placeholder='Search Employee Attendance' size='middle' enterButton/>
            <Button type='primary' size='middle' onClick={() => {setIsModalOpen(true)}}>New Attendance</Button>
          </Space>
        </Flex>
        
        <AttendanceTable date={dateValue} />
        
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