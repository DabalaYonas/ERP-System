import React from 'react';
import PageTitle from '../../components/PageTitle';
import { Card, Tabs} from 'antd';
import CompanySetting from '../../components/settings/CompanySetting';
import UserSetting from '../../components/settings/UserSetting';
import ManageRole from '../../components/settings/ManageRole';
import GeneralSetting from '../../components/settings/GeneralSetting';
import NotificationSettings from '../../components/settings/NotificationSettings';
import ManageUsers from '../../components/settings/ManageUsers';
import { useNavigate, useParams } from 'react-router-dom';

const tabItems = [
  {
    key: "general",
    label: "General",
    children: <GeneralSetting />
  },
  {
    key: "account",
    label: "Account",
    children: <UserSetting />
  },
  {
    key: "company",
    label: "Company",
    children: <CompanySetting />
  },
  {
    key: "manage-user",
    label: "Manage Users",
    children: <ManageUsers />
  },
  // {
  //   key: "manage-role",
  //   label: "Manage Role",
  //   children: <ManageRole />
  // },
  {
    key: "notification",
    label: "Notification",
    children: <NotificationSettings />
  },
]

export default function Settings() {
  const params = useParams();
  const activeKey = params && params["activeKey"];  
  const navigate = useNavigate();
  
  return (
    <>
      <PageTitle title="Settings"
        description="Manage your account setting and preference."
        items={[
      {
        path: '/settings',
        title: 'Settings',
      }
    ]} />
    <Card>
      <Tabs 
        defaultActiveKey={activeKey} 
        onChange={(key) => {
          navigate(`/settings/${key}`);
        }}
        size='large' 
        centered 
        items={tabItems} />
    </Card>
    </>
  )
}
