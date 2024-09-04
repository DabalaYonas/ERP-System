import React, { useEffect, useRef, useState } from 'react'
import Barcode from "react-barcode";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button, Flex, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { getEmployee } from '../services/handleEmployee';

const IDCard = () => {
  const componentRef = useRef();
  const {userId} = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
        const loadEmployeeData = () => {
            getEmployee(userId).then(data => {
                setEmployee(data);
                // console.log(data);
                setLoading(false);
                
            });

        };

        loadEmployeeData();
    } catch (error) {
        
    }
  }, [userId]);

  const handleDownloadPDF = () => {
    html2canvas(document.getElementById('id-card'), {scale: 5}).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 323.52/3;
      // const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Id_Card.pdf');
    });
  };

  if (loading) {
    return <Skeleton />
  }

  const List = ({ children }) => {
    return <li style={{ padding: "3px 0px"}} className='text-xs font-normal text-white text-opacity-90'>{children}</li>
  }

  return <>
  {/* <PageTitle backable/> */}
  <Flex align='center' className='mb-5' vertical>
    <div>
  <div className="id-card-tag"></div>
	<div className="id-card-tag-strip"></div>
	<div className="id-card-hook"></div>

	<div id='id-card' className="id-card-holder">
  <div  style={{ width: "3.1875in", height: "5.0625in"}} className='bg-white cursor-default bg-opacity-85 rounded shadow overflow-clip relative'>
    <Flex gap={8} align='center' className='py-5' vertical>
      <img alt='Company Logo' src='/logo_no_txt.png' style={{ width: 70 }} />
      <h2 className='text-xl font-semibold text-black text-opacity-75' level={3}>Next General Trading</h2>
      <img alt='Id' src={employee.profilePic} className='z-10 rounded-full border-4 object-cover object-center' style={{ width: 120, height: 120, borderBlockColor: "#dedede"}} />
      
      <div className='text-center z-10'>
        <h2 className='text-xl font-semibold text-white text-opacity-95' level={3}>{employee.name}</h2>
        <p className='font-medium text-white text-opacity-90'>{employee.job_position.name && employee.job_position.name}</p>
      </div>
      <div className='card-rectangle absolute w-full bottom-0'></div>
      <Flex gap={6} style={{ zIndex: 10, marginTop: 8}} className='mt-2 z-10'>
        <ul>
          <List>Staff Id</List>
          <List>Phone Number</List>
          <List>Email</List>
          <List>Address</List>
        </ul>

        <ul>
          <List> : {`NGT-${employee.department.id}-${userId}`}</List>
          <List> : {employee.phone_number}</List>
          <List> : {employee.email}</List>
          <List> : Garment, Addis Abeba</List>
        </ul>
      </Flex>


      <Barcode value={`NGT-${employee.department.id}-${userId}`} width={1.4} height={35} lineColor='#fff' background='#00000000'/>
    </Flex>
  </div>
  </div>
  </div>
  <Button className='mt-2' type='primary' onClick={handleDownloadPDF}>Download Id Card</Button>

  </Flex>
  </>
}  

export default IDCard;