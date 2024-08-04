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
      cancelText="Cancel"><DeleteOutlined className="mr-2 text-base cursor-pointer"/></Popconfirm>]);

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
    align: "center"
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
    const getDepartmentData = async(id) => {
      return await getDepartment(id);
    }
    const getEmployeesData = async () => {
      getEmployees().then(response => {
        console.log(response);
        
        const data = response.map((item) => ({
          key: item.id,
          id: item.id,
          name: <Flex gap={14} align="center">{item.profilePic ? (<Avatar src={item.profilePic}></Avatar>) : (<Avatar icon={<UserOutlined />} />)}<p>{item.name}</p></Flex>,
          department: item.department ? item.department : "_",
          gender: item.gender,
          phone_number: item.phone_number,
          actions: ActionButtons(item.id),
        }
        ));
        
        // console.log(response);
        
        setDataSource(data);
        setLoading(false);
      }); 
    }

    
    getEmployeesData();
  }, []);

    return <>
            <Breadcrumbs items={breadcrumbItems} />
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