import React from 'react';

export default function Logo({logo}) {
  return (
    <div className='p-4 flex'>
        <img src={logo ? logo : ""} alt='Logo Image' className='w-16' />
    </div>
  )
}
