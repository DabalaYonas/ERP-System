import { Flex, Input, Table } from 'antd'
import React from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'

function Leave() {
  return (
    <><Breadcrumbs items={[
      {
        path: '/leave',
        title: 'Leave',
      }
    ]} />
    <Flex className='mb-4'>
      <Input.Search placeholder='Search Employee Leave' size='large' />
    </Flex>
    <Table />
    </>
  )
}

export default Leave