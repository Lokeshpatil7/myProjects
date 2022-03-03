import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, Checkbox, DatePicker, Space } from "antd";
import { getFilterArr } from "./getfilterArr";
import "./filter.css";
const { RangePicker } = DatePicker;

function FilterDropDown(props) {
  const {
    filterData,
    onFilter,
    label,
    colName,
    calender,
    filterCols = [],
    setfilterCols,
  } = props;

  const [items, setItems] = useState([]);
  useEffect(() => {
    if (filterCols[colName] && filterCols[colName].length === 0) {
      let filterItem = getFilterArr(filterData, colName);
      setItems([...filterItem]);
    }
  }, [filterData, filterCols]);

  const onCheck = (item) => {
    onFilter(item, colName);
  };

  const menu = (
    <Menu>
      {items.map((item, index) => (
        <Menu.Item key={index}>
          <div>
            <Checkbox
              checked={
                filterCols[colName].length > 0 &&
                filterCols[colName].includes(item.text)
              }
              onClick={() => onCheck(item.text)}
            >
              {item.text}
            </Checkbox>
          </div>
        </Menu.Item>
      ))}
      {filterCols[colName] && filterCols[colName].length > 0 && (
        <Menu.Item
          onClick={() => {
            const filterCols_ = filterCols;
            filterCols_[colName] = [];
            setfilterCols({ ...filterCols_ });
          }}
        >
          <div>Reset</div>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div>
      {calender === "" ? (
        // <Dropdown placement="bottomLeft" size={12}>
          <Space  direction="vertical" size={10}>
          <RangePicker/>
          </Space>
        // </Dropdown>
      ) : (
        <Dropdown
          className="mydropdown" //for black border
          overlay={menu}
          placement="bottomLeft"
          arrow
        >
          <Button style={{ marginRight: "10px", whiteSpace: "nowrap" }}>
            <div style={{ fontSize: "12px" }}>{label}</div>
            <span style={{ marginLeft: "10px" }}>
              <DownOutlined />
            </span>
          </Button>
        </Dropdown>
      )}
    </div>
  );
}

export default FilterDropDown;
