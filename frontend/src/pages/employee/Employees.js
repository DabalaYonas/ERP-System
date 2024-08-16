import { Button, Card, Flex, Input, Table, Avatar, Typography, message, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { deletEmployee, getEmployees } from "../../actions/handleEmployee";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { getDepartment } from "../../actions/handleDepartment";
import PageTitle from "../../components/PageTitle";

const handleDelete = (id) => {
  try {
    deletEmployee(id);
    message.success(`Employee with an ID ${id} is deleted!`);
  } catch (error) {
    message.error(error);
  }
}

const ActionButtons = (id) => (
  [<Link to={`/employees/${id}`}><EyeOutlined className="mr-2 text-base cursor-pointer" /></Link>, 

  <Popconfirm 
      title="Delete Employee" 
      description="Are you sure to delete this employee?"
      onConfirm={() => handleDelete(id)}
      okText="Delete"
      cancelText="Cancel"><DeleteOutlined className="mr-2 text-base cursor-pointer transition hover:text-red-500"/></Popconfirm>]);

const columns = [
  {
    title: 'Employee Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Employee ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Department',
    dataIndex: ['department'],
    key: 'department',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
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
          name: <Flex gap={14} align="center">{item.profilePic ? (<Avatar className="shrink-0" src={item.profilePic}></Avatar>) : (<Avatar className="shrink-0"  icon={<UserOutlined />} />)}<p>{item.name}</p></Flex>,
          department: item.department ? item.department.name : "_",
          gender: item.gender,
          phone_number: item.phone_number,
          actions: ActionButtons(item.id),
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

            <Flex align="center" gap='20px' className="pb-4">
             <Input.Search size="large" placeholder="Search employee" width='300px'/>
              <Link to='/employees/add-employee'>
                <Button type="primary" icon={<PlusCircleOutlined />} size="large">Add Employee</Button>
              </Link>
            </Flex>
            
            <Table 
              rowSelection
              rowKey="id"
              dataSource={dataSource} 
              columns={columns} 
              loading={loading}/>
    </>
}

export default Employees;