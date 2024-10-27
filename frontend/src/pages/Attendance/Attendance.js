import { Button, Col, DatePicker, Divider, Flex, Form, Input, message, Modal, Row, Select, Skeleton, Space, } from 'antd';
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
import MyCard from '../../components/MyCard';

const dateFormat = "DD-MM-YYYY";

const isTodayHandler = (value, setDisableToday) => { 
  const currentDate = dayjs();
  setDisableToday(value.isSame(currentDate, 'day'));
}

function Attendance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledToday, setDisableToday] = useState(true);
  const [date, setDate] = useState(dayjs());
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const fetchAttedancesData = async() => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/attendance/api/attendance-summary/?date=${date.format("YYYY-MM-DD")}`, {withCredentials: true});
      setAttendanceSummary(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAttedancesData();
  }, [date]);

  const handleSetToday = () => {
    setDate(dayjs());
    setDisableToday(true);
  }

  const handleDateChange = (value) => {
    setDate(value);  
    isTodayHandler(value, setDisableToday); 
  }

  const changeDate = (value) => {
    const currentDate = date;       
    if (date.isBefore(dayjs(), 'date') || value < 0) {
      const newDate = currentDate.add(value, 'day');
      setDate(newDate);
      isTodayHandler(newDate, setDisableToday);
    }
  }

  const handleCheckIn = () => {
    form.validateFields().then(async (value) => {
      const formData = new FormData();
      const checkIn = value.checkIn[0];
      const checkOut = value.checkIn[1];
      formData.append("employee_id", value.employee);
      formData.append("checkIn", checkIn.toISOString());
      checkOut && formData.append("checkOut", checkOut.toISOString());
      formData.append("status", AttendanceStatus(checkIn));

      try {
        await axios.post(`http://127.0.0.1:8000/attendance/check_in/`, 
          {
            employee_id: value.employee,
            date: checkIn.format("YYYY-MM-DD"),
            check_in: checkIn.toISOString()}, 
          {withCredentials: true});
        message.success("Employee is check in!");
        setReload(preValue => preValue + 1);
        fetchAttedancesData();
        form.resetFields();
        setIsModalOpen(false);
      } catch (error) {
        message.error("Employee is check out!");
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
        const formData = new FormData();
        formData.append("employee_id", id);
        formData.append("date", dayjs().format("YYYY-MM-DD"));
        formData.append("check_out", dayjs().toISOString());
        await axios.post(`http://127.0.0.1:8000/attendance/check_out/`, formData, 
          {withCredentials: true})
          .then(response => 
            {message.success("Employee is check out!");
              setReload(preValue => preValue + 1);
              fetchAttedancesData();
            })
          .catch(error => {
            console.error(error);
            message.error("Can't check out this employee!");
          });
      });
  }

  const handleBreak = (type) => {
    selectedRowKeys.forEach(async(id) => {
        const formData = new FormData();
        formData.append("employee_id", id);
        formData.append("date", dayjs().format("YYYY-MM-DD"));
        if (type === "start") {
          formData.append("start_break", dayjs().toISOString());
  
          await axios.post(`http://127.0.0.1:8000/attendance/start_break/`, formData, 
            {withCredentials: true})
            .then(response => 
              {message.success("Employee is take break!");
                setReload(preValue => preValue + 1);
              fetchAttedancesData();})
            .catch(error => {
              console.error(error);
              message.error("This employee can't take break!");
            });
        } else if ("end") {
          formData.append("end_break", dayjs().toISOString());
  
          await axios.post(`http://127.0.0.1:8000/attendance/end_break/`, formData, 
            {withCredentials: true})
            .then(response => 
              {
                message.success("Employee is back to work!");
                setReload(preValue => preValue + 1);
                fetchAttedancesData();
              })
            .catch(error => {
              console.error(error);
              message.error("This employee not on break!");
            });  
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
        
        <Space direction='vertical' className='w-full' size="middle">
          <Flex justify='space-between'>
            <Space>
              <Space>
                <Button onClick={(e) => {changeDate(-1)}} icon={<ArrowLeftOutlined className='opacity-80'/>}/>
                <DatePicker 
                  allowClear={false} 
                  value={date} 
                  onChange={handleDateChange} 
                  maxDate={dayjs()}
                  defaultValue={dayjs("08/05/2024", dateFormat)}/>
                <Button
                    disabled={!date.isBefore(dayjs(), 'date')} 
                    onClick={(e) => {changeDate(1)}} 
                    icon={<ArrowRightOutlined className='opacity-80'/>} />
              </Space>
              
              <Button disabled={disabledToday} icon={<CalendarOutlined />} onClick={handleSetToday}>Today</Button>
            </Space>
  
            <Space>
              <Button type='primary' size='middle' onClick={() => {setIsModalOpen(true)}}>New Attendance</Button>
              {selectedRowKeys.length > 0 && 
                (<>
                  <Button size='middle' onClick={() => {handleBreak("start")}}>Take a Break</Button>
                  <Button size='middle' onClick={() => {handleBreak("end")}}>Back to work</Button>
                  <Button type='primary' size='middle' onClick={handleCheckOut}>Check Out</Button>
                  </>
                )}
            </Space>
          </Flex>
        
          <Flex justify='space-between' gap="middle">
            <StatisticCard title="Total Present" value={attendanceSummary.total_attend} change={10} percent />
            <StatisticCard title="Total Absent" value={attendanceSummary.total_absent} change={10} percent />
            <StatisticCard title="Total On Times" value={attendanceSummary.total_on_time} change={12} percent />
            <StatisticCard title="Total Lates" value={attendanceSummary.total_late} change={34} percent decline={true} />
          </Flex>

        <MyCard title="Attendance List" header={
          <Flex gap="small">
            <Input.Search placeholder='Search Employee Attendance' size='middle'/>
            <Select className='w-48' defaultValue="0" 
                options={[
                  {
                      value: "0",
                      label: "All Status",
                  },
                  {
                      value: "1",
                      label: "On Time",
                  },
                  {
                      value: "2",
                      label: "Late",
                  }]} />
          </Flex>}>

        <AttendanceTable
          reload={reload}
          rowSelection={rowSelection}
          date={date} />

    </MyCard>

      </Space>
        
    <Modal 
        open={isModalOpen} 
        title="Create Attendance"
        onOk={handleCheckIn}
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