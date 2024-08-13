import React from 'react';
import { Card } from 'antd';
import Tab from '../../components/employee/EmployeeTab';
import PersonalForm from '../../components/employee/PersonalForm';
import WorkForm from '../../components/employee/WorkForm';
import DocumentForm from '../../components/employee/DocumentForm';
import Breadcrumbs from '../../components/Breadcrumbs';
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
      <Tab 
          PersonalChildern={PersonalForm} 
          WorkChildren={WorkForm} 
          DocumentChildren={DocumentForm} />
    </Card>
      </>
  )
}

export default AddEmployee;
  