import { Card, Tabs } from 'antd'
import React, { useState } from 'react';
import { UserOutlined, FileTextOutlined, FolderOpenOutlined } from "@ant-design/icons";


const profileTabItems = (disabled, PersonalChildern, WorkChildren, DocumentChildren, setActiveKey) => {
  
  return [
    {   key: 'personal',
        label: 'Personal Informations',
        icon: <UserOutlined />,
        children: <PersonalChildern disabled={disabled} setActiveKey={setActiveKey}/>
    },
    {   key: 'work',
        label: 'Work Informations',
        icon: <FileTextOutlined />,
        children: <WorkChildren disabled={disabled} setActiveKey={setActiveKey}/>
    },
    {   key: 'document',
        label: 'Documents',
        icon: <FolderOpenOutlined />,
        children: <DocumentChildren />
    }
  ]};

function Tab({disabled = false, PersonalChildern, WorkChildren, DocumentChildren}) {
  const [activeKey, setActiveKey] = useState();
  return (
    // <Card>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {setActiveKey(key)}}
        defaultActiveKey="personal"
        items={profileTabItems(disabled, PersonalChildern, WorkChildren, DocumentChildren, setActiveKey)}/>
    // </Card>
  )
}

export default Tab