import { Button, DatePicker, Flex, Form, Input, List, message, Modal, Select, Space, Tabs, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import StatisticCard from '../../components/StatisticCard'
import MyCard from '../../components/MyCard'
import { getHolidays } from '../../services/handleLeaves'
import dayjs from "dayjs";
import { PlusOutlined, FieldTimeOutlined, CarryOutOutlined, CalendarOutlined } from "@ant-design/icons";
import FileUploader from '../../components/FileUploader'
import SearchInput from '../../components/SearchInput';
import { getEmployees } from '../../services/handleEmployee';
import DataSelect from '../../components/DataSelect'
import TableWithEmployee from '../../components/TableWithEmployee'
import { getJopPositions } from '../../services/handleJopPosition'
import API from '../../services/api'

function Leave() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();    
  const [holidayItems, setHolidayItems] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [leaveSummary, setLeaveSummary] = useState({});
  const [jobPositionFilter, setJobPositionFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const holidayResponse = await getHolidays();
      const holidayDatas = holidayResponse.map(item => ({
        name: item.name,
        date: dayjs(item.date).format("MMM DD"),
        day: dayjs(item.date).format("dddd"),
      }));
      
      setHolidayItems(holidayDatas);        
    } catch (error) {
      console.error(error);
    }

    await API.get("/leave/api/pending/")
    .then(response => {
      const datas = response.data.map(data => (
        {
          key: data.id,
          id: data.id,
          employee: data.employee.name,
          profilePic: data.employee.profilePic,
          leave_type: data.leave_type.name,
          startDate: dayjs(data.start_date).format("MMM DD"),
          endDate: dayjs(data.end_date),
          date: dayjs(data.start_date).format("MMM DD") + " - " + dayjs(data.end_date).format("MMM DD"),
          duration: dayjs(data.end_date).subtract(dayjs(data.start_date)).format("DD"),
          status: data.status,
        }
      ));
      setPendingData(datas);
    })
    .catch(errInfo => {
      message.error(errInfo);
    });

    await API.get("/leave/api/approved/")
    .then(response => {
      const datas = response.data.map(data => (
        {
          key: data.id,
          employee: data.employee.name,
          job_position_id: data.employee.job_position.id,
          job_position: data.employee.job_position.name,
          profilePic: data.employee.profilePic,
          leave_type: data.leave_type.name,
          startDate: dayjs(data.start_date),
          endDate: dayjs(data.end_date),
          date: dayjs(data.start_date).format("MMM DD") + " - " + dayjs(data.end_date).format("MMM DD"),
          due_date: dayjs(data.start_date).subtract(dayjs()).format("DD"),
          status: data.status,
        }
      ));

      setApprovedData(datas);
    })
    .catch(errInfo => {
      message.error(errInfo);
    });

    await API.get("/leave/api/leave-summary/")
    .then(response => {
      setLeaveSummary(response.data.overall_summary);
    })
    .catch(errInfo => {
      console.error(errInfo);
    })
    
    const jobPosResponse = await getJopPositions();
    const jobPosData = jobPosResponse.data.map((value) => ({
      text: value.name,
      value: value.id,
    }));       
    
    setLoading(false); 
    setJobPositionFilter(jobPosData);
  }
  
  useEffect(() => {
    fetchData();
  }, []);


  const handleApprove = async(id) => {
    await API.patch(`http://127.0.0.1:8000/leave/api/${id}/approve/`)
    .then(response => {
      message.success("Approved this leave successfully!");
      fetchData();
    })
    .catch(errInfo => {
      message.error("Can't approve this employee leave request!");
    });
  }
  
  const handleReject = async(id) => {
    await API.patch(`http://127.0.0.1:8000/leave/api/${id}/reject/`)
    .then(response => {
      message.success("Rejected this employee leave successfully!");
      fetchData();
    })
    .catch(errInfo => {
      message.error("Can't reject this employee leave request!");
    });
  }
  
  const requestColumn = {
    order: ["employee", "date", "leave_type", "duration", "action"],
    columns : [{
      dataIndex: "leave_type",
      title: "Leave type",
      render: (value, _) => {
        const valueLowerCase = value.toString().toLowerCase();
        const color = valueLowerCase === "annual leave" ? "blue" : valueLowerCase === "sick leave" ? "red" : "green";
        return <Tag color={color}>{value}</Tag>
      },
      filters: [
        {
          text: 'Sick Leave',
          value: 'Sick Leave',
        },
        {
          text: 'Annual Leave',
          value: 'Annual Leave',
        },
      ],
      onFilter: (value, record) => record.leave_type.indexOf(value) === 0,
    },
    {
      dataIndex: "duration",
      title: "Duration",
      sorter: (a, b) => a.duration - b.duration,
      render: (_, {duration}) => {
        return `${duration} days`
      }
    },
    {
      dataIndex: "action",
      title: "Action",
      render: (_, {id}) => {
        return <Space>
          <Button size='small' type='primary' onClick={() => handleApprove(id)}>Approve</Button>
        <Button size='small' onClick={() => {handleReject(id)}}>Reject</Button>
        </Space>
      }
    },
  ]
}
  
  const approvedColumns = {
    order: ["employee", "date", "leave_type", "job_position", "due_date"],
    columns : [
    {
      dataIndex: "job_position",
      title: "Job position",
      filters: jobPositionFilter,
      filterMode: 'tree',
      onFilter: (value, record) => record.job_position_id.toString().indexOf(value) === 0,
    },
    {
      dataIndex: "leave_type",
      title: "Leave type",
      render: (value, _) => {
        const valueLowerCase = value.toString().toLowerCase();
        const color = valueLowerCase === "annual leave" ? "blue" : valueLowerCase === "sick leave" ? "red" : "green";
        return <Tag color={color}>{value}</Tag>
      },
      filters: [
        {
          text: 'Sick Leave',
          value: 'Sick Leave',
        },
        {
          text: 'Annual Leave',
          value: 'Annual Leave',
        },
      ],
      onFilter: (value, record) => record.leave_type.indexOf(value) === 0,
    },
    {
      dataIndex: "due_date",
      title: "Due date",
      sorter: (a, b) => a.due_date - b.due_date,
      render: (_, {due_date}) => {
        return `${due_date} days`
      }
    },
  ]}

  const handleAssignLeave = () => {
    form.validateFields().then(async (values) => {
      const formData = new FormData();
      const startDate = dayjs(values.date[0]);
      const endDate = dayjs(values.date[1]);
      const dateFormat = "YYYY-MM-DD";

      formData.append("employee_id", values.employee);
      formData.append("leave_type_id", values.leave_type);
      formData.append("start_date", startDate.format(dateFormat));
      formData.append("end_date", endDate.format(dateFormat));
      formData.append("status", "Approved");
      values.reason && formData.append("reason", values.reason);
      values.document && values.document.forEach(file => {
        formData.append("documents", file.originFileObj, file.originFileObj.name);
      });

      await API.post("http://127.0.0.1:8000/leave/api/", formData, 
        {
          withCredentials: true, 
          headers: {
            'Content-Type': 'multipart/form-data',
          }
    })
      .then(response => {
        message.success("You successfully requested a leave!");
        form.resetFields();
        setOpen(false);
      })
      .catch(errInfo => {
        console.error(errInfo);
        if (errInfo.response && errInfo.response.data) {
          message.error(errInfo.response.data.error);
        } else if (errInfo.response.data.details) {
          message.error(errInfo.response.data.error);
        } else {
          message.error("Can't request this leave please try again another time!");
        }
      });

    }).catch(errInfo => {
      console.error(errInfo);
    });
  }

  return (
    <>
    <PageTitle title="Employee Leave" items={[
      {
        path: '/leave',
        title: 'Leave',
      }
    ]} />

  <Flex gap="middle" align='flex-start'>
    <Space size="middle" className='flex-grow' direction='vertical'>
      <Flex gap="middle">
        <StatisticCard icon={<CarryOutOutlined />} value={leaveSummary.approved_leaves ? leaveSummary.approved_leaves : 0} title="Approved Leaves"/>
        <StatisticCard icon={<FieldTimeOutlined />} value={leaveSummary.pending_leaves ? leaveSummary.pending_leaves : 0} title="Pending Leaves"/>
        <StatisticCard icon={<CalendarOutlined />} value={leaveSummary.annual_leaves ? leaveSummary.annual_leaves : 0} title="Annual Leaves"/>
      </Flex>
      <Tabs tabBarExtraContent={<Button type='primary' icon={<PlusOutlined />} onClick={() => {setOpen(true)}}>Assign leave</Button>} 
      items={[
        {
          key: 1,
          label: "Requests",
          children: <MyCard title="Leave Requests">
            <TableWithEmployee
              loading={loading}
              columnOrder={requestColumn.order}
              pagination={pendingData.length > 10} 
              columns={requestColumn.columns} 
              dataSource={pendingData}/>
          </MyCard>,
        },
        {
          key: 2,
          label: "On Leave",
          children: <MyCard title="Leave Calander">  
            <TableWithEmployee
              loading={loading}
              pagination={approvedData.length > 10} 
              columnOrder={approvedColumns.order}
              columns={approvedColumns.columns} 
              dataSource={approvedData}/>
          </MyCard>,
        }
      ]} />
      
    </Space>
    
    <div className='w-96'>
      <MyCard title="Holidays">
        <List
          loading={loading}
          className='px-2 cursor-default overflow-hidden'
          dataSource={holidayItems}
          renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                  avatar={<div className='w-12 h-12 p-1 text-sm flex justify-center items-center font-semibold text-black text-opacity-75 rounded-lg text-center'>{item.date}</div>}
                  description={item.day}
                  title={<h3 className='font-semibold text-sm text-black text-opacity-75'>{item.name}</h3>}>

                </List.Item.Meta>
            </List.Item>
          )}>

        </List>
    </MyCard>
    </div>
  </Flex>
    
    <Modal
      title={<h3 className='text-2xl font-medium text-black text-opacity-80'>Request Leave</h3>}
      open={open}
      width={600}
      style={{
        top: 20,
      }}
      onOk={handleAssignLeave}
      onCancel={() => {setOpen(false); form.resetFields();}}
      okText="Assign Leave"
      cancelText="Cancel">
        <Form
          layout='vertical'
          form={form}
          size='large'>
          <Form.Item label="Employee" name="employee" rules={[{required: true, message: "Please select employee"}]}>
            <SearchInput placeholder="Select Employee" canCreate={false} serverData={getEmployees}/>
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{required: true, message: "Please select leave status"}]}>
            <Select placeholder="Leave status">
              <Select.Option value="approved">Approved</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Leave type" name="leave_type" rules={[{required: true, message: "Please select leave type"}]}>
            <DataSelect link="http://127.0.0.1:8000/leave/api/types/" placeholder="Leave type" />
          </Form.Item>

          <Form.Item label="Dates" name="date" rules={[{required: true, message: "Please select range of date"}]}>
            <DatePicker.RangePicker className='w-full' minDate={dayjs()} />
          </Form.Item>

          <Form.Item label="Reason (Optional)" name="reason">
            <Input.TextArea placeholder='Reason' />
          </Form.Item>

          <Form.Item label="Document (Optional)" name="document">
            <FileUploader />
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  )
}

export default Leave