import React from 'react';
import { Card } from 'antd';
import EmployeeTab from '../../components/employee/EmployeeTab';
import PageTitle from '../../components/PageTitle';

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
  return (
    <>
    <PageTitle items={breadcrumbItems} title="New Employee" />
    <Card >
      <EmployeeTab />
    </Card>
      </>
  )
}

export default AddEmployee;
  