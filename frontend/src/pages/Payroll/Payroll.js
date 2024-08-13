import { Button, Flex, Input, Table, Tag } from 'antd';
import React from 'react';
import { ImportOutlined, ExportOutlined, PlusCircleFilled } from "@ant-design/icons";
import Breadcrumbs from '../../components/Breadcrumbs';
import PageTitle from '../../components/PageTitle';


const fakeData = [{
  key: "1",
  name: "Dabala Yonas",
  ctc: "120,000 Br",
  salary_per_month: "10,000 Br",
  deduction: "1,200 Br",
  status: "Paid"
  },
  {
    key: "1",
    name: "Robera Yonas",
    ctc: "240,000 Br",
    salary_per_month: "20,000 Br",
    deduction: "4,200 Br",
    status: "Pending"
  },
];


const columns = [
  {
    title: 'Employee Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'CTC',
    dataIndex: 'ctc',
    key: 'ctc',
  },
  {
    title: 'Salary Per Month',
    dataIndex: 'salary_per_month',
    key: 'salary_per_month',
  },
  {
    title: 'Deduction',
    dataIndex: 'deduction',
    key: 'deduction',
  },
  {
  key: "status",
  dataIndex: "status",
  title: "Status",
  render: (_, { status }) => {
    let color = status.toLowerCase() === "pending" ? 'yellow' : 'green';
    return <Tag color={color} key={status}>
      {status}
    </Tag>
  }
  },
];

function Payroll() {
  return (
    <>
    <PageTitle title="Employee Payroll" items={[
      {
        path: '/payroll',
        title: 'Payroll',
      }
    ]} />
    <Flex className='mb-4' gap={10} align='center'>
      <Input.Search placeholder='Search Employee Payroll' size='large' />
      <Button type='primary' icon={<ImportOutlined />} size='middle'>Import Excel</Button>
      <Button type='primary' icon={<ExportOutlined />} size='middle'>Export</Button>
      <Button type='primary' shape='round' iconPosition='end' icon={<PlusCircleFilled />} size='middle'>Create A Contract</Button>
    </Flex>
    <Table columns={columns} dataSource={fakeData}/>
    </>
  )
}

export default Payroll