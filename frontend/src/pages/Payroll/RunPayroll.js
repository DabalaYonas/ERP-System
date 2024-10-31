import { Button, Card, Descriptions, Divider, Flex, Form, Input, InputNumber, message, notification, Pagination, Popconfirm, Space, Steps, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { CalendarOutlined, EditOutlined, FileDoneOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
import PageTitle from '../../components/PageTitle';
import { Footer } from 'antd/es/layout/layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StatisticCard from '../../components/StatisticCard';
import MyCard from '../../components/MyCard';
import SalaryPieChart from '../../components/payroll/run payroll/SalaryChart';
import dayjs from 'dayjs';
import axios from 'axios';
import { formatCurrency } from '../../utils/formatCurrency';
import InputMoney from '../../components/InputMoney';
const { Header, Content, Sider } = Layout;

const calcIncomeTax = (taxable_income) => { 
  if(taxable_income < 600)
      return 0
  else if(taxable_income < 1651)
      return taxable_income * 0.1 - 60
  
  else if(taxable_income < 3201)
      return taxable_income * 0.15 - 142.5
  
  else if(taxable_income < 5251)
      return taxable_income * 0.2 - 302.5
  
  else if(taxable_income < 7801)
      return taxable_income * 0.25 - 565
  
  else if(taxable_income < 10900)
      return taxable_income * 0.3 - 955
  
  else if(taxable_income > 10900)
      return taxable_income * 0.35 - 1500

  return 0
}

const ListEmployeeContent = ({dataSource, loading, selectedRowKeys, setSelectedRowKeys}) => {

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      dataIndex: "name",
      title: "Employee",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      dataIndex: "total_hour",
      title: "Total Hour",
      sorter: (a, b) => a.total_hour - b.total_hour,
      render: (_, {total_hour}) => {
        return <p>{dayjs().set("hour", total_hour).format("HH:mm")} hr</p>
      }
    },
    {
      dataIndex: "overtime",
      title: "Overtime",
      sorter: (a, b) => a.overtime - b.overtime,
      render: (_, {overtime}) => {
        return <p>{dayjs().set("hour", overtime).format("HH:mm")} hr</p>
      }
    },
    {
      dataIndex: "department",
      title: "Department",
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
    {
      dataIndex: "job_position",
      title: "Job Position",
      sorter: (a, b) => a.job_position.localeCompare(b.job_position),
    },
  ]

  return <Table 
        loading={loading}
        rowSelection={rowSelection}
        pagination={false}
        dataSource={dataSource}
        columns={columns} />
}

const EmployeeAllowances = ({dataSource, setDataSource}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      dataIndex: "name",
      title: "Employee",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      dataIndex: "non_tax_transp_allow",
      title: "Non taxable Transport Allowance",
      width: 180,
      editable: true,
      sorter: (a, b) => a.non_tax_transp_allow - b.non_tax_transp_allow,
      render: (_, {non_tax_transp_allow}) => {
        return formatCurrency(non_tax_transp_allow) + " Br"
      }
    },
    {
      dataIndex: "transp_allow",
      title: "Taxable Transport Allowance",
      width: 200,
      editable: true,
      sorter: (a, b) => a.transp_allow - b.transp_allow,
      render: (_, {transp_allow}) => {
        return formatCurrency(transp_allow) + " Br"
      }
    },
    {
      dataIndex: "tele_allow",
      title: "Telephone allowance taxable",
      width: 200,
      editable: true,
      sorter: (a, b) => a.tele_allow - b.tele_allow,
      render: (_, {tele_allow}) => {
        return formatCurrency(tele_allow) + " Br"
      }
    },
    {
      dataIndex: "pos_allow",
      title: "Position Allowance Taxable",
      width: 200,
      editable: true,
      sorter: (a, b) => a.pos_allow - b.pos_allow,
      render: (_, {pos_allow}) => {
        return formatCurrency(pos_allow) + " Br"
      }
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined className=' cursor-pointer hover:text-blue-950 text-base'/>
          </a>
        );
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <InputMoney />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  
  return <Form form={form} component={false}>
      <Table 
        components={{
            body: {
              cell: EditableCell,
            },
          }}
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false} />
      </Form>
}

