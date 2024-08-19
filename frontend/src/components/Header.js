import React from 'react'
import { Layout, Input, Typography, Flex, Button, Avatar, Row, Col } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { FaBars } from "react-icons/fa";

const { Header } = Layout;

export default function CustomHeader({ collapsed, setCollapsed, colorBgContainer }) {
  return (
    <Header
    style={{
      padding: 0,
      background: colorBgContainer,
    }}>
      <Flex align='center' justify='space-between'>
        <Flex align='center' gap='20px'>
          
          <Button
            type="text"
            icon={<FaBars size={20} className='opacity-60' />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Typography.Title level={3} type='secondary' style={{margin: '0px'}}>Hello, Dabala</Typography.Title>
        </Flex>

        <Flex align='center' style={{marginRight: '50px'}}>
          <Flex align='center'>
            <Row>
              <Col xs={0} md={0} lg={24} className='mr-20'>
                <Input.Search placeholder='Search here' style={{width: '320px', display: "block"}} />
              </Col>
              
              <Col xs={24} md={24} lg={0} className='mr-6'>
                <Button type='primary' shape='circle' icon={<SearchOutlined />}></Button>
              </Col>
            </Row>
          </Flex>

          <Flex align='center' gap='10px' >
            <BellOutlined className='text-base cursor-pointer bg-slate-200 p-2 rounded text-slate-700' />
            <Avatar icon={<UserOutlined />} />
          </Flex>
          
        </Flex>
      </Flex>
  </Header>

  )
}
