import React from 'react';
import { Card } from 'antd';
import Tab from '../../components/employee/EmployeeTab';
import PersonalForm from '../../components/employee/PersonalForm';
import WorkForm from '../../components/employee/WorkForm';
import DocumentForm from '../../components/employee/DocumentForm';
import Breadcrumbs from '../../components/Breadcrumbs';

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
      </>
  )
}

export default AddEmployee;
  