const TotalDeductions = ({dataSource, setDataSource}) => {
  const [form] = Form.useForm();
  
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });

    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
    }
    
  };

  const columns = [
    {
      dataIndex: "name",
      title: "Employee",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      dataIndex: "penalty",
      title: "Penalty",
      width: 200,
      editable: true,
      sorter: (a, b) => a.penalty - b.penalty,
      render: (_, {penalty}) => {
        return formatCurrency(penalty) + " Br"
      }
    },
    {
      dataIndex: "staff_loan",
      title: "Staff loan",
      width: 200,
      editable: true,
      sorter: (a, b) => a.staff_loan - b.staff_loan,
      render: (_, {staff_loan}) => {
        return formatCurrency(staff_loan) + " Br"
      }
    },
    {
      dataIndex: "cost_sharing",
      title: "Cost sharing",
      width: 200,
      editable: true,
      sorter: (a, b) => a.cost_sharing - b.cost_sharing,
      render: (_, {cost_sharing}) => {
        return formatCurrency(cost_sharing) + " Br"
      }
    },
    {
      dataIndex: "other_deductions",
      title: "Other deductions",
      width: 200,
      editable: true,
      sorter: (a, b) => a.other_deductions - b.other_deductions,
      render: (_, {other_deductions}) => {
        return formatCurrency(other_deductions) + " Br"
      }
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined className=' cursor-pointer hover:text-blue-950 text-base'/>
          </a>
        );
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <InputMoney />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  
  return <Form form={form} component={false}>
      <Table 
        components={{
            body: {
              cell: EditableCell,
            },
          }}
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false} />
      </Form>
}

const ReviewPayroll = ({dataSource, setDataSource, month}) => {
    
  useEffect(() => {
    const newData = dataSource.map((item) => {
      const gross_earning = parseFloat(item.basic_salary) 
                          + parseFloat(item.non_tax_transp_allow) 
                          + parseFloat(item.transp_allow) 
                          + parseFloat(item.tele_allow) 
                          + parseFloat(item.pos_allow)
                          + parseFloat(item.overtime);

        const taxable_income = parseFloat(item.basic_salary) 
                          + parseFloat(item.transp_allow) 
                          + parseFloat(item.tele_allow) 
                          + parseFloat(item.pos_allow) 
                          + parseFloat(item.overtime);

        const income_tax = calcIncomeTax(taxable_income);

        const total_deduction = parseFloat(income_tax)
                          + parseFloat(item.staff_loan) 
                          + parseFloat(item.pension_7)
                          + parseFloat(item.other_deductions) 
                          + parseFloat(item.cost_sharing)
                          + parseFloat(item.penalty);

        const net_pay = parseFloat(gross_earning) - parseFloat(total_deduction)
      return {
        ...item,
        gross_earning: gross_earning,
        tax_income: taxable_income,
        income_tax: income_tax,
        total_deduction: total_deduction,
        net_pay: net_pay,
      }
  });

  setDataSource(newData);
  }, []);

  const columns = [
     {
      title: "Employee details",
      children: [
          {
              title: "Name",
              dataIndex: "name",
              width: 250,
              fixed: "left",
          }
      ]
     },
     {
      title: "Earnings",
      children: [
          {
              title: "Basic Salary",
              dataIndex: "basic_salary",
              width: 150,
              sorter: (a, b) => a.basic_salary - b.basic_salary,
              render: (value, _) => {
                  const money = formatCurrency(value);
                  return <p>{money} Br</p>
              }
          },
          {
              title: "Gross Earning",
              dataIndex: "gross_earning",
              width: 150,
              sorter: (a, b) => a.gross_earning - b.gross_earning,
              render: (_, {gross_earning}) => {                            
                  return <p>{formatCurrency(gross_earning)} Br</p>
              }
          },
          {
              title: "Taxable Income",
              dataIndex: "tax_income",
              width: 150,
              sorter: (a, b) => a.tax_income - b.tax_income,
              render: (_, {tax_income}) => {
                  return <p>{formatCurrency(tax_income)} Br</p>
              }
          },
      ]
     },
     {
      title: "Deductions",
      children: [
          {
              title: "Income Tax",
              dataIndex: "income_tax",
              width: 150,
              sorter: (a, b) => a.income_tax - b.income_tax,
              render: (_, {income_tax}) => {
                  return <p>{formatCurrency(income_tax)} Br</p>
              }
          },
          {
              title: "Total Deduction",
              dataIndex: "total_deduction",
              width: 150,
              sorter: (a, b) => a.total_deduction - b.total_deduction,
              render: (_, {total_deduction}) => {
                  return <p>{formatCurrency(total_deduction)} Br</p>
              }
          },
      ]
     },
     {
         title: "Net Pay",
         dataIndex: "net_pay",
         width: 150,
         fixed: "right",
         sorter: (a, b) => a.net_pay - b.net_pay,
         render: (_, {net_pay}) => {
          return <p>{formatCurrency(net_pay)} Br</p>
         }
     },
  ];

  const footerRender = () => {
      const FooterTitle = ({children}) => (
          <p className='text-black text-opacity-75 text-sm'>{children}</p>
      )
      const FooterDesc = ({children}) => (
          <span className='text-black text-opacity-85 font-medium text-base'>{children}</span>
      )
      return <Flex justify='space-between' gap="large">
          <div>
              <FooterTitle>Total employees</FooterTitle>
              <FooterDesc>{dataSource.length}</FooterDesc>
          </div>
          
          <div>
              <FooterTitle>Total basic salary</FooterTitle>
              <FooterDesc>{dataSource.reduce((tot, data) => tot + data.basic_salary, 0)} Br</FooterDesc>
          </div>
          
          <div>
              <FooterTitle>Total gross earning</FooterTitle>
              <FooterDesc>{dataSource.reduce((tot, data) => tot + data.gross_earning, 0)} Br</FooterDesc>
          </div>
          
          <div>
              <FooterTitle>Total taxable income</FooterTitle>
              <FooterDesc>{dataSource.reduce((tot, data) => tot + data.tax_income, 0)} Br</FooterDesc>
          </div>
          
          <div>
              <FooterTitle>Total deductions</FooterTitle>
              <FooterDesc>{dataSource.reduce((tot, data) => tot + data.total_deduction, 0)} Br</FooterDesc>
          </div>
          
          <div>
              <FooterTitle>Total amount</FooterTitle>
              <FooterDesc>{dataSource.reduce((tot, data) => tot + data.net_pay, 0)} Br</FooterDesc>
          </div>
      </Flex>
  }

return <Space className='w-full' size='middle' direction='vertical'>
  <div className='bg-primary-200'>
      <Space direction='vertical' size="small" className='p-7'>
        <h3 className='text-3xl font-medium text-black'>{formatCurrency(dataSource.reduce((tot, data) => tot + data.net_pay, 0))} Br</h3>
        <p className='text-sm text-black text-opacity-85'>On {dayjs().set("month", month).format("MMMM")} 30th, and {dataSource.length} employee will be paid at 1st Aug</p>
      </Space>
    </div>
    
      <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
          footer={footerRender}
          />
  </Space>
}

