import { Button } from 'antd'
import React from 'react'
import { PlusCircleOutlined } from "@ant-design/icons";

export default function NewButton({children = "New", onClick, type = "primary"}, size="middle") {
  return (
    <Button type={type} size={size} icon={<PlusCircleOutlined />} onClick={onClick}>{children}</Button>
  )
}
