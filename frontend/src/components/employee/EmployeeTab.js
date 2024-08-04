import { Form, message, Skeleton, Tabs } from 'antd'
import React, { useEffect, useState } from 'react';
import { UserOutlined, FileTextOutlined, FolderOpenOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getEmployee, postEmployees, putEmployee } from '../../actions/handleEmployee';
import { useParams } from 'react-router-dom';


const profileTabItems = (PersonalChildern, WorkChildren, DocumentChildren, setActiveKey) => {
  
  return [
    {   key: 'personal',
        label: 'Personal Informations',
        icon: <UserOutlined />,
        children: <PersonalChildern setActiveKey={setActiveKey}/>,
    },
    {   key: 'work',
        label: 'Work Informations',
        icon: <FileTextOutlined />,
        children: <WorkChildren setActiveKey={setActiveKey}/>,
    },
    {   key: 'document',
        label: 'Documents',
        icon: <FolderOpenOutlined />,
        children: <DocumentChildren />
    }
  ]};

function Tab({disabled = false, PersonalChildern, WorkChildren, DocumentChildren, hasInitial = false}) {
  const [activeKey, setActiveKey] = useState();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null);
  const params = useParams();
  const userId = params ? params.userId : null;

  useEffect(() => {
    if (userId) {
      getEmployee(userId).then(data => {
        data.remember = true;
        data.bdate = dayjs(data.bdate);
        data.profilePic = null;
        setInitialValues(data);
        // console.log(data);
        
      });
    }
  }, []);

  const onFinish = (value) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("email", value.email);
    formData.append("phone_number", value.phone_number);
    formData.append("gender", value.gender);
    formData.append("bdate", value.bdate.format("YYYY-MM-DD"));
    value.profilePic && formData.append("profilePic", value.profilePic.file, value.profilePic.file.name); 

    value.department && formData.append("department", value.department);
    value.jop_position && formData.append("jop_position", value.jop_position);
    console.log(value);
    

    try {
      userId ? putEmployee(formData, userId) : postEmployees(formData); 
      message.success("Employee Created Seccussfully!");
    } catch (error) {
      message.error("Can't create this employee!")
      console.log(error);
      
    }
  }
  
  if (!initialValues && hasInitial) {
    return <Skeleton active></Skeleton>;
  }

  return (
      <>
      <Form
        onFinish={onFinish}
        form={form}
        size='large'
        disabled={disabled}
        initialValues={initialValues}
        layout='vertical'>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {setActiveKey(key)}}
        defaultActiveKey="personal"
        items={profileTabItems(PersonalChildern, WorkChildren, DocumentChildren, setActiveKey)}/>
      </Form>
      
{/* 
      <Modal
          centered
          title="Create Department"
          open={modalDeprOpen}
          onCancel={() => {setModalDeprOpen(false)}}>
            <Form size='large'>
              <Space direction='vertical' size={'middle'} className='flex py-4'>
                <Input placeholder='Department' value={labelDepr} onChange={(text) => {setLabelDepr(text.target.value)}}/>
                <SearchInput
                  placeholder="Parent Department" 
                  style={{width: "100%"}} />
              </Space>
            </Form>
      </Modal>

      <Modal
          centered
          title="Create Jop Position"
          open={modalJopPosOpen}
          onCancel={() => {setModalJopPosOpen(false)}}>

            <div className='py-4'>
              <Form size='large'>
                <Input placeholder='Jop Position' value={labelJopPos} onChange={(text) => {setLabelJopPos(text.target.value)}}/>
              </Form>
            </div>
      </Modal>   */}
      </>
  )
}

export default Tab