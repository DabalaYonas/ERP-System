import { AutoComplete, message } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const fetch = (text, serverData, callback, canCreate, canCreateEdit) => {
    
    serverData().then(response => {
        const results = response.filter(data => data.name ? data.name.toLowerCase().startsWith(text.toLowerCase()) : data.accountNo.startsWith(text.toLowerCase()));
  
          const data = results.map((item) => ({
            value: item.id,
            label:  item.name ? item.name : item.accountNo,
          }));

        const match = response.filter(data => data.name ? data.name.toLowerCase().startsWith(text.toLowerCase()) : data.accountNo.startsWith(text.toLowerCase()));
        if (!(match.length > 0 || text === "")) {
          
          if (canCreate) {
            data.push({value: "create", label: `Create "${text}"`});
          }
          
          if (canCreateEdit) {
            data.push({value: "createEdit", label: `Create and edit "${text}"`});
          }
        }
          
        callback(data);
    });
}

const fetchData = (serverData, callback) => {
    serverData().then(response => {
        const data = response.map((item) => ({
            value: item.id,
            label: item.name ? item.name : item.accountNo ? item.accountNo : item.code,
          }));

        callback(data);
    });
}

function sliceText(text, startText) {
  const startIndex = text.indexOf(startText) + startText.length;
  const endIndex = text.length-1;

  if (startIndex !== -1 && endIndex !== -1) {
    return text.substring(startIndex, endIndex);
  } else {
    return null;
  }
}

const SearchInput = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const [options, setOptions] = useState([]);
    
    useEffect(() => {      
      try {
        fetchData(props.serverData, setOptions);
        
        setValue(props.value);
      } catch (error) {
        console.error(error);
      }
    }, []); 

    useEffect(() => {
      const selectedOption = options.find(option => option.value === props.value);
      if (selectedOption) {
        setValue(selectedOption.label);
      } 
      
    }, [value, options]);

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      setValue: (val) => setValue(val),
    }));

    const handlerSelect = (data, opt) => {
          const newLabel = sliceText(opt.label, "\"");          
            switch (data) {
              case "create":
                setValue(newLabel);
                props.onChange(newLabel);
                props.create(newLabel);
                message.success(newLabel + " is created!");
                break;
              case "createEdit":
                setValue(newLabel);
                props.onChange(newLabel);
                props.createEdit(newLabel); 
                break;
            
              default:                
                setValue(opt.label);
                break;
            }
            
        props.onSelect && props.onSelect(opt);        
    };

    const handleSearch = (text) => {
        // fetch(text, props.serverData, setOptions, props.canCreate, props.canCreateEdit);
    };

    const handleChange = (value) => {
      
      setValue(value);      
      if (props.onChange) {
        props.onChange(value);
      }      
    };
  
    return (
    <AutoComplete
        disabled={props.disabled}
        value={value}
        onChange={handleChange}
        onSelect={handlerSelect}
        options={options}
        filterOption={(inputValue, option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        }
        onSearch={handleSearch}
        placeholder={props.placeholder}/>);
});

export default SearchInput;