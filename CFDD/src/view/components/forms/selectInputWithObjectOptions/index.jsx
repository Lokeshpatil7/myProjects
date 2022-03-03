import { Select } from "antd";
import React from "react";
const { Option } = Select;

const SelectInputWithObjectOptions = ({
  placeholder,
  label = "",
  options = [],
  value = "",
  keyField,
  valueField,
  isMultiSelect = false,
  onChange = () => {},
}) => {
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <label>{label}</label>
      </div>
      <div style={{ width: "100%" }}>
        <Select
          mode={isMultiSelect ? "multiple" : undefined}
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
            <Option key={option[keyField]} value={option[keyField]}>
              {option[valueField]}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectInputWithObjectOptions;
