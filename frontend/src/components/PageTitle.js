import { Flex } from 'antd'
import React, { useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import dayjs from "dayjs";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

export default function PageTitle({title, items, backable, description}) {
    const [time, setTime] = useState(dayjs());
    const formDate = "DD MMM, YYYY h:mm A";

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(dayjs());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

  return <>
  <Flex align='center' justify='space-between' className='py-3 cursor-default'>
      <Flex gap={2} vertical>
      {backable && <Link to={-1}><p className='mt-4 text-primary-600 text-lg hover:text-primary-400'><LeftOutlined className='mr-1'/> back</p></Link>}
        <h2 className='font-medium text-black text-opacity-75' style={{fontSize: 26}}>{title}</h2>
        {description && <p className='text-black text-opacity-60 text-base font-normal mb-1'>{description}</p>}
        <Breadcrumbs items={items} />
      </Flex>

      <p className='text-base black-text' style={{wordSpacing: 2}}>{time.format(formDate)}</p>
  </Flex>
</>
}
