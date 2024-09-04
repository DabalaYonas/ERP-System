import React, { useEffect, useState } from 'react'
import { Flex, Avatar, List } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { DescText } from './DecriptionText';
import MyTypography from './MyTypography';

export default function NotificationDropDown({ children, title, items, subTitle, icon, showIcon, onIconClick }) {
    const [open, setOpen] = useState(false);

  const handleClickOutside = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  const handleToggle = (event) => {
    event.stopPropagation();
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }      
  }

  const onClick = (func) => {
    if (func) {
      setOpen(false);
      func()
      return
    }
  }

  return (
  <div className=' relative'>
    
    <div 
      className='cursor-pointer flex select-none' 
      onClick={handleToggle}>

      {children}

    </div>
    
    <div 
      onClick={(e) => e.stopPropagation()}
      className={`notif-card ${open ? 'show' : 'hide'}`}>

        {(title || showIcon) && (<Flex align='center' justify='space-between' className='p-4'>
          <MyTypography level={3}>{title}</MyTypography>
          <div 
            onClick={() => {onClick(onIconClick)}}
            className='flex cursor-pointer text-xl text-black text-opacity-40 hover:text-opacity-60'>
            
            {showIcon && (icon ? icon : <SettingOutlined />)}

          </div>
        </Flex>)}

        {subTitle && <h4 className='text-base font-medium py-1 px-4 text-black text-opacity-95' 
              style={{ backgroundColor: "#f8f9fd"}}>{subTitle}</h4>}
        
        <List
          className='px-4'
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              actions={[<DescText>{item.time}</DescText>]}>
                <List.Item.Meta
                  avatar={item.avatar ? <Avatar src={item.avatar} /> : <Avatar icon={<UserOutlined />} />}
                  title={item.content}>

                </List.Item.Meta>
            </List.Item>
          )}>

        </List>

      </div>

    </div>)
}
