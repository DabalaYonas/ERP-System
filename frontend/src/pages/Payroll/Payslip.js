import { Button, Flex, Input, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import PayslipTable from '../../components/payroll/PayslipTable';
  
function Payslip() {

  return (
    <>
        <h3 className='text-2xl font-semibold mb-3 black-text'>Employee Payslip History</h3>
        <Flex className='mb-3' gap={10} justify='space-between'>
            <Input.Search style={{ maxWidth: "420px"}} size='middle' placeholder='Search Employee Payslip' enterButton/>
            <Link to="new-payslip/"><Button size='middle' type='primary'>Create Payslip</Button></Link>
        </Flex>

        <PayslipTable />
    </>
  )
}

export default Payslip