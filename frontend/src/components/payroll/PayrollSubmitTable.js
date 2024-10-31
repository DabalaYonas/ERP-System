import { Button, Flex, message, Modal, Pagination, Skeleton, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { createStyles } from 'antd-style';
import { formatCurrency } from '../../utils/formatCurrency';
import { ArrowRightOutlined } from "@ant-design/icons";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dayjs from "dayjs";

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
      customTable: css`
        ${antCls}-table {
          ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: unset;
            }
          }
        }
      `,
    };
  });

function PayrollSubmitTable() {
    const { year, month } = useParams();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [current, setCurrent] = useState(1);
    const pageSize = 10;
    const [dataSource, setDataSource] = useState([]);
    const [totalBasic, setTotalBasic] = useState(0);
    const [totalGross, setTotalGross] = useState(0);
    const [totalTaxIncome, setTotalTaxIncome] = useState(0);
    const [totalDeductions, setTotalDeductions] = useState(0);
    const [totalNet, setTotalNet] = useState(0);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const payPeriod = dayjs().set("year", year).set("month", month).format("MMMM YYYY");
    const fetchData = async() => {
        try {            
            const response = await axios.get(`http://127.0.0.1:8000/payroll/api/employee-list?payPeriod=${payPeriod}`, {withCredentials: true});
            const datas = response.data.map(data => ({
                key: data.employee.id,
                id: data.employee.id,
                name: data.employee.name,
                basic_salary: data.basic_salary,
                gross_earning: data.gross_earning,
                tax_income: data.taxable_income,
                income_tax: data.income_tax,
                tot_deduction: data.total_deduction,
                net_pay: data.net_salary,
                action: true,
            }));

            const newTotalBasic = response.data.reduce((tot, data) => tot + data.basic_salary, 0);
            const newTotalGross = response.data.reduce((tot, data) => tot + data.gross_earning, 0);
            const newTotalTaxIncome = response.data.reduce((tot, data) => tot + data.taxable_income, 0);
            const newTotalDeductions = response.data.reduce((tot, data) => tot + data.total_deduction, 0);
            const newTotalNet = response.data.reduce((tot, data) => tot + data.net_salary, 0);

            setTotalBasic(newTotalBasic);
            setTotalGross(newTotalGross);
            setTotalTaxIncome(newTotalTaxIncome);
            setTotalDeductions(newTotalDeductions);
            setTotalNet(newTotalNet);
            
            setDataSource(datas);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
  
    const handleChange = (page) => {
      setCurrent(page);
    };

    const currentData = dataSource.slice((current - 1) * pageSize, current * pageSize);
    const totalResults = dataSource.length;
      
    const columns = [
       {
        title: "Employee details",
        children: [
            {
                title: "ID",
                dataIndex: "id",
                width: 100,
            },
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
                render: (value, _) => {
                    const money = formatCurrency(value);
                    return <p>{money} Br</p>
                }
            },
            {
                title: "Taxable Income",
                dataIndex: "tax_income",
                width: 150,
                sorter: (a, b) => a.tax_income - b.tax_income,
                render: (value, _) => {
                    const money = formatCurrency(value);
                    return <p>{money} Br</p>
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
                render: (value, _) => {
                    const money = formatCurrency(value);
                    return <p>{money} Br</p>
                }
            },
            {
                title: "Total Deduction",
                dataIndex: "tot_deduction",
                width: 150,
                sorter: (a, b) => a.tot_deduction - b.tot_deduction,
                render: (value, _) => {
                    const money = formatCurrency(value);
                    return <p>{money} Br</p>
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
           render: (value, _) => {
               const money = formatCurrency(value);
               return <p>{money} Br</p>
           }
       },
    ];

    const onSelectChange = async(newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

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
                <FooterDesc>{totalBasic} Br</FooterDesc>
            </div>
            
            <div>
                <FooterTitle>Total gross earning</FooterTitle>
                <FooterDesc>{totalGross} Br</FooterDesc>
            </div>
            
            <div>
                <FooterTitle>Total taxable income</FooterTitle>
                <FooterDesc>{totalTaxIncome} Br</FooterDesc>
            </div>
            
            <div>
                <FooterTitle>Total deductions</FooterTitle>
                <FooterDesc>{totalDeductions} Br</FooterDesc>
            </div>
            
            <div>
                <FooterTitle>Total amount</FooterTitle>
                <FooterDesc>{totalNet} Br</FooterDesc>
            </div>
        </Flex>
    }

    const handleSubmit = async() => {
        const employees = dataSource.map((data) => data.id);
        
        try {
            await axios.post(`http://127.0.0.1:8000/payroll/api/submit/`, 
                {employee_ids: employees, 
                    payPeriod: payPeriod}, 
                    {withCredentials: true});

                    fetchData();
                    setOpen(false);
                    message.success("Payroll is successfully submitted!");
        } catch (error) {
            message.error("Can't submit this payroll please check and try again");
            console.error(error);
        }
    }

  return <div>
        <Table 
            loading={loading}
            rowSelection={rowSelection} 
            dataSource={currentData}
            className='custom-scroll'
            columns={columns}
            bordered
            pagination={false}
            footer={footerRender}
            />

            <Flex align='center' justify='space-between' className='mt-4 px-2'>
                <Flex align='center' gap="middle">
                    <span>
                    Showing {(current - 1) * pageSize + 1}-{Math.min(current * pageSize, totalResults)} of {totalResults} results
                    </span>
                    <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={totalResults}
                    onChange={handleChange}
                    showSizeChanger={false}
                    />
                </Flex>
                <Flex justify='end' align='center' gap="large">
                    <p className='text-xl font-medium text-black text-opacity-70'>{totalNet} Br</p>
                    <Button onClick={() => {setOpen(true);}} size='large' iconPosition='end' type='primary' icon={<ArrowRightOutlined />}>Submit payroll</Button>
                </Flex>
            </Flex>

            <Modal
                open={open}
                okText="Submit"
                onOk={handleSubmit}
                onCancel={() => {setOpen(false);}}
                title="Payroll Submit">
                    <p>Are you sure you want to submit the payroll for processing?</p>
                    {/* Once submitted, no further changes can be made. 
                        Please review all employee details and payment amounts carefully before confirming. */}
            </Modal>
    </div>
}

export default PayrollSubmitTable;