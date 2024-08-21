import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Button, Card, Col, Divider, Flex, Form, Input, InputNumber, Layout, message, Row, Skeleton, Steps, Typography } from 'antd';
import { PlusCircleOutlined } from "@ant-design/icons";
import SearchInput from '../../components/SearchInput';
import { getJopPositions } from '../../actions/handleJopPosition';
import { getDepartments } from '../../actions/handleDepartment';
import { getDegrees, getStages, postDegree } from '../../actions/handleLookupDatas';
import { getApplication, getRecruitment, postApplicant, postApplication, putApplicant, putApplication } from '../../actions/handleRecruitment';
import { useNavigate, useParams } from 'react-router-dom';
import Error404 from '../Error404';
import PageTitle from '../../components/PageTitle';

const InitialStage = [];

function NewApplication() {
  const [current, setCurrent] = useState(0);
  const [stages, setStages] = useState(InitialStage);
  const [application, setApplication] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appParams, setAppParams] = useState(null);
  const [recrtParams, setRecrtParams] = useState(null);
  const [form] = Form.useForm();
  const params = useParams();
  const recruitmentID = params["recruitmentID"];
  const applicationID = params["applicationID"];
  const navigate = useNavigate();

  const isNewApplicationUrl = () => {
    return applicationID.toLowerCase() == "new-application";
  }
  

  useEffect(() => {
    const loadStages = async() => {
      setLoading(true);
      if (!isNewApplicationUrl()) {
        const application = await getApplication(applicationID);
        
        const applicant = application.applicant;
        const recruitment = application.recruitment;
        
        const data = {...applicant, ...recruitment};

        data.department_id = application.department_id;
        data.expected_salary = application.expected_salary;
        data.proposed_salary = application.proposed_salary;

        setInitialValues(data);

        if (application) {
          const response = await getStages();
          const result = response.map((value) => ({
            id: value.id,
            title: value.name
          }));
          
          setCurrent(application.stage_id - 1);
          
          setStages(result);
          setApplication(application);
          setAppParams(applicant.name);
          setRecrtParams(recruitment.job_position_name);
        }
        setLoading(false);

      } else {
        const response = await getStages();
        const result = response.map((value) => ({
          id: value.id,
          title: value.name
        }));

        const recrt = await getRecruitment(recruitmentID);
        
        setRecrtParams(recrt.job_position_name);   
        setAppParams("New Application");
        setStages(result);
        setLoading(false);
      }
    }    

    loadStages();
  }, [applicationID, recruitmentID]);

  const createApplicant = async (data) => {
    return await postApplicant(data);
  }

  const onFinish = (values) => {
    try {
      const save = async() => {
        const applicantData = new FormData();
        applicantData.append("name", values.name);
        values.email && applicantData.append("email", values.email);
        applicantData.append("phone_number", values.phone_number);
        values.degree && applicantData.append("degree", values.degree);
        values.linkidin_profile && applicantData.append("linkidin_profile", values.linkidin_profile);
        
        const applicant =  isNewApplicationUrl() ? await createApplicant(applicantData) : await putApplicant(application.applicant.id, applicantData);
        
        const formData = new FormData();
        formData.append("recruitment_id", recruitmentID);
        formData.append("applicant_id", applicant.id);
        values.department_id && formData.append("department_id", values.department_id);
        formData.append("job_position_id", values.job_position_id);
        values.expected_salary && formData.append("expected_salary", values.expected_salary);
        values.proposed_salary && formData.append("proposed_salary", values.proposed_salary);
        formData.append("stage_id", stages[current].id);

        isNewApplicationUrl() ? postApplication(formData) : putApplication(applicationID, formData);
      }
      save();
      const msg = isNewApplicationUrl() ? "Application created successfully!" : "Application updated successfully!";
      message.success(msg);
    } catch (error) {
      message.error("Can't create this application!");
    }
  }

  const onClickNewApplication = async() => {
    try {
      await form.validateFields();
      form.submit();
    } catch (error) {
      console.log(message);
    }
  }

  if (!isNewApplicationUrl()) {
    if (loading) {
      return <Skeleton />
    } else if (!application) {
        return <Error404 />
    }
  }

  return (
    <>
      <PageTitle title={isNewApplicationUrl() ? "New Application" : "Application Detail"} items={[
      {
        path: '/recruitment',
        title: 'Recruitment',
      },
      {
        path: `/${recruitmentID}`,
        title: `${recrtParams}`,
      },
      {
        path: `/${applicationID}`,
        title: `${appParams}`,
      },
    ]} />
    
    <Flex align='center' gap={20} className='py-2'>
      <Button type='primary' size='middle' icon={<PlusCircleOutlined />} onClick={onClickNewApplication}>New Application</Button>
      <Typography.Title level={5}>{application ? application.recruitment.job_position_name : "New Application"}</Typography.Title>
    </Flex>
    
    <Flex align='center' gap={50} className='custom-scroll py-2 overflow-y-auto'>
      <Button danger>Refuse</Button>
   
      <Steps 
        type='navigation'
        size='small'
        items={stages}
        onChange={(value) => {setCurrent(value)}}
        current={current}/>

    </Flex>

    <Layout.Content>
      <Card>
        <Form initialValues={initialValues} form={form} onFinish={onFinish} layout='vertical' size='large'>
          <Row gutter={22}>
            <Col span={12}>
              <Form.Item label="Applicant's Name" name="name" rules={[{required: true, message: "Applicant name is required!"}]}>
                <Input placeholder="Applicant's Name"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Phone Number" name="phone_number" rules={[{required: true, message: "Applicant phone number is required!"}]}>
                <Input placeholder="Phone Number"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input placeholder="Email"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Degree" name="degree">
                <SearchInput 
                    serverData={getDegrees} 
                    canCreate={true} 
                    placeholder="Degree"
                    create={(value) => {postDegree({name: value})}}/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Linkedin" name="linkidin_profile">
                <Input placeholder="Linkedin Profile"/>
              </Form.Item>
            </Col>
            <Col span={24} />
            <Col span={12}>
              <Divider orientation='left'>Job</Divider>
              <Form.Item label="Department" name="department_id">
                <SearchInput placeholder="Applied Job" serverData={getDepartments}/>
              </Form.Item>
              <Form.Item label="Applied Job" name="job_position_id" rules={[{required: true, message: "Job Position is required!"}]}>
                <SearchInput placeholder="Applied Job" serverData={getJopPositions}/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Divider orientation='left'>Contract</Divider>
              <Form.Item label="Expected Salary" name="expected_salary">
                <InputNumber className='w-full' placeholder="Expected Salary" suffix="Br"/>
              </Form.Item>
              <Form.Item label="Proposed Salary" name="proposed_salary">
                <InputNumber className='w-full' placeholder="Proposed Salary" suffix="Br"/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Flex gap={10} className='py-3' justify='end'>
        <Button onClick={() => {navigate(-1)}}>Cancel</Button>
        <Button type='primary' onClick={() => {form.submit(); navigate(-1);}}>Save Close</Button>
      </Flex>

    </Layout.Content>
    </>
  )
}

export default NewApplication;