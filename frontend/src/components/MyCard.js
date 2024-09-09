import React from 'react'
import MyTypography from './MyTypography'
import { theme } from 'antd';

export default function MyCard({ title, children, className }) {
  const { token } = theme.useToken();

    const cardStyle = {
        borderRadius: token.borderRadiusLG, 
        backgroundColor: "white",
        padding: "16px 16px",
    }

  return (
    <div className={className} style={cardStyle}>
        {title && <MyTypography level={4} className="mb-3">{title}</MyTypography>}
        {children}
    </div>
  )
}
