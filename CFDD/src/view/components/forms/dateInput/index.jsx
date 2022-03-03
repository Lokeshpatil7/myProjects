import { DatePicker } from "antd";
import React from "react";
import { RiCalendarLine } from "react-icons/ri";

const DateInput = ({
  placeholder,
  label = "",
  value = "",
  onChange = () => {},
}) => {
  const dateFormat = "DD/MM/YYYY";

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <label>{label}</label>
      </div>
      <div style={{ width: "100%" }}>
        <DatePicker
          onChange={onChange}
          value={value}
          name={label}
          placeholder={placeholder}
          format={dateFormat}
          suffixIcon={
            <RiCalendarLine className="remix-icon da-text-color-black-100" />
          }
        />
      </div>
    </div>
  );
};

export default DateInput;
