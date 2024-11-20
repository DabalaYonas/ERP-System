import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const ListGrid = () => (
  <Segmented
    options={[
      {
        label: 'List',
        value: 'List',
        icon: <BarsOutlined />,
      },
      {
        label: 'Grid',
        value: 'Grid',
        icon: <AppstoreOutlined />,
      },
    ]}
  />
);
export default ListGrid;