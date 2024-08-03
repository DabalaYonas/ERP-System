import React, { useState } from 'react';
import {
    UserOutlined,
  } from '@ant-design/icons';
import { Card, Form, Space, Input, Modal } from 'antd';
import SearchInput from '../../components/SearchInput';
import Tab from '../../components/employee/EmployeeTab';
import PersonalForm from '../../components/employee/PersonalForm';
import WorkForm from '../../components/employee/WorkForm';
import DocumentForm from '../../components/employee/DocumentForm';
import Breadcrumbs from '../../components/Breadcrumbs';

const items = [
    {   key: 'personal',
        label: 'Personal Information',
        icon: <UserOutlined />
    },
    {   key: 'work',
        label: 'Work Information',
        icon: <UserOutlined />
    },
    {   key: 'documents',
        label: 'Documents',
        icon: <UserOutlined />
    }, 
];

const breadcrumbItems = [
    {
      path: '/employees',
      title: 'All Employee',
    },
    {
      path: '/add-employee',
      title: 'Add New Employee',
    }
  ];

function AddEmployee() {
  const [modalDeprOpen, setModalDeprOpen] = useState(false);
  const [modalJopPosOpen, setModalJopPosOpen] = useState(false);
  const [labelDepr, setLabelDepr] = useState();
  const [labelJopPos, setLabelJopPos] = useState();

  const handleDeprCreateEdit = (value) => {
    setLabelDepr(value);
    setModalDeprOpen(true);
  }

  const handleJopPosCreateEdit = (value) => {
    setLabelJopPos(value);
    setModalJopPosOpen(true);
  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
 
  return (
    <>
    <Breadcrumbs items={breadcrumbItems} />
    <Card >
      <Tab 
          PersonalChildern={PersonalForm} 
          WorkChildren={WorkForm} 
          DocumentChildren={DocumentForm} />
    </Card>

      <Modal
          centered
          title="Create Department"
          open={modalDeprOpen}
          onCancel={() => {setModalDeprOpen(false)}}>
            <Form size='large'>
              <Space direction='vertical' size={'middle'} className='flex py-4'>
                <Input placeholder='Department' value={labelDepr} onChange={(text) => {setLabelDepr(text.target.value)}}/>
                <SearchInput placeholder="Parent Department" style={{width: "100%"}} />
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
      </Modal>
      </>
  )
}

export default AddEmployee;
  