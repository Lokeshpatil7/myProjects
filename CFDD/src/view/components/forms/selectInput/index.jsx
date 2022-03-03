import { Select } from "antd";
import React from "react";
const { Option } = Select;

const SelectInput = ({
  placeholder,
  label = "",
  options = [],
  value,
  onChange = () => {},
}) => {
  return (
    <div style={{ marginTop: "41px", width: "100%" }}>
      <Select
        onChange={onChange}
        value={value}
        name={label}
        placeholder={placeholder}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectInput;
