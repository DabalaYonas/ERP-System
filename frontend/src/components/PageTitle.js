import { Flex } from 'antd'
import React, { useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import dayjs from "dayjs";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

export default function PageTitle({title, descTitle, description, descIcon, items, backable, horizontal}) {
    const [time, setTime] = useState(dayjs());
    const formDate = "DD MMM, YYYY h:mm A";

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(dayjs());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

  return <>
  <Flex align='center' justify='space-between' className='mb-3 cursor-default'>
    <Flex gap={2} vertical>
      <Flex gap={horizontal && "large"} align={horizontal && "center"} vertical={!horizontal}>
        {backable && <Link to={-1}>
                          <p className='my-2 text-primary-600 text-lg hover:text-primary-400'>
                            <LeftOutlined className='mr-1'/> back
                          </p>
                      </Link>}

          <h2 className='font-medium text-black text-opacity-75' style={{fontSize: 26}}>{title}</h2>
          {description && <Flex align='center' gap="small">
            {horizontal && <div className='border h-6 mr-2 bg-black bg-opacity-40'/>}
            
            {descIcon && <p className='text-base text-black text-opacity-60'>{descIcon}</p>}

            {description && <p className='text-base font-normal text-black text-opacity-70'>
              {descTitle && <span className='text-black text-opacity-60'>{descTitle}: </span>} 
              {description}
            </p>}
          </Flex>}
      </Flex>

      <Breadcrumbs items={items} />
    </Flex>

      <p className='text-base black-text' style={{wordSpacing: 2}}>{time.format(formDate)}</p>
  </Flex>
</>
}
