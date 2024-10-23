import { Button, Card, Col, DatePicker, Divider, Flex, Form, Input, message, Modal, Row, Skeleton, Space, } from 'antd';
import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import SearchInput from '../../components/SearchInput';
import { getEmployees } from '../../services/handleEmployee';
import { postAttedances } from '../../services/handleAttendance';
import StatisticCard from '../../components/StatisticCard';
import PageTitle from '../../components/PageTitle';
import AttendanceTable, { AttendanceStatus } from '../../components/attendance/AttendanceTable';
import axios from 'axios';

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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttedancesData = async() => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/attendance/api/attendance-summary/?date=${dateValue.format("YYYY-MM-DD")}`, {withCredentials: true});
        setAttendanceSummary(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAttedancesData();
  }, [dateValue]);

  const handleSetToday = () => {
    setDateValue(dayjs());
    setDisableToday(true);
  }

  const handleDateChange = (value) => {
    setDateValue(value);  
    isTodayHandler(value, setDisableToday); 
  }

  const changeDate = (value) => {
    const currentDate = dateValue;       
    if (dateValue.isBefore(dayjs(), 'date') || value < 0) {
      const newDate = currentDate.add(value, 'day');
      setDateValue(newDate);
      isTodayHandler(newDate, setDisableToday);
    }
  }

  const handleOk = () => {
    form.validateFields().then(async (value) => {
      const formData = new FormData();
      const checkIn = value.checkIn[0];
      const checkOut = value.checkIn[1];
      formData.append("employee_id", value.employee);
      formData.append("checkIn", checkIn.toISOString());
      checkOut && formData.append("checkOut", checkOut.toISOString());
      formData.append("status", AttendanceStatus(checkIn));

      try {
        await postAttedances(formData);
        message.success("Attendance is saved!");
        form.resetFields();
        setIsModalOpen(false);
        window.location.reload();
      } catch (error) {
        message.error("Can't save this Attendance!");
      }
    }).catch((errorInfo) => {
      console.error(errorInfo);
    });
  }

  const onSelectionchange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  }

  const handleCheckOut = () => {
      selectedRowKeys.forEach(async(id) => {
        try {
          const currentTime = dayjs();
          await axios.patch(`http://127.0.0.1:8000/attendance/api/${id}/`, {checkOut: currentTime.toISOString()}, {withCredentials: true});
          window.location.reload();
        } catch (error) {
            console.error(error);
            message.error("Can't check out this employee!");
        }
        
      });
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectionchange,
  };

  if (loading) {
    return <Skeleton />
  }

  return (
    <>
    <PageTitle items={[
        {path: '/attendance',
          title: 'Attendance',}]} title="Employee Attendace" />

      <Flex justify='space-between' gap="middle" className='mb-3'>
        <StatisticCard title="Total Present" value={attendanceSummary.total_attend} change={10} percent />
        <StatisticCard title="Total Absent" value={attendanceSummary.total_absent} change={10} percent />
        <StatisticCard title="Total On Times" value={attendanceSummary.total_on_time} change={12} percent />
        <StatisticCard title="Total Lates" value={attendanceSummary.total_late} change={34} percent decline={true} />
      </Flex>

        <Divider />
        
        <Flex className='mb-2' justify='space-between'>
          <Space>
            <Space>
              <Button onClick={(e) => {changeDate(-1)}} icon={<ArrowLeftOutlined className='opacity-80'/>}/>
              <DatePicker 
                allowClear={false} 
                value={dateValue} 
                onChange={handleDateChange} 
                maxDate={dayjs()}
                defaultValue={dayjs("08/05/2024", dateFormat)}/>
              <Button
                  disabled={!dateValue.isBefore(dayjs(), 'date')} 
                  onClick={(e) => {changeDate(1)}} 
                  icon={<ArrowRightOutlined className='opacity-80'/>} />
            </Space>
            
            <Button disabled={disabledToday} icon={<CalendarOutlined />} onClick={handleSetToday}>Today</Button>
          </Space>

          <Space>
            <Input.Search style={{ width: "420px"}} placeholder='Search Employee Attendance' size='middle' enterButton/>
            <Button type='primary' size='middle' onClick={() => {setIsModalOpen(true)}}>New Attendance</Button>
            {selectedRowKeys.length > 0 && <Button type='primary' size='middle' onClick={handleCheckOut}>Check Out</Button>}
          </Space>

        </Flex>
        
        <AttendanceTable 
          rowSelection={rowSelection}
          date={dateValue} />
        
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
                maxDate={dayjs()}
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