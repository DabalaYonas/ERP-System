import { Avatar, Button, Flex, Input, Pagination, Space, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { CloseOutlined, EditOutlined, EyeOutlined, SearchOutlined, UserOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import dayjs from "dayjs";

const CURRENCY = "Br";

const ActionButton = ({id}) => {
  return <Flex gap={6}>
    <Tooltip title="View Payslip">
      <Link to={`payslip/${id}/`} className='cursor-pointer text-primary-500 hover:text-primary-400'><EyeOutlined /></Link>
    </Tooltip>
  </Flex>
}

function PayrollTable({month, year}) {
    const [originalData, setOriginalData] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [departmentFilters, setDepartmentFilters] = useState([]);
    const [searchAllText, setSearchAllText] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [current, setCurrent] = useState(1);
    const pageSize = 5;

    useEffect(() => {

        const handleDateChange = (datas) => {
            const selectedDate = dayjs().set('year', year).set('month', month);        
            const filteredDatas = datas.filter(item => dayjs(item.payPeriod).isSame(selectedDate, 'month'));
            setDataSource(filteredDatas);
        }

        const fetchData = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/payroll/api/`, {withCredentials: true});
            const datas = response.data.map((data) => ({
                key: data.id,
                payroll_id: data.id,
                name: data.employee.name,
                payPeriod: data.payPeriod,
                profilePic: data.employee.profilePic,
                basic: data.basic_salary,
                gross_earning: data.gross_earning,
                tot_deduction: data.total_deduction,
                net: data.net_salary,
                status: data.status,
                action: true,
            }));

            setDataSource(datas);
            setOriginalData(datas);
            setLoading(false);
            handleDateChange(datas)
        }

        if (loading) {
            fetchData();
        } else {
            handleDateChange(originalData);
        }
        
    }, [month, year]);
  
    const handleChange = (page) => {
        setCurrent(page);
      };
  
      const currentData = dataSource.slice((current - 1) * pageSize, current * pageSize);
      const totalResults = dataSource.length;

    const handleSearchAll = (e) => {
        const value = e.target.value;
        setSearchAllText(value);
        const filteredData = originalData.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        setDataSource(filteredData);
    }
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    };

    const HighlightedText = (text) => <Highlighter
        highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
        />

    const NameRender = (name, profilePic) => (<Flex gap={14} align="center">
        {profilePic ? (<Avatar className="shrink-0" src={profilePic}></Avatar>) : 
        (<Avatar className="shrink-0"  icon={<UserOutlined />} />)}
        {name}
    </Flex>);

    const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
        style={{
            padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
        >
        <Flex justify="space-between" className="mb-1"> 
            <p>{`Search ${dataIndex.replace("_", " ")}`}</p>
        <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={() => {
                close();
            }}
            >
            {/* close */}
            </Button>

        </Flex>
        <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex.replace("_", " ")}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
            marginBottom: 8,
            display: 'block',
            }}
        />
        <Space>
            <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
                width: 90,
            }}
            >
            Search
            </Button>

            <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
                width: 90,
            }}>
            Clear
            </Button>

            <Button
            type="link"
            size="small"
            onClick={() => {
                confirm({
                closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
            }}
            >
            Filter
            </Button>
        </Space>
        </div>
    ),
    filterIcon: (filtered) => (
        <SearchOutlined
        style={{
            color: filtered ? '#3b82f6' : undefined,
        }}
        />
    ),

    onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
        if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
        }
    },

    render: (text, item) => {
        return dataIndex === "name" ? NameRender(
        searchedColumn === dataIndex ? (HighlightedText(text)) : (text), 
        item.profilePic) : searchedColumn === dataIndex ? (HighlightedText(text)) : (text)
    }
    });  
      
    const columns = [
        {
        title: 'Payroll ID',
        dataIndex: 'payroll_id',
        sorter: (a, b) => a.payroll_id - b.payroll_id,
        },
        {
        title: 'Employee Name',
        dataIndex: 'name',
        ...getColumnSearchProps("name"),
        sorter: (a, b) => a.name.localeCompare(b.name),
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
    ];

    const onSelectChange = async(newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
        
    return <>
    <Table
        pagination={false} 
        loading={loading}
        columns={columns}
        dataSource={currentData}/>
    

    <Flex align='center' justify='space-between' className='mt-4 px-2'>
        <span>
        Showing {(current - 1) * pageSize + 1}-{Math.min(current * pageSize, totalResults)} of {totalResults} results
        </span>
        <Pagination
        current={current}
        pageSize={pageSize}
        total={totalResults}
        onChange={handleChange}
        showSizeChanger={false}
        />
    </Flex>

        </>
}

export default PayrollTable