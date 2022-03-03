import React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// const myarray = ['hii', 'hello', 'heyyyyyyyyyyyyy']

const MyMenu = ({ actionsList }) => {
  return (
    <>
      <Menu
        style={{
          boxShadow: "1px 1px 10px lightgray",
          zIndex: 999,
          backgroundColor: "white",
        }}
      >
        {actionsList.map((item, index) => {
          return (
            <Menu.Item style={{ backgroundColor: "white" }} key={index}>
              <div onClick={() => item.onClick()}>{item.lable}</div>
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
};

const MoreOptions = ({ actionsList }) => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          // style={{ backgroundColor: 'white' }}
          // trigger={['click']}
          overlay={<MyMenu actionsList={actionsList} />}
          placement="bottomRight"
        >
          <MoreOutlined style={cls.moreIcon} />
        </Dropdown>
      </Space>
    </Space>
  );
};

export default MoreOptions;

const cls = {
  moreIcon: {
    transform: "rotate90deg",
    color: "black",
    fontSize: "15px",
    border: "1px solid black",
    borderRadius: "10px",
  },
};
