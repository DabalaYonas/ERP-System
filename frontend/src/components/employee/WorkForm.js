import { AutoComplete, Button, Col, Flex, Form, message, Row, Space } from 'antd'
import React from 'react'
import SearchInput from '../SearchInput';
import { getJopPositions, postJopPositions } from '../../actions/handleJopPosition';
import { getDepartments, postDepartments } from '../../actions/handleDepartment';

function WorkForm({ setActiveKey }) {
  
  return (
    <>
      <Row gutter={20}>
          <Col span={12} className='py-3'>
            <Form.Item label="Department" name="department" className='mb-0'>
              <SearchInput
                placeholder="Department" 
                serverData={getDepartments} 
                canCreate={true} 
                canCreateEdit={false}
                create={(value) => {postDepartments({"name": value, "parentDepartment": null})}}/>  
            </Form.Item>
          </Col>

          <Col span={12} className='py-3'>
            <Form.Item label="Jop Position" name="jop_position" className='mb-0'>
              <SearchInput 
                placeholder="Jop Position" 
                serverData={getJopPositions} 
                canCreate={true}
                canCreateEdit={false}
                create={(value) => {postJopPositions({"name": value})}} />  
            </Form.Item>
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