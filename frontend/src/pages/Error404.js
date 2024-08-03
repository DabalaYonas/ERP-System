import { Button, Flex, Result } from 'antd'
import { Link } from 'react-router-dom';

function Error404() {
  return <>
  <Result
    status="404"
    title="404 - PAGE NOT FOUND"
    subTitle="The page you are looking for might have been removed had its name changed or is temporarily unavailable."
    extra={<Link to='/'><Button type='primary' className='py-5'>GO TO HOMEPAGE</Button></Link>} />
  
  </>
}

export default Error404