import { Flex } from 'antd'
import React, { useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import dayjs from "dayjs";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

export default function PageTitle({title, descrTitle, descr, descrIcon, items, backable}) {
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
      <Flex gap="large" align='center'>
        {backable && <Link to={-1}>
                          <p className='my-2 text-primary-600 text-lg hover:text-primary-400'>
                            <LeftOutlined className='mr-1'/> back
                          </p>
                      </Link>}

          <h2 className='font-medium text-black text-opacity-75' style={{fontSize: 26}}>{title}</h2>
          {descr && <Flex align='center' gap="small">
            <div className='border h-6 mr-2 bg-black bg-opacity-40'/>
            {descrIcon && <p className='text-base text-black text-opacity-60'>{descrIcon}</p>}
            {descr && <p className='text-base font-normal'>
              <span className='text-black text-opacity-60'>{descrTitle}: </span> {descr}</p>}
          </Flex>}
      </Flex>

      <Breadcrumbs items={items} />
    </Flex>

      <p className='text-base black-text' style={{wordSpacing: 2}}>{time.format(formDate)}</p>
  </Flex>
</>
}
