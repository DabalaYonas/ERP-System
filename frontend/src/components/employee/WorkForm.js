import { Button, Col, Flex, Form, InputNumber, Row, Space } from 'antd'
import React from 'react'
import SearchInput from '../SearchInput';
import { getJopPositions, postJopPositions } from '../../services/handleJopPosition';
import { getDepartments, postDepartments } from '../../services/handleDepartment';
import { Link } from 'react-router-dom';

function WorkForm({ setActiveKey }) {
  
  return (
    <>
      <Row gutter={20}>
          <Col span={12} className='py-3'>
            <Form.Item label="Department" name="department_id" className='mb-0'>
              <SearchInput
                placeholder="Department" 
                serverData={getDepartments} 
                canCreate={true} 
                canCreateEdit={false}
                create={(value) => {postDepartments({"name": value, "parentDepartment": null})}}/>  
            </Form.Item>
          </Col>

          <Col span={12} className='py-3'>
            <Form.Item label="Job Position" name="job_position_id" className='mb-0'>
              <SearchInput 
                placeholder="Job Position" 
                serverData={getJopPositions} 
                canCreate={true}
                canCreateEdit={false}
                create={(value) => {postJopPositions({"name": value})}} />  
            </Form.Item>
          </Col>

          <Col span={12} className='py-3'>
            <Form.Item label="Employee ID Number" name="employee_id" className='mb-0'>
              <InputNumber className='w-full' placeholder="Employee ID Number"  />  
            </Form.Item>
            <Link to="id_card/" className='mt-2'>Generat ID Card</Link>
          </Col>
      </Row>
    <Flex className='py-3' justify='end'>
      <Space>
        <Button type='default' onClick={(e) => {setActiveKey("personal");}}>Previos</Button>
        <Button htmlType='sumbit' type='primary'>Save</Button>
      </Space>
    </Flex>
    </>
  )
}

export default WorkForm