import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'antd';
import { ExportOutlined } from "@ant-design/icons";

const ExportToExcel = ({ tableData, fileName }) => {
  const saveExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return <Button type='primary' onClick={saveExcel} icon={<ExportOutlined />}>Export to Excel</Button>
};

export default ExportToExcel;