import { Button, Flex, Input, message, Modal, Space, Table, Tabs, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { FileTextOutlined } from "@ant-design/icons";
import PageTitle from '../../components/PageTitle';
import Payslip from './Payslip';
import { Link } from 'react-router-dom';
import dayjs  from 'dayjs';
import ExportToExcel from '../../components/ExportToExcel';
import SuccessButton from '../../components/Button';
import PayslipTable from '../../components/payroll/PayslipTable';
import MyTypography from '../../components/MyTypography';
import { getPayrolls, getPayslips, patchPayroll } from '../../services/handlePayroll';

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
];

const capitalizeSenten = (sentence) => {
  return sentence.substr(0, 1).toUpperCase() + sentence.slice(1);
}

const abbreviat2Word = (word) => {
  const words = [
    {pos: "position"},
    {allow: "allowance"},
    {transp: "transport"},
    {tax: "taxable"},
    {tele: "Telephone"},
  ]

  const keys = word.split(" ");
  const newWord = [];

  keys.forEach(key => {
    for(let dict of words) {
      if (dict[key]) {
        newWord.push(dict[key]);
        return
      }
    }    
    newWord.push(key);
  });

  return newWord.join(" ");
}

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
        const response = await getPayrolls();
        setPayrollDatas(response.data);
        
        const data = response.data.map(value => ({
          key: value.id,
          name: value.name,
          date_generated: value.date_generated,
          month: dayjs(value.payment_month_year, "YYYY-MM-DD").format("MMMM"),
          year: dayjs(value.payment_month_year, "YYYY-MM-DD").format("YYYY"),
          status: value.status,
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
    
      try {
        const responseData = await getPayslips().then(response => response.data);
        const listOfData = [];

        newSelectedRowKeys.forEach(key => {
            const payment_date = payrollDatas.filter(data => data.id === key)[0].payment_month_year;
          const result = responseData.filter(data => dayjs(data.payment_date).isSame(dayjs(payment_date), 'month'));
          const data = responseData.map(item => ({...item, employee: item.employee.name}));

          data.forEach(element => {
            delete element["id"];
            delete element["payment_date"];

            element = Object.fromEntries(
              Object.entries(element).map(
                ([key, value]) => [
                  capitalizeSenten(abbreviat2Word(key.replaceAll("_", " "))),
                  value]));

            listOfData.push(element);   
            
          });
        });
        
    
        setExportData(listOfData);

      } catch (error) {
          console.error(error);
      }
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const markAsPaid = async (id) => {
      try {
        await patchPayroll({status: "paid"}, id);
        message.success("Payroll is marked as paid");
        setModalOpen(false);
        
      } catch (error) {
        message.error("Can't mark this payroll as paid");
      }
    }

  const handleAsPaid = () => {
    selectedRowKeys.forEach(id => {
    markAsPaid(id);
    });
  }

  const expandedRowRender = () => {
    return <Space direction='vertical' className='w-full'>
      <MyTypography level={3}>Employee Details</MyTypography>
      <PayslipTable infinity noSelection noActions />
      </Space>
  }
  
  return <> 
  <PageTitle title="Employee Payroll" items={[
    {
      path: '/payroll',
      title: 'Payroll',
    }
  ]} />
      <Flex className='mb-3' align='center' justify='space-between'>
        <Input.Search placeholder='Search Employee Payroll' style={{ maxWidth: "420px"}} enterButton/>
        <Flex gap={10}>
          <Button type='primary' icon={<FileTextOutlined />} disabled={selectedRowKeys.length <= 0}>Generate Agreement</Button>
          <SuccessButton onClick={() => {setModalOpen(true)}} className='bg-green-500 text-white' disabled={selectedRowKeys.length <= 0}>Mark as Paid</SuccessButton>
          <ExportToExcel tableData={exportData} fileName="Payroll Sheet" disabled={selectedRowKeys.length <= 0}/>
          <Link to="generate"><Button type='primary' size='middle'>Generate Payroll</Button></Link>
        </Flex>
      </Flex>

      <Table 
          loading={loading} 
          rowSelection={rowSelection} 
          columns={columns} 
          expandable={{expandedRowRender}}
          dataSource={dataSource}/>

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