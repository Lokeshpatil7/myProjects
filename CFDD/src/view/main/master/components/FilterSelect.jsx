import React from "react";
import { Select } from "antd";

const { Option } = Select;

const FilterSelect = ({
  placeholder,
  options,
  label,
  value,
  onChange,
  selectedValue,
}) => {
  return (
    <div>
      <Select
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={onChange}
        value={selectedValue}
      >
        {options.map((item, index) => {
          return (
            <Option key={index} value={item[value]}>
              {item[label]}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default FilterSelect;
