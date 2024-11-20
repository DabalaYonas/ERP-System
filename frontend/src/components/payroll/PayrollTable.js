import { Avatar, Button, Flex, Input, Pagination, Space, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { CloseOutlined, EyeOutlined, PrinterOutlined, SearchOutlined, UserOutlined} from '@ant-design/icons'
import { formatCurrency } from '../../utils/formatCurrency';
import Highlighter from 'react-highlight-words';
import dayjs from "dayjs";
import Payslip from './payslip/Payslip';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TableWithEmployee from '../TableWithEmployee';
import API from '../../services/api';

const CURRENCY = "Br";

const ActionButton = ({id}) => {
// const response = await axios.get(`http://127.0.0.1:8000/payroll/api/payslips/${id}`, {withCredentials: true});
  return <Space size="small">
    {/* <PDFDownloadLink document={<Payslip data={id} />} fileName='payslips.pdf'>
        <Tooltip title="Payslip pdf">
            <Button icon={<PrinterOutlined />} />
        </Tooltip>
     </PDFDownloadLink> */}
  <Tooltip title="View Payslip">
    <Button icon={<EyeOutlined />} href={`/payroll/payslip/${id}`} />
  </Tooltip>
</Space>
}

function PayrollTable({month, year, setCurrentData}) {
    const [originalData, setOriginalData] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {

        const handleDateChange = (datas) => {
            const selectedDate = dayjs().set('year', year).set('month', month);        
            const filteredDatas = datas.filter(item => dayjs(item.payPeriod).isSame(selectedDate, 'month'));
            setDataSource(filteredDatas);
        }

        const fetchData = async () => {
            try {
                const response = await API.get(`/payroll/api/`);
                const datas = response.data.map((data) => ({
                    key: data.id,
                    payroll_id: data.id,
                    employee: data.employee.name,
                    payPeriod: data.payPeriod,
                    profilePic: data.employee.profilePic,
                    basic: data.basic_salary,
                    gross_earning: data.gross_earning,
                    tot_deduction: data.total_deduction,
                    net: data.net_salary,
                    status: data.status,
                    action: true,
                }));
                setCurrentData(response.data.filter(item => dayjs(item.payPeriod).isSame(dayjs().set('year', year).set('month', month), 'month')));
    
                setDataSource(datas);
                setOriginalData(datas);
                setLoading(false);
                handleDateChange(datas);
            } catch (error) {
                console.error(error);
            }
        }

        if (loading) {
            fetchData();
        } else {
            handleDateChange(originalData);
        }
        
    }, [month, year]);
    const columnsData = {
        order: ["payroll_id", "employee", "basic", "gross_earning", "tot_deduction", "net", "status", "action"],
        columns : [{
        title: 'Payroll ID',
        dataIndex: 'payroll_id',
        sorter: (a, b) => a.payroll_id - b.payroll_id,
        },
        {
        title: 'Basic Salary',
        dataIndex: 'basic',
        sorter: (a, b) => a.basic - b.basic,
        render: (value, _) => {
            const money = formatCurrency(value);
            return <p>{money} {CURRENCY}</p>
        }
        },
        {
        title: 'Gross Salary',
        dataIndex: 'gross_earning',
        sorter: (a, b) => a.gross_earning - b.gross_earning,
        render: (value, _) => {
            const money = formatCurrency(value);
            return <p>{money} {CURRENCY}</p>
        }
        },
    
        {
        title: 'Total Deduction',
        dataIndex: 'tot_deduction',
        sorter: (a, b) => a.tot_deduction - b.tot_deduction,
        render: (value, _) => {
            const money = formatCurrency(value);
            return <p>{money} {CURRENCY}</p>
        }
        },
    
        {
        title: 'Net Pay',
        dataIndex: 'net',
        sorter: (a, b) => a.net - b.net,
        render: (value, _) => {
            const money = formatCurrency(value);
            return <p>{money} {CURRENCY}</p>
        }
        },
    
        {
        title: 'Status',
        dataIndex: 'status',
        filters: [
            {
            text: 'Completed',
            value: 'Completed',
            },
            {
            text: 'Pending',
            value: 'Pending',
            },
        ],
        onFilter: (value, record) => record.gender.indexOf(value) === 0,
        render: (value, _) => {
            const color = value.toLowerCase() == "completed" ? "green" : "yellow";
            return <Tag color={color}>{value}</Tag>
        }
        },
        
        {
        dataIndex: "action",
        title: "Action",
        render: (_, {payroll_id}) => {
            return <ActionButton id={payroll_id}/>
        }
        }
    ]};

    const onSelectChange = async(newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
        
    return <>
    <TableWithEmployee
        pagination={false} 
        loading={loading}
        rowSelection={rowSelection}
        columnOrder={columnsData.order}
        columns={columnsData.columns}
        dataSource={dataSource}/>
        </>
}

export default PayrollTable