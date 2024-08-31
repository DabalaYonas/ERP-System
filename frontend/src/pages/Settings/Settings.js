import React from 'react';
import PageTitle from '../../components/PageTitle';
import { Card, Tabs} from 'antd';
import CompanySetting from '../../components/settings/CompanySetting';
import UserSetting from '../../components/settings/UserSetting';
import ManageRole from '../../components/settings/ManageRole';
import GeneralSetting from '../../components/settings/GeneralSetting';
import Notification from '../../components/settings/Notifications';
import ManageUsers from '../../components/settings/ManageUsers';

const tabItems = [
  {
    key: 1,
    label: "General",
    children: <GeneralSetting />
  },
  {
    key: 2,
    label: "Account",
    children: <UserSetting />
  },
  {
    key: 3,
    label: "Company",
    children: <CompanySetting />
  },
  {
    key: 4,
    label: "Manage Users",
    children: <ManageUsers />
  },
  {
    key: 5,
    label: "Manage Role",
    children: <ManageRole />
  },
  {
    key: 6,
    label: "Notification",
    children: <Notification />
  },
]

export default function Settings() {
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
      <Tabs size='large' centered items={tabItems} />
    </Card>
    </>
  )
}
