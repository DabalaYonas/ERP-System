import { Button, Col, Flex, Form, Row, Space } from 'antd'
import React from 'react'
import SearchInput from '../SearchInput';
import { getJopPositions, postJopPositions } from '../../actions/handleJopPosition';
import { getDepartments, postDepartments } from '../../actions/handleDepartment';

function WorkForm({ disabled, setActiveKey }) {

  const onFinish = (value) => {
    console.log(value);
  }
  
  return (
    <Form 
    size='large'
    disabled={disabled}
    onFinish={onFinish}
    initialValues={{
        remember: true,
        department: 1,
        jop_position: 1,
    }}
    layout='vertical'>
      <Row gutter={20}>
          <Col span={12} className='py-3'>
            <Form.Item label="Department" name="department" className='mb-0'>
              <SearchInput
                placeholder="Department" 
                serverData={getDepartments} 
                canCreate={true} 
                create={(value) => {postDepartments({"name": value, "parentDepartment": null})}}/>  
            </Form.Item>
          </Col>

          <Col span={12} className='py-3'>
            <Form.Item label="Jop Position" name="jop_position" className='mb-0'>
              <SearchInput 
                placeholder="Jop Position" 
                serverData={getJopPositions} 
                canCreate={true} 
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
    </Form>
  )
}

export default WorkForm