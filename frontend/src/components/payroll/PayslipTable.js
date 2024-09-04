import { Avatar, Flex, message, Popconfirm, Table, Tooltip } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UserOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs  from 'dayjs';
import { Link } from 'react-router-dom';

const CURRENCY = "ETB";

const handleDelete = async(id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/payroll/payslip/api/${id}/`);   
    message.success("This employee payslip deleted successfully!");
  } catch (error) {
    message.error("Sorry! Can't delete this employee payslip right now!")
  }
}

const ActionButton = ({id}) => {
  return <Flex gap={6}>
    <Tooltip title="Edit Payslip">
      <Link to={`payslip/${id}/`} className='cursor-pointer text-primary-500 hover:text-primary-400'><EyeOutlined /></Link>
    </Tooltip>
    <Tooltip title="View Payslip">
      <Link to={`payslip/${id}/edit-payslip`} className='cursor-pointer text-primary-500 hover:text-primary-400'><EditOutlined /></Link>  
    </Tooltip>
  <Popconfirm
    title="Delete Employee" 
    description="Are you sure to delete this employee?"
    onConfirm={() => handleDelete(id)}
    okText="Delete"
    cancelText="Cancel"><span className='cursor-pointer text-red-500 hover:text-red-400'><Tooltip title="Delete Payslip"><DeleteOutlined /></Tooltip></span></Popconfirm></Flex>
}

const columns = [
  {
    title: 'Employee Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Basic Salary',
    dataIndex: 'basic',
    key: 'basic',
  },
  {
    title: 'Gross Salary',
    dataIndex: 'gross_earning',
    key: 'gross_earning',
  },

  {
    title: 'Total Deduction',
    dataIndex: 'tot_deduction',
    key: 'tot_deduction',
  },

  {
    title: 'Net Pay',
    dataIndex: 'net',
    key: 'net',
  },
  
  {
    key: "action",
    dataIndex: "action",
    title: "Actions",
    render: (value, _) => {
      return <ActionButton id={value}/>
    }
  }
];

const columnsNoAction = [
  {
    title: 'Employee Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Basic Salary',
    dataIndex: 'basic',
    key: 'basic',
  },
  {
    title: 'Gross Salary',
    dataIndex: 'gross_earning',
    key: 'gross_earning',
  },

  {
    title: 'Total Deduction',
    dataIndex: 'tot_deduction',
    key: 'tot_deduction',
  },

  {
    title: 'Net Pay',
    dataIndex: 'net',
    key: 'net',
  },
];

const formatNumber = (number, currency) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${currency} ` + parts.join(".");
}

const employeeName = (name, img) => {
  return <Flex align='center' gap={10}>{img ? <Avatar className='flex-shrink-0' src={img}></Avatar> : <Avatar className='flex-shrink-0' icon={<UserOutlined />}></Avatar>} {name}</Flex>
}
  
function PayslipTable({ infinity = false, paymentDate, noSelection=false, callback, noActions=false }) {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayslipData = async() => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/payroll/payslip/api/");      

        const valueToDict = (value) => {
          return {key: value.id,
              name: employeeName(value.employee.name, value.employee.profilePic),
              basic: formatNumber(value.basic_salary, CURRENCY),
              gross_earning: formatNumber(value.gross_earning, CURRENCY),
              tot_deduction: formatNumber(value.total_deduction, CURRENCY),
              net: formatNumber(value.net_salary, CURRENCY),
              action: value.id,
            }
        }
        
        const result = response.data.filter(data => dayjs(data.payment_date).isSame(paymentDate, 'month'));
        
        const data = paymentDate ? 
                  result.map((value) => (valueToDict(value))) : 
                  response.data.map((value) => (valueToDict(value)));

        setDataSource(data);
        callback && callback(data.length);
        setLoading(false);
      } catch (error) {
        console.log(error);
        message.error("Can't load payslip right now!");
      }
    }

    loadPayslipData();

  }, [paymentDate]);

  return (
    <>
        <Table 
          loading={loading} 
          pagination={!infinity} 
          rowSelection={!noSelection} 
          columns={noActions ? columnsNoAction : columns} 
          dataSource={dataSource}/>
    </>
  )
}

export default PayslipTable