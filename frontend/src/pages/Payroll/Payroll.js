import { Button, Card, Flex, Input, Skeleton, Table, Tabs, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { ImportOutlined, ExportOutlined, EyeOutlined } from "@ant-design/icons";
import PageTitle from '../../components/PageTitle';
import Payslip from './Payslip';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs  from 'dayjs';
import ExportToExcel from '../../components/ExportToExcel';

const columns = [
  {
    title: 'Payment name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Date generated',
    dataIndex: 'date_generated',
    key: 'date_generated',
  },
  {
    title: 'Payment month',
    dataIndex: 'month',
    key: 'month',
  },
  {
    title: 'Payment Year',
    dataIndex: 'year',
    key: 'year',
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
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

const PayrollTab = () => {
  const [dataSource, setDataSource] = useState();
  const [payrollDatas, setPayrollDatas] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [exportData, setExportData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayrollDatas = async() => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/payroll/api/");
        setPayrollDatas(response.data);
        
        const data = response.data.map(value => ({
          key: value.id,
          name: value.name,
          date_generated: value.date_generated,
          month: dayjs(value.payment_month_year, "YYYY-MM-DD").format("MMMM"),
          year: dayjs(value.payment_month_year, "YYYY-MM-DD").format("YYYY"),
          status: value.status,
          action: <Link to={`${value.id}/`}><EyeOutlined className='text-base cursor-pointer'/></Link>,
        }));

        setDataSource(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    loadPayrollDatas();
  }, []);

  const onSelectChange = async(newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const responseData = (await axios.get("http://127.0.0.1:8000/payroll/payslip/api/")).data;
    const listOfData = [];

    newSelectedRowKeys.forEach(key => {
      const payment_date = payrollDatas.filter(data => data.id == key)[0].payment_month_year;
      const result = responseData.filter(data => dayjs(data.payment_date).isSame(dayjs(payment_date), 'month'));
      const data = result.map(item => ({...item, employee: item.employee.name}));
      data.forEach(element => {
        listOfData.push(element);
      });                  
    });
    
    
    setExportData(listOfData);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  if (loading) {
    return <Skeleton />
  }

  return <> 
      <h3 className='text-2xl font-semibold mb-3 black-text'>Employee Payroll History</h3>
      <Flex className='mb-3' align='center' justify='space-between'>
        <Input.Search placeholder='Search Employee Payroll' style={{ maxWidth: "420px"}} enterButton/>
        <Flex gap={10}>
          {/* <Button type='primary' icon={<ImportOutlined />} size='middle'>Import Excel</Button> */}
          {selectedRowKeys.length > 0 && <ExportToExcel tableData={exportData} fileName="Payroll Sheet"/>}
          <Link to="generate"><Button type='primary' size='middle'>Generate Payroll</Button></Link>
        </Flex>
      </Flex>

      <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource}/>
    </>
}

const TaxTab = () => {
  return <>Tax Tab</>
}

const tabsItems = [
  {
    key: 1,
    label: "Payroll",
    children: <PayrollTab />,
  },
  {
    key: 3,
    label: "Payslips",
    children: <Payslip />,
  },
  // {
  //   key: 2,
  //   label: "Tax Definitions",
  //   children: <TaxTab />,
  // },
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
      <Card><Tabs items={tabsItems}/></Card>
    </>
  )
}

export default Payroll