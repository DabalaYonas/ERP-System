import { Button, Card, Flex, Input, Table, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { getEmployees } from "../../actions/handleEmployee";
import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";

const ActionButtons = () => ([<EyeOutlined className="mr-2 text-base cursor-pointer" />, <EditOutlined className="mr-2 text-base cursor-pointer"/>, <DeleteOutlined className="mr-2 text-base cursor-pointer"/>]);

const columns = [
  {
    title: 'Employee ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Employee Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Department',
    dataIndex: 'department',
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
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);

  getEmployees().then(response => {
    const data = response.map((item) => ({
      key: item.id,
      id: item.id,
      name: <Flex gap={14} align="center"><Avatar src="/photo_profile.jpg"></Avatar><p>{item.name}</p></Flex>,
      department: item.department,
      gender: item.gender,
      phone_number: item.phone_number,
      actions: ActionButtons(),
    }));
  
    setDataSource(data);
  });

    return <>
            <Breadcrumbs items={breadcrumbItems} />
            <Flex align="center" gap='20px' className="pb-4">
             <Input.Search size="large" placeholder="Search employee" width='300px'/>
              <Link to='/employees/add-employee'>
                <Button type="primary" icon={<PlusCircleOutlined />} size="large">Add Employee</Button>
              </Link>
            </Flex>
            
            <Table rowSelection 
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {navigate("/employees/1")}
                }}}
              dataSource={dataSource} columns={columns} />
    </>
}

export default Employees;