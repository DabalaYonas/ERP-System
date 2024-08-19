import { Flex } from 'antd'
import React, { useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import dayjs from "dayjs";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

export default function PageTitle({title, items, backable}) {
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
      <div>
      {backable && <Link to={-1}><p className='mt-4 text-primary-600 text-lg hover:text-primary-400'><LeftOutlined className='mr-1'/> back</p></Link>}
        <h2 className='font-medium black-text' style={{fontSize: 26}}>{title}</h2>
        <Breadcrumbs items={items} />
      </div>

      <p className='text-base black-text' style={{wordSpacing: 2}}>{time.format(formDate)}</p>
  </Flex>
</>
}
