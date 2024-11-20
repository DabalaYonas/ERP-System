import { Button, Flex, Input, Table, Avatar, Space, DatePicker, Pagination } from "antd";
import {
    UserOutlined,
    SearchOutlined,
    CloseOutlined,
    FilterFilled,
} from '@ant-design/icons';
import React, { useRef, useState } from "react";
import Highlighter from 'react-highlight-words';
import dayjs from "dayjs";
    
function TableWithEmployee({dataSource, columns, loading, columnOrder, rowSelection}) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [current, setCurrent] = useState(1);
    const pageSize = 5;
    
    const handleChange = (page) => {
      setCurrent(page);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const HighlightedText = (text) => <Highlighter
        highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
        />

    const NameRender = (name, profilePic) => (<Flex gap={14} align="center">
        {profilePic ? (<Avatar className="shrink-0" src={profilePic}></Avatar>) : 
        (<Avatar className="shrink-0"  icon={<UserOutlined />} />)}
        {name}
    </Flex>);

    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
              padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}>
            <Flex justify="space-between" className="mb-1"> 
                <p>{`Search ${dataIndex.replace("_", " ")}`}</p>
                <Button
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => {
                        close();
                    }}
                    >
                </Button>

            </Flex>

            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex.replace("_", " ")}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{
                marginBottom: 8,
                display: 'block',
                }}
            />
            <Space>

            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                  width: 90,
              }}>Search</Button>

            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                  width: 90,
              }}>Clear</Button>

            <Button
              type="link"
              size="small"
              onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
              }}>Filter</Button>
          </Space>
        </div>
      ),

      filterIcon: (filtered) => (
          <SearchOutlined
          style={{
              color: filtered ? '#3b82f6' : undefined,
          }}
          />
      ),

      onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      
      onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
      },

      render: (text, item) => {
          return dataIndex === "employee" ? NameRender(
          searchedColumn === dataIndex ? (HighlightedText(text)) : (text), 
          item.profilePic) : searchedColumn === dataIndex ? (HighlightedText(text)) : (text)
      }
    });  

    const clearFilter = (clearFilters) => {
      clearFilters();
    };

    const newColumns = [
        {
            title: 'Employee',
            dataIndex: 'employee',
            sorter: (a, b) => a.employee.localeCompare(b.employee),
            ...getColumnSearchProps("employee"),
        },
        {
          title: 'Date',
          dataIndex: 'date',
          filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
              style={{
                  padding: 8,
              }}
              onKeyDown={(e) => e.stopPropagation()}>
                <Flex justify="space-between" className="mb-1"> 
                    <p>Filter Date</p>

                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={() => {
                      close();
                  }}></Button>

                </Flex>
                <Space direction="vertical">
                    <DatePicker.RangePicker
                        value={selectedKeys[0] ? [dayjs(selectedKeys[0][0]), dayjs(selectedKeys[0][1])] : []}
                        onChange={dateRange => setSelectedKeys(dateRange ? [dateRange] : [])}
                        format="YYYY-MM-DD"
                      />
                <Space>
                    <Button
                      type="primary"
                      onClick={() => {confirm();}}
                      icon={<FilterFilled />}
                      size="small"
                      style={{
                          width: 90,
                      }}>Filter</Button>

                    <Button
                      onClick={() => clearFilter(clearFilters)}
                      size="small"
                      style={{
                          width: 90,
                      }}>Clear</Button>
                </Space>
                </Space>
              </div>
          ),
          
          onFilter: (value, record) => {
            if (!value[0] || !value[1]) return true;
            
            const recordStartDate = record.startDate;        
            const recordEndDate = record.endDate;        
            
            return recordStartDate.isAfter(value[0]) && recordEndDate.isBefore(value[1]);
          },
        },
        ...columns,
    ]

    const orderedColumns = columnOrder ? columnOrder.map(dataIndex => newColumns.find(col => col.dataIndex === dataIndex)).filter(col => col !== undefined) : newColumns;

    const currentData = dataSource.slice((current - 1) * pageSize, current * pageSize);
    const totalResults = dataSource.length;

    return <>
    
      <Table 
            pagination={false}
            rowSelection={rowSelection}
            dataSource={currentData}
            columns={orderedColumns} 
            loading={loading}/>

      <Flex align='center' justify='space-between' className='mt-4 px-2'>
          <span>
            Showing {totalResults > 0 ? 
              (current - 1) * pageSize + 1 + `-` + Math.min(current * pageSize, totalResults) : 0} of {totalResults} results
          </span>
          <Pagination
              current={current}
              pageSize={pageSize}
              total={totalResults}
              onChange={handleChange}
              showSizeChanger={false}
          />
      </Flex>  
  </>
}

export default TableWithEmployee