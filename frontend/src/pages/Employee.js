import { Button, Card, Flex, Input, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

    const dataSource = [
    {
        key: '1',
        name: ['Mike'],
        id: 32,
        department: 'HR Managment',
        type: 'Office',
        actions: [<EyeOutlined className="mr-2 text-base cursor-pointer" />, <EditOutlined className="mr-2 text-base cursor-pointer"/>, <DeleteOutlined className="mr-2 text-base cursor-pointer"/>]
    },
    {
        key: '2',
        name: ['John'],
        id: 42,
        department: 'IT Department',
        type: 'Office',
        actions: [<EyeOutlined className="mr-2 text-base cursor-pointer" />, <EditOutlined className="mr-2 text-base cursor-pointer"/>, <DeleteOutlined className="mr-2 text-base cursor-pointer"/>]
    },
    ];

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
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
  },
];

function Employee() {
    return <>
        <Card>
            <Flex align="center" gap='20px' className="py-4">
             <Input.Search placeholder="Search employee" width='300px'/>
              <Button type="text" icon={<PlusCircleOutlined />} className="bg-primary-600 text-white p-5">Add Employee</Button>
            </Flex>
            
            <Table dataSource={dataSource} columns={columns} />
        </Card>
    </>
}

export default Employee;