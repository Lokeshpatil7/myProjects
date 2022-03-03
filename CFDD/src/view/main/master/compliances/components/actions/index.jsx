import React, { useEffect } from "react";
import { Menu, Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export const MyMenu = ({ actionsList }) => {
  useEffect(() => {
    if (actionsList && actionsList.at(-1)) {
      return { backgroundColor: "red" };
    }
  }, []);

  return (
    <Menu
      style={{
        backgroundColor: "white",
        boxShadow: "1px 2px 10px lightgray",
        // marginBottom: "-5px",
      }}
    >
      {actionsList.map((item, index) => {
        return (
          <Menu.Item key={index} style={cls.ant_menu_item_selected}>
            <label onClick={() => item.onClick()}>{item.label}</label>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

function MoreOptions({ actionsList }) {
  const [, setModalToShow] = React.useState("");

  // const setShowModel = () => {
  //   setModalToShow("");
  // };
  return (
    <>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown 
            overlay={
              <MyMenu
                setModalToShow={setModalToShow}
                actionsList={actionsList}
              />
            }
            placement="bottomRight"
            dropdownStyle={{ backgroundColor: 'green' }}
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
  ant_menu_item_selected: {
    // background: "#fff !important",
  },
};
