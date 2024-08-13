import { Card, Flex, Statistic } from 'antd'
import React from 'react'
import { RiseOutlined, FallOutlined } from "@ant-design/icons";

export default function StatisticCard({ title, value, suffix, prefix, percent, decline = false}) {
    return <Card className='flex-1'>
    <Flex justify='space-between'>
      <Statistic 
        title={<h3 className='text-base font-normal text-zinc-500'>{title}</h3>}
        value={value}
        suffix={suffix}
        prefix={prefix}
        valueStyle={{ color: '#3a3a3a', fontWeight: '600', fontSize: 26}}/>
  
        <p className={`ml-4 self-end ${decline ? "text-red-500" : "text-green-500"} text-base`}>{decline ? <FallOutlined /> : <RiseOutlined />} {percent}%</p>
      </Flex>
  </Card>
}
