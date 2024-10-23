import { Alert, Button, Col, DatePicker, Flex, Input, Row, Select, Space} from 'antd';
import React, { useState } from 'react'
import {FileTextOutlined, SyncOutlined} from '@ant-design/icons'
import StatisticCard from '../../components/StatisticCard';
import PageTitle from '../../components/PageTitle';
import PayrollStackedBarChart from '../../components/PayrollStackedBarChart';
import MyCard from '../../components/MyCard';
import SuccessButton from '../../components/Button';
import ExportToExcel from '../../components/ExportToExcel';
import PayrollTable from '../../components/payroll/PayrollTable';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";

const CURRENCY = "Br";

function PayrollPage() {
  const [month, setMonth] = useState(dayjs().month());
  const [year, setYear] = useState(dayjs().year());

  const handleDateChange = (value) => {
    setMonth(dayjs(value).month());
    setYear(dayjs(value).year());    
  }
  
  return <>
  <PageTitle title="Payrolls" />
  <Space direction='vertical' className='w-full' size="middle">

  <Alert
      message="Payroll submission for the current pay period is due in 2 days. review and finalize all employee payroll details."
      type="warning"
      showIcon
      action={
        <Space>
          <Link to="details">MORE DETAILS</Link>
        </Space>
      }
      closable
    />

    <Flex justify='space-between'>
        <DatePicker 
            picker='month' 
            onChange={handleDateChange}
            allowClear={false} 
            defaultValue={dayjs()}
            format={"MMMM YYYY"}
            maxDate={dayjs()}/>
        <Flex gap={10}>
          <SuccessButton className='bg-green-500 text-white'>Mark as Paid</SuccessButton>
          <Button type='primary' href='payroll/papers/' icon={<FileTextOutlined />}>Generate Bank Letter</Button>
          <Button type='primary' href='payroll/papers/' icon={<FileTextOutlined />}>Generate Payslip</Button>
          <ExportToExcel  fileName="Payroll Sheet"/>
          <Link to={`process-payroll/${year}/${month}`}><Button type='primary' icon={<SyncOutlined />}>Process Payroll</Button></Link>
        </Flex>
    </Flex>
    <Flex gap="middle" wrap align='center' justify='space-between'>
        <StatisticCard title="Payrolls Cost" value={200000} prefix={CURRENCY} change={20} percent/>
        <StatisticCard title="Total Expense" value={54000} prefix={CURRENCY} change={0.1} percent/>
        <StatisticCard title="Pending Payment" value={40000} prefix={CURRENCY} change={10} decline changeLabel="Employee"/>
        <StatisticCard title="Total Payrolss" value={40} change={20} changeLabel="New Employee"/>
    </Flex>
    {/* <Flex>    
        <MyCard title="Payment History" className="basis-3/5">
            <PayrollStackedBarChart />
        </MyCard>
    </Flex> */}

    <MyCard title="Payroll List" header={<Flex gap="small">
        <Input.Search placeholder='Search Employee' />
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
        </Flex>}>

        <PayrollTable 
            month={month} 
            year={year}/>

    </MyCard>
  </Space>
  </>
}

export default PayrollPage;