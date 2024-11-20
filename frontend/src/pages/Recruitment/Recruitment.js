import { Button, Card, Col, Flex, Form, Input, message, Modal, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaBaseballBall, FaHandshake, FaLaptop, FaPlusCircle, FaUser } from "react-icons/fa";
import { getRecruitments, postRecruitment } from '../../services/handleRecruitment';
import { useNavigate } from "react-router-dom";
import ListGrid from '../../components/ListGridSegment';

const boxItems = [{
  color: "green",
  icon: <FaHandshake />
  },
  {
    color: "red",
    icon: <FaLaptop />
  },
  {
    color: "pink",
    icon: <FaUser />
  },
  {
    color: "yellow",
    icon: <FaBaseballBall />
  },
]

const BoxIcon = ({color, children}) => {
  let boxColor = "#ffffff";
  let iconColor = "#000000";
  switch (color.toLowerCase()) {
    case "blue":
      boxColor = "#5bc0eb";
      iconColor = "#93867f";
      break;

    case "pink":
      boxColor = "#efc3f5";
      iconColor = "#7353ba";
      break;

    case "green":
      boxColor = "#68edc6";
      iconColor = "#5d675b";
      break;

    case "red":
      boxColor = "#ffa9a3";
      iconColor = "#7e6c6c";
      break;

    case "yellow":
      boxColor = "#d2e59e";
      iconColor = "#918868";
      break;
  }
  return <div style={{ backgroundColor: boxColor, color: iconColor}} className='p-4 bg-sky-400 rounded-md inline-block'>{children}</div>
}

export const MyTitle = ({children}) => {
  return <h2 className='text-xl font-medium'>{children}</h2>
}

export const JobCard = ({ value, index, navigate }) => {
  return (<Card className='cursor-default'>
    <Flex align='center' gap={10} justify='start'>
      <BoxIcon color={boxItems[index % boxItems.length].color}>{boxItems[index % boxItems.length].icon}</BoxIcon>
      <MyTitle>{value.title}</MyTitle>
    </Flex>
    
    <Flex align='center' gap={10} justify='space-between' className='mt-4'>
      <Button size='large' onClick={() => {navigate(`/recruitment/${value.id}/`)}}>{value.app_count} New Applications</Button>
      {/* <p className='text-center'>5 Target</p> */}
    </Flex>
  </Card>);
}

function Recruitment() {
  const [isOpen, setIsOpen] = useState(false);
  const [recruitmentData, setRecruitmentData] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const LoadRecruitmentData = async() => {

      await getRecruitments().then(datas => {
        const data = datas.map(values => ({
          id: values.id,
          title: values.job_position_name,
          app_count: values.application_count,
        }));

        setRecruitmentData(data);
      });
  }

    LoadRecruitmentData();
  }, [form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      formData.append("job_position_name", values.job_position);
      formData.append("email_alias", values.email_alias);

      try {
        postRecruitment(formData);
        message.success("Succesfully saved this Job Position!");
        window.location.reload();
        setIsOpen(false);
      } catch (error) {
        message.error("Can't save this Job Positions");
      }
    });
  }

  if (recruitmentData == null) {
    return <Skeleton active/>
  }

  return <>
  <Flex align='center' className='py-5' justify='space-between'>
    <Flex align='center' gap={100}>
      <h2 className='text-2xl font-medium cursor-default'>All Jobs</h2>
      <Button type="primary" 
        size='middle' 
        icon={<FaPlusCircle />}
        onClick={() => {setIsOpen(true)}}>New Job Positions</Button>
    </Flex>

    <ListGrid />

  </Flex>
  
  <Row gutter={[25, 15]} style={{ marginRight: "0px"}}>
    {recruitmentData.map((value, index) => {   
      return <Col key={index} span={6} xl={6} md={12} xs={24}>
        <JobCard 
          key={index}
          value={value}
          navigate={navigate}
          index={index}/>
      </Col>
    })}
  </Row>

  <Modal
    open={isOpen}
    okText="Create"
    onCancel={() => {setIsOpen(false)}}
    onOk={handleOk}
    title="Job Position">

      <Form 
        form={form}
        size='large'
        layout='vertical'>
        <Form.Item name="job_position" label="Job Position" rules={[{required: true}, {message: "Please Enter a Job Position please!"}]}>
          <Input placeholder='Job Position' />
        </Form.Item>
        
        <Form.Item name="email_alias" label="Application Email" rules={[{required: true}, {message: "Please Enter a email alias please!"}]}>
          <Input placeholder='e.g project-manager' addonAfter="@ngt.dabo.com"/>
        </Form.Item>
      </Form>
  </Modal>
  </>
}

export default Recruitment