import React, { useRef, useState } from 'react'
import Paper from '../../components/Paper'
import { Button, Flex, Modal, Space, Table, Typography } from "antd";
import PageTitle from '../../components/PageTitle';
import { PhoneOutlined, MailOutlined, LinkOutlined, EnvironmentOutlined, PrinterOutlined } from "@ant-design/icons";
import SignatureCanvas from './SignatureCanvas';

const {Title, Text, Paragraph} = Typography;

const AlignCenter = ({children}) => {
  return <Flex vertical align='center'>{children}</Flex>
}

const FutureBox = ({icon, children}) => {
  return <Flex gap={8} align='center' className='overflow-hidden max-w-44'>
    <div className='cursor-default bg-primary-500 text-white text-lg px-2 py-1'>{icon}</div>
      <Text editable={{triggerType: 'text'}} style={{ fontSize: "8px"}}>{children}</Text>
  </Flex>
}

const CustomTable = ({ column, dataSource, footer }) => {  
  return <table className='border-2 text-xs border-black'>
    <thead>
      <tr>
       { column && column.map((value, index ) => (
        <th key={index} className='border-2 border-black p-1'>{value.title}</th>
       ))
      }
      </tr>
    </thead>
    <tbody>
      {dataSource && dataSource.map((value, index) => (
        <tr key={index}>
          {Object.entries(value).map(([key, value]) => (
            <td key={key} className='border-2 border-black p-1'>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  <tfoot>
    <tr>
      <td colSpan={2} className='font-bold border-2 border-black p-1'>Subtotal:</td>
      {footer && footer.map(({value}, index) => (
        <td className='font-bold border-2 border-black p-1'>{value}</td>
      ))}
    </tr>
  </tfoot>
  </table>
}

const columns = [
  {
    title: 'S.N',
    dataIndex: 'sn',
  },
  {
    title: 'Employee Name',
    dataIndex: 'name',
  },
  {
    title: 'Net Pay',
    dataIndex: 'net_pay',
  },
  {
    title: 'Bank Account',
    dataIndex: 'account',
  },
];

const dataSource = [
  {
    sn: 1,
    name: "Dabala Yonas",
    net_pay: "10,000",
    account: "1000418121037",
  },
  {
    sn: 2,
    name: "Robera Yonas",
    net_pay: "30,000",
    account: "100082315648",
  },
]

const footer = [
  {
    value: "40,000"   
  }
]

const columns2 = [
  {
    title: 'S.N',
    dataIndex: 'sn',
  },
  {
    title: 'Employee Name',
    dataIndex: 'name',
  },
  {
    title: 'Basic Salary',
    dataIndex: 'basic_salary',
  },
  {
    title: 'Non Taxable Allowance',
    dataIndex: 'non_tax_allow',
  },
  {
    title: 'Gross Earning',
    dataIndex: 'gross_earning',
  },
  {
    title: 'Taxable Income',
    dataIndex: 'tax_income',
  },
  {
    title: 'Income Tax',
    dataIndex: 'income_tax',
  },
  {
    title: 'Pension 7%',
    dataIndex: 'pension_7',
  },
  {
    title: 'Pension 11%',
    dataIndex: 'pension_11',
  },
  {
    title: 'Pension 18%',
    dataIndex: 'pension_18',
  },
  {
    title: 'Total Deduction',
    dataIndex: 'total_deduction',
  },
  {
    title: 'Net Pay',
    dataIndex: 'net_pay',
  },
];

const dataSource2 = [
  {
    sn: 1,
    name: "Dabala Yonas",
    basic_salary: "21,000.00",
    non_tax_allow: "2000.00",
    gross_earning: "23,000.00",
    tax_income: "21,000.00",
    income_tax: "6,283.00",
    pension_7: "2,342.00",
    pension_11: "4,928.00",
    pension_18: "7218.00",
    total_deduction: "11,000.00",
    net_pay: "10,000.00",
  },
  {
    sn: 2,
    name: "Robera Yonas",
    basic_salary: "25,200.00",
    non_tax_allow: "2000.00",
    gross_earning: "27,200.00",
    tax_income: "21,000.00",
    income_tax: "6,283.00",
    pension_7: "2,342.00",
    pension_11: "4,928.00",
    pension_18: "7218.00",
    total_deduction: "11,000.00",
    net_pay: "18,000.00",
  },
]

const footer2 = [
  {
    value: "40,000.00"   
  },
  {
    value: "2,000.00"   
  },
  {
    value: "52,000.00"   
  },
  {
    value: "50,000.00"   
  },
  {
    value: "9,200.00"   
  },
  {
    value: "12,123.00"   
  },
  {
    value: "8,600.00"   
  },
  {
    value: "16,000.00"   
  },
  {
    value: "12,392.00"   
  },
  {
    value: "38,293.00"   
  },
]

export default function PayrollPapers() {
  const printRef = useRef();
  const [open, setOpen] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const signCanvasRef = useRef(null);

  const clearSignature = () => {
    if (signCanvasRef.current) {
      signCanvasRef.current.clearCanvas();
    }
  }

  const saveSignature = () => {
    if (signCanvasRef.current) {
      const data = signCanvasRef.current.getSignature();
      setSignatureData(data);
      setOpen(false);
    }
  }

  const handlePrint = () => {
    const printContent = printRef.current;
    const windowPrint = window.open('', '', 'width=800,height=600');
    windowPrint.document.write('<html><head><title>Print</title></head><body>');
    windowPrint.document.write(printContent.innerHTML);
    windowPrint.document.write('</body></html>');
    windowPrint.document.close();
    windowPrint.focus();
    windowPrint.print();
    windowPrint.close();
  };

  return <>
  <PageTitle backable/>
  <Space ref={printRef} className='flex items-center pb-10'
    size="small" 
    direction='vertical'>

    <Paper>
      <Flex justify='space-between' vertical className='h-full w-full'>
        <Flex vertical align='start' gap="large">
          <Typography contentEditable>
            <Flex vertical align='end'>
              <Title level={5}>Ref No/NGT/125/24</Title>
              <Title level={5}>Date: Sep-5, 2024</Title>
            </Flex>

            <Title level={5} underline>Commercial bank of Ethiopia</Title>
            <Title level={5} underline>Adawa Park Branch</Title>
            <Title level={5} underline>A.A</Title>

            <AlignCenter>
              <Title level={5}>Subject:- <Text underline>Request for transfer</Text></Title>
            </AlignCenter>
            <Paragraph>
              We hereby authorized your bank to transfer ETB 181,002.16 (One Hundred Eighty One Thousand Two birr and 16/100) 
              from Next General Trading Account Number (1000372967343) with you To Our employee Listed below with Attached Payroll.
            </Paragraph>
            <Paragraph>
              Thank you in advance for your usual and unreserved cooperation.
            </Paragraph>

            <Space 
              className='mt-24' 
              size='large' 
              direction='vertical'>
                <Text>Regards,</Text>
            </Space>

          </Typography>
          <Flex vertical>
            <img onClick={() => {setOpen(true);}} 
                width={200} 
                height={100} 
                src={signatureData} 
                alt='Signature' 
                className='my-0 hover:bg-primary-500 hover:bg-opacity-15 cursor-pointer outline-none' />
            <Paper.BlankSpace minWidth={150} style='dashed' />
          </Flex>

        </Flex>
        <Flex 
            align='center'
            gap='large' 
            vertical>
          
          <Paper.BlankSpace minWidth={350}/>

          <Flex className='w-full' justify='space-between'>
            <FutureBox
              icon={<EnvironmentOutlined />}>
              Dabi Complex 3rd 004, Near Ramada Hotel, Africa Road, Bole Sub-City, Addis Ababa
            </FutureBox>

            <FutureBox
              icon={<PhoneOutlined />}>
              +251911473611<br/>
              +251911473611
            </FutureBox>

            <FutureBox
              icon={<MailOutlined />}>
              info@ngtechet.com
              nexgenics21@gmail.com
            </FutureBox>

            <FutureBox
              icon={<LinkOutlined />}>
              www.ngtechet.com
            </FutureBox>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
    
    <Paper>
      <AlignCenter>
        <Title 
          className='text-center' 
          level={4} 
          underline>Next General Trading <br/>
        PAYROLL REGISTER (SHEET) - HEAD OFFICE <br/>
        The Month of Aug-2024
        </Title>

        <CustomTable column={columns} dataSource={dataSource} footer={footer}/>

      </AlignCenter>
    </Paper>
    
    <Paper landscape>
        <Title 
          className='text-center' 
          level={4} 
          underline>Next General Trading <br/>
        PAYROLL REGISTER (SHEET) - HEAD OFFICE <br/>
        The Month of Aug-2024
        </Title>

        <CustomTable column={columns2} dataSource={dataSource2} footer={footer2}/>

    </Paper>
<div className='w-full py-3 fixed z-10 bottom-0'>
  <Button type='primary' onClick={handlePrint} icon={<PrinterOutlined />}>Print</Button>
</div>
  </Space>


  <Modal
    okText="Save"
    title="Signature"
    onCancel={() => {setOpen(false)}}
    onOk={saveSignature}
    open={open}>
    <SignatureCanvas ref={signCanvasRef}/>
      <Button className='mt-2' onClick={clearSignature}>Clear</Button>
  </Modal>
  </>
}
