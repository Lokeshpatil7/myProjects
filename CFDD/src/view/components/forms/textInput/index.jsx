import React from "react";
import { DatePicker, Input } from "antd";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";
const InputFeild = ({
  label,
  field,
  placeholder,
  value,
  onChange,
  disabled,
  type,
}) => {
  console.log("value", type);
  return (
    <div style={{ marginTop: "20px" }}>
      <label> {label} </label> <br />
      {type === "text" ? (
        <Input
          disabled={disabled}
          value={value}
          onChange={onChange}
          name={field}
          placeholder={placeholder}
          className="underLine"
          type={type}
          //rules={[{ required: true }]}
        />
      ) : (
        <DatePicker
          disabled={disabled}
          value={value}
          onChange={onChange}
          name={field}
          placeholder={placeholder}
          className="underLine"
          defaultValue={moment()}
          format={dateFormat}
          // onChange={(date, dateString) =>
          //   // onChange(date.toDate())
          //   console.log("onchange", date)
          // }
          onChange={(date, dateString, id) => {
            // onChange("2018-01-11T12:32:26.551Z");
            console.log(date.format("YYYY-MM-DD"));
            onChange(date.format("YYYY-MM-DD"));
          }}
        />
      )}
    </div>
  );
};

export default InputFeild;
