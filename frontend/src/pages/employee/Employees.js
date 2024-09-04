import { Button, Flex, Input, Table, Avatar, message, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { deletEmployee, getEmployees } from "../../services/handleEmployee";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";

const handleDelete = (id) => {
  try {
    deletEmployee(id);
    message.success(`Employee with an ID ${id} is deleted!`);
  } catch (error) {
    message.error(error);
  }
}

const columns = [
  {
    title: 'Employee Name',
    dataIndex: 'name',
  },
  {
    title: 'Employee ID',
    dataIndex: 'id',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: (value, value2) => {
      const id = value2.id;
      
      return value && <Flex>
        <Link to={`/employees/${id}`}><EyeOutlined className="mr-2 text-base cursor-pointer" /></Link>

        <Popconfirm 
            title="Delete Employee" 
            description="Are you sure to delete this employee?"
            onConfirm={() => handleDelete(id)}
            okText="Delete"
            cancelText="Cancel">
              <DeleteOutlined className="mr-2 text-base cursor-pointer transition hover:text-red-500"/>
            </Popconfirm>
        </Flex>
    }
  },
];

const breadcrumbItems = [
    {
      path: '/employees',
      title: 'All Employee',
    }
  ];

function Employees() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmployeesData = async () => {
      getEmployees().then(response => {                
        const data = response.map((item) => ({
          key: item.id,
          id: item.id,
          name: <Flex key={item.id} gap={14} align="center">{item.profilePic ? (<Avatar className="shrink-0" src={item.profilePic}></Avatar>) : (<Avatar className="shrink-0"  icon={<UserOutlined />} />)}<p>{item.name}</p></Flex>,
          department: item.department ? item.department.name : "_",
          gender: item.gender,
          phone_number: item.phone_number,
          actions: true,
        }
        ));
        
        setDataSource(data);
        setLoading(false);
      }); 
    }

    
    getEmployeesData();
  }, []);

    return <>
      <PageTitle items={breadcrumbItems} title="All Employee" />

      <Flex align="center" gap='20px' className="pb-4" justify="space-between">
        <Input.Search style={{width: 420}} placeholder="Search employee" enterButton />
        <Link to='/employees/add-employee'>
          <Button type="primary" icon={<PlusCircleOutlined />} >Add Employee</Button>
        </Link>
      </Flex>
      
      <Table 
        rowSelection
        dataSource={dataSource} 
        columns={columns} 
        loading={loading}/>
    </>
}

export default Employees;