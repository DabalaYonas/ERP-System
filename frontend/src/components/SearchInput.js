import { AutoComplete } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const fetch = (text, serverData, callback, canCreate) => {
    
    serverData().then(response => {
        const results = response.filter(data => data.name.toLowerCase().startsWith(text.toLowerCase()));
  
          const data = results.map((item) => ({
            value: item.id,
            label: item.name,
          }));

        if (canCreate) {
            const match = response.filter(data => (data.name.toLowerCase() === text.toLowerCase()));
            if (!(match.length > 0 || text === "")) {
                data.push({value: "create", label: `Create \"${text}\"`});
                data.push({value: "createEdit", label: `Create and edit \"${text}\"`});  
            }
        }
          
        callback(data);
    });
}

const fetchData = (serverData, callback) => {
    serverData().then(response => {
        const data = response.map((item) => ({
            value: item.id,
            label: item.name,
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
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
      try {
        fetchData(props.serverData, setOptions);
      } catch (error) {
        console.log(error);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      setValue: (val) => setValue(val),
    }));

    const handlerSelect = (data, opt) => {
        if (props.canCreate) {
            const newLabel = sliceText(opt.label, "\"");
            switch (data) {
              case "create":
                setValue({value: newLabel, text: newLabel});
                props.create(newLabel);
                break;
              case "createEdit":
                setValue({value: newLabel, text: newLabel});
                props.createEdit(newLabel);
                break;
            
              default:
                setValue(opt.label);
                break;
            }
          }
    };

    const handleSearch = (text) => {
        fetch(text, props.serverData, setOptions, props.canCreate);
    };

    const handleChange = (value) => {
      setValue(value);
      if (props.onChange) {
        props.onChange(value);
      }
    };
  
    return (<AutoComplete
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