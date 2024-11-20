import { Alert, Button, Col, DatePicker, Flex, Input, notification, Row, Select, Skeleton, Space} from 'antd';
import React, { useEffect, useState } from 'react'
import {FileTextOutlined, SyncOutlined, FileSyncOutlined} from '@ant-design/icons'
import StatisticCard from '../../components/StatisticCard';
import PageTitle from '../../components/PageTitle';
import PayrollStackedBarChart from '../../components/PayrollStackedBarChart';
import MyCard from '../../components/MyCard';
import SuccessButton from '../../components/Button';
import ExportToExcel from '../../components/ExportToExcel';
import PayrollTable from '../../components/payroll/PayrollTable';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import ListGrid from '../../components/ListGridSegment';
import { convert2ExportData } from '../../utils/convert2ExportData';
import API from '../../services/api';

const CURRENCY = "Br";

function PayrollPage({showPayrollNotification, setShowPayrollNotification}) {
  const [month, setMonth] = useState(dayjs().month());
  const [currentData, setCurrentData] = useState([]);
  const [year, setYear] = useState(dayjs().year());
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [payPeriod, setPayPeriod] = useState(dayjs());
  
  useEffect(() => {
    setLoading(true);

    const payDate = dayjs().set('year', year).set('month', month);
    setPayPeriod(payDate);
    const fetchData = async() => {
      await API.get(`http://127.0.0.1:8000/payroll/api/payroll-summary?payPeriod=${payDate.format("MMMM YYYY")}`)
      .then(response => {
        setSummary(response.data);
        setLoading(false);
      })
      .catch(errInfo => {
        console.error(errInfo);
      })
    }

    if (showPayrollNotification) {  
      api.success({
        message: "Payroll Finish",
        description: "You successfully run payroll for June period."
      })

      setShowPayrollNotification(false);
    }
    
    fetchData();
  }, [showPayrollNotification, month, year]);
  
  const handleDateChange = (value) => {
    setMonth(dayjs(value).month());
    setYear(dayjs(value).year());    
  }

  if (loading) {
    return <Skeleton />
  }
  
  return <>
  {contextHolder}
  <PageTitle title="Payrolls" />
  
  <Space direction='vertical' className='w-full' size="middle">

  {summary.unprocessed_employees > 0 && <Alert
      message={<h2 className='text-xl font-medium'>Monthly Salary: {payPeriod.format("MMM")} 01st - 30st</h2>}
      showIcon
      icon={<FileSyncOutlined />}
      description={`Payroll for ${summary.unprocessed_employees} employees for the month of ${payPeriod.format("MMMM")} has not been processed. Please review and run payroll`}
      type="warning"
      action={
        <Flex align='center' className='h-full'>
          <Link to={`run-payroll/${year}/${month}`}>
            <Button type='primary' icon={<SyncOutlined />} danger>Run Payroll</Button>
          </Link>
        </Flex>
      }
    />}

    <Flex justify='space-between'>
        <DatePicker 
            picker='month' 
            onChange={handleDateChange}
            allowClear={false}
            value={payPeriod}
            defaultValue={dayjs()}
            format={"MMMM YYYY"}
            maxDate={dayjs()}/>
        <Flex gap={10}>
          <SuccessButton className='bg-green-500 text-white'>Mark as Paid</SuccessButton>
          <Button type='primary' href='payroll/papers/' icon={<FileTextOutlined />}>Generate Bank Letter</Button>
          <Button type='primary' href='payroll/papers/' icon={<FileTextOutlined />}>Generate Payslip</Button>
          <ExportToExcel tableData={convert2ExportData(currentData)} fileName={`Payroll Sheet - ${payPeriod.format("MMM YYYY")}`}/>
          <Link to={`run-payroll/${year}/${month}`}><Button type='primary' icon={<SyncOutlined />}>Process Payroll</Button></Link>
        </Flex>
    </Flex>
    <Flex gap="middle" wrap align='center' justify='space-between'>
        <StatisticCard title="Payroll Cost" value={summary.total_payroll_costs} prefix={CURRENCY} change={20} percent/>
        <StatisticCard title="Average Salary" value={summary.average_salary} prefix={CURRENCY} change={0.1} percent/>
        <StatisticCard title="Average Salary" value={summary.highest_salary} prefix={CURRENCY} change={10} decline percent/>
        <StatisticCard title="Total Employees" value={summary.processed_employees} notMoney change={20} changeLabel="New Employee"/>
    </Flex>
    {/* <Flex>    
        <MyCard title="Payment History" className="basis-3/5">
            <PayrollStackedBarChart />
        </MyCard>
    </Flex> */}

    <MyCard title="Payroll List" header={
      <Flex gap="middle">
        <Select className='w-48' defaultValue="0" 
            options={[
              {
                  value: "0",
                  label: "All Status",
              },
              {
                  value: "1",
                  label: "Completed",
              },
              {
                  value: "2",
                  label: "Pending",
              }
      ]}></Select>
        <Input.Search placeholder='Search Employee' />
          <ListGrid />
        </Flex>}>

        <PayrollTable 
            setCurrentData={setCurrentData}
            month={month} 
            year={year}/>

    </MyCard>
  </Space>
  </>
}

export default PayrollPage;