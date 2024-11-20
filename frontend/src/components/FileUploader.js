import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  beforeUpload(file) {
    return false;
  },
  customRequest(options) {
    const { file, onSuccess } = options;
    console.log("Uploading file:", file);
    setTimeout(() => {
      onSuccess("ok");
      message.success(`${file.name} file uploaded successfully.`);
    }, 1000);
  },

  onChange(info) {
    
  },

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
const FileUploader = ({onChange}) => {

    const handleOnChange = (info) => {
        if (onChange) {
            onChange(info.fileList);
        }
    }

  return <Dragger {...props} onChange={handleOnChange}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
        Upload a supporting document (e.g., medical certificate, family emergency notice)
    </p>
  </Dragger>
};
export default FileUploader;