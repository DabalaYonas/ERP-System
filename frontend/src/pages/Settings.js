import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Settings() {
  return (
    <>
      <Breadcrumbs items={[
      {
        path: '/settings',
        title: 'Settings',
      }
    ]} />
    </>
  )
}
