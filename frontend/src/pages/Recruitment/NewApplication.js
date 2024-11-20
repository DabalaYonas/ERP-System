import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Divider, Flex, Form, Input, InputNumber, Layout, message, Row, Skeleton, Steps, Typography } from 'antd';
import { PlusCircleOutlined } from "@ant-design/icons";
import SearchInput from '../../components/SearchInput';
import { getJopPositions } from '../../services/handleJopPosition';
import { getDepartments } from '../../services/handleDepartment';
import { getDegrees, getStages, postDegree } from '../../services/handleLookupDatas';
import { getApplication, getRecruitment, postApplicant, postApplication, putApplicant, putApplication } from '../../services/handleRecruitment';
import { useNavigate, useParams } from 'react-router-dom';
import Error404 from '../Error404';
import PageTitle from '../../components/PageTitle';
import MyTypography from '../../components/MyTypography';
import EmployeeTab from '../../components/employee/EmployeeTab';
import API from '../../services/api';

function NewApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const [stages, setStages] = useState();
  const [application, setApplication] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appParams, setAppParams] = useState(null);
  const [recrtParams, setRecrtParams] = useState(null);
  const [submitValues, setSubmitValues] = useState(null);
  const [form] = Form.useForm();
  const params = useParams();
  const recruitmentID = params["recruitmentID"];
  const applicationID = params["applicationID"];
  const navigate = useNavigate();

  const isNewApplicationUrl = () => {
    return applicationID.toLowerCase() === "new-application";
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
          
          setCurrentStep(application.stage_id - 1);
          
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
        setInitialValues({job_position_id: recrt.job_position_name});
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
        formData.append("stage_id", stages[currentStep].id);

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

  if (loading) {
    return <Skeleton />
  } else if (!application && !isNewApplicationUrl()) {
    return <Error404 />
  }

  const FormCard = () => (
    <Card>
      <Form className='mt-3' initialValues={initialValues} form={form} onFinish={onFinish} layout='vertical' size='large'>
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
              <SearchInput disabled placeholder="Applied Job" serverData={getJopPositions}/>
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
    )

  const onRefuse = async() => {
    try {
      await API.delete(`/recruitment/application/api/${applicationID}/`, {withCredentials: true});
      navigate(-1);
    } catch (error) {
      message.success("Can't refused this employee");
    }
  }

  const onCreate = () => {
    form.validateFields().then(values => {
      setSubmitValues(values);
    }).catch(error => {
      console.error(error);
    });
  }
  
  if (submitValues) {
    return <>
      <PageTitle backable/>
      
      <Card>
        <EmployeeTab initialValue={submitValues} />
      </Card>
      </>
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
      <MyTypography level={4}>{application ? application.recruitment.job_position_name : "New Application"}</MyTypography>
    </Flex>
    
    <Flex align='center' gap={50} className='custom-scroll py-2 overflow-y-auto'>
      <Flex gap="small">
      {currentStep == 5 ? <Button onClick={onCreate}>Create Employee</Button> :
        <Button onClick={onRefuse} danger>Refuse</Button>}
      </Flex>

      <Steps 
        type='navigation'
        size='small'
        items={stages}
        onChange={(value) => {setCurrentStep(value)}}
        current={currentStep}/>

    </Flex>

    {currentStep == 5 ? <Badge.Ribbon className='px-8 py-1 font-medium text-xl lett tracking-normal' color='green' text="HIRED">
      <FormCard />
    </Badge.Ribbon> : <FormCard />}

      <Flex className='mt-2' gap={10} justify='end'>
        <Button onClick={() => {navigate(-1)}}>Cancel</Button>
        <Button type='primary' onClick={() => {form.submit(); navigate(-1);}}>Save Close</Button>
      </Flex>
    </>
  )
}

export default NewApplication;