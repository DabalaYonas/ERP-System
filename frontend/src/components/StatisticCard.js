import { Card, Flex, Statistic, Tag } from 'antd'
import React from 'react'
import { RiseOutlined, FallOutlined} from "@ant-design/icons";

export default function StatisticCard({ title, value, icon, suffix, prefix, percent, decline = false}) {
    return <Card className='flex-1 cursor-default' style={{ minWidth: 300}}>
    <Flex justify='space-between'>
      <Statistic 
        title={<h3 className='text-base font-medium black-text'>
          {icon && <Tag className='px-2 py-1 text-base' color='blue'>{icon}</Tag>}
          {title}</h3>}
        value={value}
        suffix={suffix}
        prefix={prefix}
        valueStyle={{ color: '#3a3a3a', fontWeight: '600', fontSize: 26}}/>
  
        {/* <p className={`ml-4 self-end ${decline ? "text-red-500" : "text-green-500"} text-base`}>{decline ? <FallOutlined /> : <RiseOutlined />} {percent}%</p> */}
        <Tag className='self-end' color={`${decline ? "red" : "green"}`}>{decline ? <FallOutlined /> : <RiseOutlined />} {percent}%</Tag>
      </Flex>
  </Card>
}
