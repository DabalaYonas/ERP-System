import React from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'

function Recruitment() {
  return (
    <>
      <Breadcrumbs items={[
      {
        path: '/recruitment',
        title: 'Recruitment',
      }
    ]} />
    </>
  )
}

export default Recruitment