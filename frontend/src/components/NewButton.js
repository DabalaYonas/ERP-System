import { Button } from 'antd'
import React from 'react'
import { PlusCircleOutlined } from "@ant-design/icons";

export default function NewButton({text = "New", onClick, type = "primary"}, size="middle") {
  return (
    <Button type={type} size={size} icon={<PlusCircleOutlined />} onClick={onClick}>{text}</Button>
  )
}
