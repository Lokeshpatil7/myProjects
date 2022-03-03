import React, { useEffect } from "react";
import { Menu, Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import './tableStyle.css'

export const MyMenu = ({ actionsList }) => {
  useEffect(() => {
    if (actionsList && actionsList.at(-1)) {
      return { backgroundColor: "red" };
    }
  }, [actionsList]);

  return (
    <Menu
      style={{
        backgroundColor: "white",
        boxShadow: "1px 2px 10px lightgray",
      }}
    >
      {actionsList.map((item, index) => {
        return (
          <Menu.Item key={index} style={cls.ant_menu_item_selected}>
            {/* <main className="moreOptions-selected"> */}
            <div onClick={() => item.onClick()}>{item.label}</div>

            {/* </main> */}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

function MoreOptions({ actionsList }) {
  return (
    <>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            overlay={<MyMenu actionsList={actionsList} />}
            placement="bottomRight"
            dropdownStyle={{ backgroundColor: "green" }}
          >
            <div>
              <MoreOutlined
                style={cls.moreIcon}
              />
            </div>
          </Dropdown>
        </Space>
      </Space>
    </>
  );
}

export default MoreOptions;

const cls = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  moreIcon: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
    border: "1px solid black",
    borderRadius: "50px",
    transform: `rotate(90deg)`,
  },
};
