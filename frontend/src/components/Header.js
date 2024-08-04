import React from 'react'
import { Layout, Input, Typography, Flex, Button, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  MenuOutlined
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

        <Flex align='center' gap='10rem' style={{marginRight: '50px'}}>
          <Input.Search placeholder='Searc here' style={{width: '280px'}} enterButton/>

          <Flex align='center' gap='10px' >
            <BellOutlined className='text-base cursor-pointer bg-slate-200 p-2 rounded text-slate-700' />
            <Avatar icon={<UserOutlined />} />
          </Flex>
          
        </Flex>
      </Flex>
  </Header>

  )
}
