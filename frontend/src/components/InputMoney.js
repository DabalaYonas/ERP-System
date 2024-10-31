import { InputNumber } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

const formatNumber = (number) => {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

const InputMoney = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);

    useImperativeHandle(ref, () => ({
        getValue: () => props.value,
        setValue: (val) => setValue(val),
      }));

      const handleChange = (value) => {
        setValue(value);      
        if (props.onChange) {
            props.onChange(value);
        }      
      };  

  return  <InputNumber
                value={value}
                onChange={handleChange}
                formatter={formatNumber}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                className={props.className} suffix={props.suffix} placeholder={props.placeholder} />
});

export default InputMoney