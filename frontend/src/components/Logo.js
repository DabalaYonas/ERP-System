import React from 'react'
import logo from '../logo_no_txt.png';

export default function Logo() {
  return (
    <div className='p-4 flex justify-center'>
        <img src={logo} className='w-16' />
    </div>
  )
}
