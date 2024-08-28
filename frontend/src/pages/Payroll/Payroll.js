import { Button, Flex, Input, message, Modal, Skeleton, Table, Tabs, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { EyeOutlined } from "@ant-design/icons";
import PageTitle from '../../components/PageTitle';
import Payslip from './Payslip';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs  from 'dayjs';
import ExportToExcel from '../../components/ExportToExcel';
import SuccessButton from '../../components/Button';

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

const PAYROLL_URL = "http://127.0.0.1:8000/payroll/api/";

const PayrollTab = () => {
  const [dataSource, setDataSource] = useState();
  const [payrollDatas, setPayrollDatas] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [exportData, setExportData] = useState();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadPayrollDatas = async() => {
      try {
        const response = await axios.get(PAYROLL_URL);
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
  }, [modalOpen]);

  const onSelectChange = async(newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const responseData = (await axios.get("http://127.0.0.1:8000/payroll/payslip/api/")).data;
    const listOfData = [];

    newSelectedRowKeys.forEach(key => {
      const payment_date = payrollDatas.filter(data => data.id === key)[0].payment_month_year;
      const result = responseData.filter(data => dayjs(data.payment_date).isSame(dayjs(payment_date), 'month'));
      const data = result.map(item => ({...item, employee: item.employee.name}));
      // data.forEach(element => {
      //   console.log(element);
        
      //   listOfData.push(element);
      // });            
      const capitalizeSenten = (sentence) => {
        return sentence.substr(0, 1).toUpperCase() + sentence.slice(1);
      }
      const listOfData1 = Object.fromEntries(Object.entries(data[0]).map(([key, value]) => [capitalizeSenten(key.replaceAll("_", " ")), value]));
      listOfData.push(listOfData1);      
    });
    
    
    setExportData(listOfData);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleAsPaid = () => {
   selectedRowKeys.forEach(element => {
    axios.patch(`${PAYROLL_URL}${element}/`, {status: "paid"}).then(data => {
      message.success("Payroll is marked as paid");
      setModalOpen(false);
    });
   });
  }
  
  return <> 
  <PageTitle title="Employee Payroll" items={[
    {
      path: '/payroll',
      title: 'Payroll',
    }
  ]} />
      {/* <h3 className='text-2xl font-semibold mb-3 black-text'>Employee Payroll History</h3> */}
      <Flex className='mb-3' align='center' justify='space-between'>
        <Input.Search placeholder='Search Employee Payroll' style={{ maxWidth: "420px"}} enterButton/>
        <Flex gap={10}>
          {/* <Button type='primary' icon={<ImportOutlined />} size='middle'>Import Excel</Button> */}
          <SuccessButton onClick={() => {setModalOpen(true)}} className='bg-green-500 text-white' disabled={selectedRowKeys.length <= 0}>Mark as Paid</SuccessButton>
          <ExportToExcel tableData={exportData} fileName="Payroll Sheet" disabled={selectedRowKeys.length <= 0}/>
          <Link to="generate"><Button type='primary' size='middle'>Generate Payroll</Button></Link>
        </Flex>
      </Flex>

      <Table loading={loading} rowSelection={rowSelection} columns={columns} dataSource={dataSource}/>
      <Modal 
        open={modalOpen}
        title="Are you sure?"
        children={<p>Do you want to mark this payroll as <Tag color='green'>paid</Tag>?</p>}
        onCancel={() => {setModalOpen(false)}}
        onOk={handleAsPaid}/>
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
    key: 2,
    label: "Payslips",
    children: <Payslip />,
  },
  // {
  //   key: 3,
  //   label: "Tax Definitions",
  //   children: <TaxTab />,
  // },
];

function Payroll() {

  return (
    <>
        <Tabs items={tabsItems} />
    </>
  )
}

export default Payroll