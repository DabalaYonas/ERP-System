import { Avatar, Flex } from 'antd'
import React from 'react'
import {UserOutlined} from '@ant-design/icons';

export default function NameWithAvatar({name, picture}) {
  return (
    <Flex gap={14} align="center">
        {picture ? (<Avatar className="shrink-0" src={picture}></Avatar>) : (<Avatar className="shrink-0"  icon={<UserOutlined />} />)}
        <p>{name}</p>
    </Flex>
  )
}
