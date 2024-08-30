import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Upload } from 'antd';
import { CameraOutlined, DeleteOutlined } from '@ant-design/icons';

const ImageUpload = forwardRef(({onChange, listType="picture-card"}, ref) => {
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState();
  
    const handleBeforeUpload = (file) => {
      setFileList([file]);
      return false;
    }
  
    const handleChange = (file) => {
      const imgUrl = URL.createObjectURL(file.file);
      
      
      if (onChange) {
        onChange(file.file);
      }
      setImageUrl(imgUrl);
    }
    
    useImperativeHandle(ref, () => ({
      getValue: () => fileList,
      setValue: (val) => setFileList(val),
    }));

  return <>
    <Upload
        fileList={fileList}
        showUploadList={false}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
        listType={listType}>
        {imageUrl ? (<div className='w-full h-full rounded-lg relative bg-gray-100'>
            <DeleteOutlined onClick={(e) => {setImageUrl()}} className='z-50 absolute hover:bg-slate-600 hover:bg-opacity-60 p-1 text-lg top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 opacity-50 hover:opacity-100'/>
            <img src={imageUrl} alt="profile-image" className='object-contain w-full h-full over' />
            </div>) :
        <Button type='text' className=' border-0 bg-none' icon={<CameraOutlined />}> Upload</Button>}
        </Upload>
    </>
});

export default ImageUpload;
