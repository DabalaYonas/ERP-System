import { Card, Flex, Space, Statistic, Tag } from 'antd'
import React from 'react'
import { RiseOutlined, FallOutlined} from "@ant-design/icons";
import { formatCurrency } from '../utils/formatCurrency';
import MyCard from './MyCard';

export default function StatisticCard({ title, value, icon, suffix, prefix, percent=false, change, changeLabel, decline = false, notMoney}) {
    return <MyCard className='flex-1 cursor-default rounded-lg' style={{ minWidth: 280}}>
      <Space direction='vertical' size="small" className='w-full'>
      <h3 className='text-base font-medium text-black text-opacity-65'>
          {icon && <Tag className='px-2 py-1 text-sm' color='blue'>{icon}</Tag>}
          {title}</h3>

          <Flex gap="middle" align='center' justify='space-between'>
            <p className='text-black text-opacity-80 text-2xl font-medium'>{prefix} {notMoney ? value : formatCurrency(value)} {suffix}</p>

            {change && 
            <Flex align='center'>
              <Tag color={`${decline ? "red" : "green"}`}>
              {percent && (decline ? <FallOutlined /> : <RiseOutlined />)} {!percent && (decline ? "-" : "+")}{change}{percent && "%"}
              </Tag> <span className='text-black text-opacity-55 text-sm font-medium'>{changeLabel}</span>
            </Flex>}
          </Flex>
          <Flex>

          </Flex>
      </Space>
  </MyCard>
}
