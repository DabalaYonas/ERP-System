import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';


function itemRender(currentRoute, params, items, paths) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;
  
    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link to={`/${paths.join("/")}`}>{currentRoute.title}</Link>
    );
  }

export default function Breadcrumbs({items}) {
  return (
    
    <Breadcrumb
        className='py-4'
        items={items} 
        itemRender={itemRender} 
        separator=">">
    </Breadcrumb>
  )
}
