import React from 'react'
import MyTypography from './MyTypography'
import { Flex, Space, theme } from 'antd';

export default function MyCard({ header, title, children, className, style }) {
  const { token } = theme.useToken();

    const cardStyle = {
        width: "100%",
        borderRadius: token.borderRadiusLG, 
        backgroundColor: "white",
        padding: "18px 18px",
        ...style
    }

  return (
    <Space direction='vertical' size="small" className={className} style={cardStyle}>
        {header ? <Flex align='center' justify='space-between'>
          <MyTypography level={4} className="mb-3">{title}</MyTypography> 
          {header}
        </Flex> : title && <MyTypography level={4} className="mb-3">{title}</MyTypography>}

        {children}
    </Space>
  )
}
