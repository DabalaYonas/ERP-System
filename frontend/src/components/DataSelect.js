import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import API from '../services/api';

const { Option } = Select;

const DataSelect = ({ onChange, value, placeholder, link, name, rules }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useState(() => {
      const fetchData = async() => {
        await API.get(link)
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(errInfo => {
          console.error(errInfo);
        });
      }
  
      fetchData();
    }, []);

    if (loading) {
        return <Spin />
    }

    return (
        <Select
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{ width: '100%' }}>
            {data.map(item => (
                <Option key={item.id} value={item.id}>
                    {item.name}
                </Option>
            ))}
        </Select>
    );
};

export default DataSelect;