import React, { useEffect, useState } from 'react';
import { Col, Flex, Form, Input, message, Modal, Row, Space, Switch, Table} from 'antd';
import MyTypography from '../../components/MyTypography';
import axios from 'axios';
import NewButton from '../../components/NewButton';
import { DescText } from '../../components/DecriptionText';

const ManageRole = () => {
    const [roleDataSource, setRoleDataSource] = useState();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const ROLE_URL = "http://127.0.0.1:8000/user/api/role/";
  
    const loadDataSource = async() => {
      await axios.get(ROLE_URL, {withCredentials: true}).then(response => {
        const data = response.data.map(values => ({
          key: values.id,
          ...values,
        }))
        setRoleDataSource(data)
      }).catch(error => {
        console.error(error);
      })
    }
  
    useEffect(() => {
      loadDataSource();
    }, []);
  
    const onSwitchChange = async (id, data) => {
      await axios.patch(`${ROLE_URL}${id}/`, data, {withCredentials: true}).catch(error => {console.error(error);});
      loadDataSource();
    }
  
    const columns = [
      { 
        dataIndex: "name",
        title: "Role",
        width: 220,
        fixed: 'left',
      },
      { 
        dataIndex: "manage_employee",
        title: "Manage employee",
        align: "center",
        render: (value, {id}) => {        
          return <Switch checked={value} size='small' onChange={(value) => {onSwitchChange(id, {"manage_employee": value})}}/>
        }
      },
      { 
        dataIndex: "manage_payroll",
        title: "Manage payroll",
        align: "center",
        render: (value, {id}) => {        
          return <Switch checked={value} size='small' onChange={(value) => {onSwitchChange(id, {"manage_payroll": value})}}/>
        }
      },
      { 
        dataIndex: "manage_attendance",
        title: "Manage attendance",
        align: "center",
        render: (value, {id}) => {        
          return <Switch checked={value} size='small' onChange={(value) => {onSwitchChange(id, {"manage_attendance": value})}}/>
        }
      },
      { 
        dataIndex: "manage_recruitment",
        title: "Manage recruitment",
        align: "center",
        render: (value, {id}) => {        
          return <Switch checked={value} size='small' onChange={(value) => {onSwitchChange(id, {"manage_recruitment": value})}}/>
        }
      },
    ]
    
    const handleOK = () => {
      form.validateFields().then(values => {
        console.log(values);
        axios.post("http://127.0.0.1:8000/user/api/role/", values).then(response => {
          message.success("Succesfully added a new role!");
          setOpen(false);
          window.location.reload();
        }).catch(error => {
          message.error("Can't save this role!");
        });
      }).catch(error => {
        console.error(error);
      })
    }

    return <>
      <MyTypography level={3}>Role management</MyTypography>
      <DescText>Manage HavenERP role and their permission.</DescText>
    
      <Flex justify='space-between' className='py-3'>
        <MyTypography level={3}>All permissions</MyTypography>
        <Space>
          <Input.Search style={{width: 350}} placeholder='Search' />
          <NewButton onClick={() => {setOpen(true);}}>Add Role</NewButton>
        </Space>
      </Flex>
    
        <Table 
          rowSelection 
          pagination={columns.length > 10}
          dataSource={roleDataSource} 
          columns={columns}></Table>

        <Modal 
          onCancel={() => {setOpen(false)}}
          onOk={handleOK}
          open={open}
          title="Add Role and Permission">
            <Form form={form} size='large'>
              <Row>
                <Col span={24}>
                  <Form.Item label="Role" name="name" rules={[{required: true}]}>
                    <Input placeholder='Role' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Manage employee" name="manage_employee">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Manage payroll" name="manage_payroll">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Manage attendance" name="manage_attendance">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Manage recruitment" name="manage_recruitment">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
        </Modal>
    </>
  }

export default ManageRole;