import { Button, Flex, Form, Skeleton, Space, Tabs } from 'antd'
import React, { useEffect, useState } from 'react';
import { UserOutlined, FileTextOutlined, FolderOpenOutlined, DollarCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getEmployee, postEmployees, putEmployee } from '../../services/handleEmployee';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PersonalForm from './PersonalForm';
import WorkForm from './WorkForm';
import DocumentForm from './DocumentForm';
import SalaryForm from './SalaryForm';


const profileTabItems = (setActiveKey) => {
  
  return [
    {   key: 1,
        label: 'Personal Informations',
        icon: <UserOutlined />,
        children: <PersonalForm setActiveKey={setActiveKey}/>,
    },
    {   key: 2,
        label: 'Work Informations',
        icon: <FileTextOutlined />,
        children: <WorkForm setActiveKey={setActiveKey}/>,
    },
    {   key: 3,
        label: 'Documents',
        icon: <FolderOpenOutlined />,
        children: <DocumentForm />
    },
    {   key: 4,
        label: 'Salary Informations',
        icon: <DollarCircleOutlined />,
        children: <SalaryForm />
    }
  ]};

function EmployeeTab({disabled = false, initialValue, hasInitial = false}) {
  const [activeKey, setActiveKey] = useState(1);
  const [btnTxt, setBtnTxt] = useState("Next");
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(initialValue);
  const params = useParams();
  const userId = params ? params.userId : null;  
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getEmployee(userId).then(data => {
        data.remember = true;
        data.bdate = dayjs(data.bdate);
        data.profilePic = null;

        data.department_id = data.department && data.department.id;
        data.job_position_id = data.job_position && data.job_position.id;
        // data.bank_acc_id = data.bank_acc && data.bank_acc.id;
        setInitialValues(data);
      });
    }
  }, []);

  const onFinish = async (value) => {
    const formData = new FormData();
    formData.append("name", value.name);
    value.email && formData.append("email", value.email);
    value.phone_number && formData.append("phone_number", value.phone_number);
    value.gender && formData.append("gender", value.gender);
    value.bdate && formData.append("bdate", value.bdate.format("YYYY-MM-DD"));
    
    value.profilePic && formData.append("profilePic", value.profilePic, value.profilePic.name); 
    
    value.department_id && formData.append("department_id", value.department_id);
    value.job_position_id && formData.append("job_position_id", value.job_position_id);
    // const response = value.bank_acc_id ? await axios.post("http://127.0.0.1:8000/lookup/api/bank-account/", {accountNo: value.bank_acc_id}).then(response => response.data) : null;
    // response ? formData.append("bank_acc_id", response.id) : formData.append("bank_acc_id", "");
    value.bank_acc && formData.append("bank_acc", value.bank_acc);

    formData.append("basic_salary", value.basic_salary);
    value.non_tax_transp_allow && formData.append("non_tax_transp_allow", value.non_tax_transp_allow);
    value.transp_allow && formData.append("transp_allow", value.transp_allow);
    value.tele_allow && formData.append("tele_allow", value.tele_allow);
    value.pos_allow && formData.append("pos_allow", value.pos_allow);
    value.staff_loan && formData.append("staff_loan", value.staff_loan);
    value.cost_sharing && formData.append("cost_sharing", value.cost_sharing);
    value.other_deductions && formData.append("other_deductions", value.other_deductions);

    const response = userId ? await putEmployee(formData, userId) : await postEmployees(formData); 
    if (response) {
      navigate(-1);
    }
  }
  
  if (!initialValues && hasInitial) {
    return <Skeleton active></Skeleton>;
  }

  const handleSave = () => {
    const newActiveKey = Math.min(4, activeKey+1);
    setActiveKey(newActiveKey);
    setBtnTxt(newActiveKey < profileTabItems().length ? "Next" : "Save");
    if (activeKey == profileTabItems().length) {
      form.submit();
    }
  }

  return (
      <>
      <Form
        onFinish={onFinish}
        form={form}
        size='large'
        disabled={disabled}
        initialValues={initialValues}
        layout='vertical'>
          
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key); 
          setBtnTxt(key < profileTabItems().length ? "Next" : "Save")}
        }
        defaultActiveKey="personal"
        items={profileTabItems(setActiveKey)}/>

    <Flex className='py-1' justify='end'>
      <Space>
        <Button type='default' onClick={() => {navigate("/employees")}}>Cancel</Button>
        <Button type='primary' onClick={handleSave}>{btnTxt}</Button>
      </Space>
    </Flex>

      </Form>
      
{/* 
      <Modal
          centered
          title="Create Department"
          open={modalDeprOpen}
          onCancel={() => {setModalDeprOpen(false)}}>
            <Form size='large'>
              <Space direction='vertical' size={'middle'} className='flex py-4'>
                <Input placeholder='Department' value={labelDepr} onChange={(text) => {setLabelDepr(text.target.value)}}/>
                <SearchInput
                  placeholder="Parent Department" 
                  style={{width: "100%"}} />
              </Space>
            </Form>
      </Modal>

      <Modal
          centered
          title="Create Job Position"
          open={modalJobPosOpen}
          onCancel={() => {setModalJobPosOpen(false)}}>

            <div className='py-4'>
              <Form size='large'>
                <Input placeholder='Job Position' value={labelJobPos} onChange={(text) => {setLabelJobPos(text.target.value)}}/>
              </Form>
            </div>
      </Modal>   */}
      </>
  )
}

export default EmployeeTab