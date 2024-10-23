import { Button, Flex, Input, Table, Avatar, message, Popconfirm, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  UserOutlined,
  SearchOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { deletEmployee, getEmployees } from "../../services/handleEmployee";
import React, { useEffect, useState, useRef } from "react";
import PageTitle from "../../components/PageTitle";
import { getDepartments } from "../../services/handleDepartment";
import Highlighter from 'react-highlight-words';

const handleDelete = async (id) => {
  try {
    await deletEmployee(id);
    message.success(`Employee deleted successfully!`);
    window.location.reload();
  } catch (error) {
    message.error(error);
    message.success(`Can't delete this employee!`);
  }
}
const breadcrumbItems = [
    {
      path: '/employees',
      title: 'All Employee',
    }
  ];

function Employees() {
  const [originalData, setOriginalData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departmentFilters, setDepartmentFilters] = useState([]);
  const [searchAllText, setSearchAllText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await getEmployees();
        const data = response.data.map((item) => ({
          key: item.id,
          id: item.id,
          profilePic: item.profilePic,
          name: item.name,
          department: item.department ? item.department.name : "_",
          gender: item.gender,
          phone_number: item.phone_number,
          actions: true,
        }
        ));
          
        setOriginalData(data);
        setDataSource(data); 

        const departResponse = await getDepartments();
        const departData = departResponse.data.map((value) => ({
          text: value.name,
          value: value.name,
        }));        
        setDepartmentFilters(departData);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }    

    fetchDatas();
  }, []);

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
            }}
          >
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
    title: 'Employee Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    ...getColumnSearchProps("name"),
  },
  {
    title: 'Employee ID',
    dataIndex: 'id',
  },
  {
    title: 'Department',
    dataIndex: 'department',
    filters: departmentFilters,
    filterMode: 'tree',
    onFilter: (value, record) => record.department.indexOf(value) === 0,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      {
        text: 'Male',
        value: 'Male',
      },
      {
        text: 'Female',
        value: 'Female',
      },
    ],
    onFilter: (value, record) => record.gender.indexOf(value) === 0,
  },

  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    ...getColumnSearchProps("phone_number"),
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: (value, item) => {
      const id = item.id;
      
      return value && <Flex>
        <Tooltip title="View Employee">
        <Link to={`/employees/${id}`}><EyeOutlined className="mr-2 text-base cursor-pointer" /></Link>
        </Tooltip>

        {/* <Tooltip title="Delete Employee">
        <Popconfirm 
            title="Delete Employee" 
            description="Are you sure to delete this employee?"
            onConfirm={() => handleDelete(id)}
            okText="Delete"
            cancelText="Cancel">
              <DeleteOutlined className="mr-2 text-base cursor-pointer transition hover:text-red-500"/>
            </Popconfirm>
            </Tooltip> */}
        </Flex>
    }
  },
];

    return <>
      <PageTitle items={breadcrumbItems} title="All Employee" />

      <Flex align="center" gap='20px' className="pb-4" justify="space-between">
        <Input.Search value={searchAllText} onChange={handleSearchAll} style={{width: 420}} placeholder="Search employee" enterButton />
        <Link to='/employees/add-employee'>
          <Button type="primary" icon={<PlusCircleOutlined />} >Add Employee</Button>
        </Link>
      </Flex>
      
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        loading={loading}/>
    </>
}

export default Employees;