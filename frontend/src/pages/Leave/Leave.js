import { Flex, Input, Table } from 'antd'
import React from 'react'
import PageTitle from '../../components/PageTitle'


function Leave() {
  return (
    <>
    <PageTitle title="Employee Leave" items={[
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