const FinishPayroll = () => {

  return <Space className='w-full' size="middle" direction='vertical'>
    <Space size="middle">
      <StatisticCard title="Total Payroll" value={403828} prefix="Br" icon={<FileDoneOutlined />} />
      <StatisticCard title="Payroll Draft Date" value="Jul 29 2024" notMoney icon={<CarryOutOutlined />} />
    </Space>

    <MyCard header={<Button>View full report</Button>} title="What your company pays" className='mb-4'>
      <Flex className='w-full' justify='space-between'>
        <SalaryPieChart />
        <img width={400} src='/printing_invoices.svg' />
      </Flex>
    </MyCard>
  </Space>
}

function RunPayroll({setShowPayrollNotification}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const {month, year} = useParams(); 
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const payPeriod = dayjs().set("year", year).set("month", month).format("MMMM YYYY");

  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/payroll/api/employee-list?payPeriod=${payPeriod}`, {withCredentials: true});
            const datas = response.data.map(data => ({
                key: data.employee.id,
                name: data.employee.name,
                total_hour: data.total_hours,
                overtime: data.total_overtime,
                department: data.employee.department.name,
                job_position: data.employee.job_position.name,
                
                non_tax_transp_allow: data.employee.non_tax_transp_allow,
                transp_allow: data.employee.transp_allow,
                tele_allow: data.employee.tele_allow,
                pos_allow: data.employee.pos_allow,

                penalty: 0,
                staff_loan: data.employee.staff_loan,
                cost_sharing: data.employee.cost_sharing,
                other_deductions: data.employee.other_deductions,
                pension_7: 0,

                basic_salary: data.employee.basic_salary,
                gross_earning: 0,
                tax_income: 0,
                income_tax: 0,
                total_deduction: 0,
                net_pay: 0,
                action: true,
            }));
            
            setDataSource(datas);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
  }, []);

  const steps = [
    {
      title: "Employee List",
      description: "Select employee to include in this payroll",
      withSearch: true,
      content: <ListEmployeeContent dataSource={dataSource} loading={loading} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />,
    },
    {
      title: "Employee Allowances",
      description: "Check employee allowances",
      content: <EmployeeAllowances dataSource={dataSource.filter(data => (selectedRowKeys.includes(data.key)))} setDataSource={setDataSource} />,
    },
    {
      title: "Total Deductions",
      description: "Check employee penalty, staff loan, cost sharing, other deductions",
      content: <TotalDeductions setDataSource={setDataSource} dataSource={dataSource.filter(data => (selectedRowKeys.includes(data.key)))} />,
    },
    {
      title: "Review Payroll",
      description: "Please spend a brief moment reviewing this numbers, allowances and deductions",
      content: <ReviewPayroll month={month} setDataSource={setDataSource} dataSource={dataSource.filter(data => (selectedRowKeys.includes(data.key)))}  />,
    },
    {
      title: "Payroll Submitted",
      description: "Please spend a brief moment reviewing this numbers, allowances and deductions",
      content: <FinishPayroll />,
    },
  ];
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleOnClickNext = () => {
    setCurrent(current + 1);
  }

  const handleOnClickPrev = () => {
    setCurrent(current - 1);
  }

  const handleFinish = async() => {
    const payrollsData = dataSource.map((data) => ({
      id: data.key,
      non_tax_transp_allow: data.non_tax_transp_allow,
      transp_allow: data.transp_allow,
      tele_allow: data.tele_allow,
      pos_allow: data.pos_allow,
      penalty: data.penalty,
      staff_loan: data.staff_loan,
      cost_sharing: data.cost_sharing,
      other_deductions: data.other_deductions,
    }));
    
    await axios.post(`http://127.0.0.1:8000/payroll/api/submit/`, 
      {payrollsData: payrollsData, 
          payPeriod: payPeriod}, 
          {withCredentials: true})
          .then(data => {
            setShowPayrollNotification(true);
            navigate("/payroll"); 
          })
          .catch(errInfo => {
            message.error("Can't run this payroll!");
            console.error(errInfo);
          });
  }

  return <>
    <Layout className='min-h-lvh'>
      <Header
        className='border-b sticky top-0 z-10'
        style={{
          background: colorBgContainer,
        }}
      >
        <div className='w-full'>
          <PageTitle backable title="Run Payroll" descrTitle="Pay period" descr={`${dayjs().set("month", month).format("MMMM")} 01st - 31st`} descrIcon={<CalendarOutlined />}/>
        </div>
      </Header>

      <Layout>
        <Sider
          width={300}
          className='px-7 border-r'
          style={{
            background: colorBgContainer,
          }}>
          <div className='sticky top-20'>
            <Steps
                current={current}
                size='small'
                progressDot
                direction="vertical"
                items={[
                  {
                    title: 'Select Employees',
                    description:'Select your employee and review their working hour'
                  },
                  {
                    title: 'Employee Allowances',
                    description: "Review all your employee allowances"
                  },
                  {
                    title: 'Total Deductions',
                    description: "Review your employee deductions"
                  },
                  {
                    title: 'Review Payroll',
                    description: "Review your employee net pay"
                  },
                  {
                    title: 'Successful',
                    description: "You successful run your payroll"
                  },
                ]}
              />
          </div>
        </Sider>

        <Layout className='relative'>
          <Content
            className='p-5'
            style={{
              background: colorBgContainer,
            }}>
              <Flex justify='space-between' align='center'>
                <div>
                  {steps[current].title && <h3 className='text-2xl font-medium text-opacity-80'>{steps[current].title}</h3>}
                  {steps[current].description && <p className='text-black text-opacity-40 mb-5'>{steps[current].description}</p>}
                </div>
                {steps[current].withSearch && <Input.Search placeholder='Search Employee' className='w-80 mr-5' enterButton/>}
              </Flex>

              <div>{steps[current].content}</div>
          </Content>
        
          <Footer
            className='border-t z-10 sticky bottom-0 w-full'
            style={{
              padding: 0,
              margin: 0,
              background: colorBgContainer,
            }}>

              {current == 0 && <Flex justify='space-between' align='center' className={`transition-all ${selectedRowKeys.length > 0 && "h-14 opacity-100"} bg-gray-100 cursor-default px-4 opacity-0 h-0 overflow-hidden`}>
                <p>{selectedRowKeys.length} Employee selected</p>
                <Button type='text' onClick={() => {setSelectedRowKeys([])}}>Unselect all</Button>
              </Flex>}

              <Flex justify='space-between' align='center' className='p-5'>
                <Popconfirm title="Are you sure to cancel?" onConfirm={() => {navigate("/payroll")}} okText="Yes" cancelText="No">
                  <Link>Cancel</Link>
                </Popconfirm>
                <Space>
                  {current > 0 && (
                    <Button onClick={handleOnClickPrev} className='px-5'>Previous</Button>
                  )}

                  {current < steps.length - 1 ? (
                    <Button type='primary' disabled={selectedRowKeys.length <= 0} onClick={handleOnClickNext} className='px-5'>Next</Button>
                  ) : <Button type='primary' onClick={handleFinish} className='px-5'>Finish Payroll</Button>}
                  
                </Space>
              </Flex>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  </>
}

export default RunPayroll