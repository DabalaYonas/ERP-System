import React from 'react'
import PayrollSubmitTable from '../../components/payroll/PayrollSubmitTable'
import { Flex, Input, Select, Space } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import PageTitle from '../../components/PageTitle'
import { useParams } from 'react-router-dom'
import dayjs from "dayjs";

function ProcessPayroll() {
  const { year, month } = useParams();

  return <>
  <PageTitle backable />
  <Space direction='vertical' size="middle" className='w-full mb-4'>

    <Flex align='center' gap="large">
        <div className='w-9 h-9 rounded-full bg-primary-200 flex items-center justify-center'>
            <CalendarOutlined className='text-primary-500 text-lg' />
        </div>
        <h3 className="text-xl font-medium text-black text-opacity-80">{dayjs().set("month", month).format("MMM")} {year} Payroll</h3>
    </Flex>

    <Flex align='center' justify='space-between'>
        <Input.Search className='w-96' placeholder='Search employee by name' enterButton />
        <Select className='w-48' defaultValue="0" 
            options={[
              {
                  value: "0",
                  label: "Filter by",
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
    </Flex>
    <PayrollSubmitTable />
  </Space>
  </>
}

export default ProcessPayroll