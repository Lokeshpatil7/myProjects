import React, { useEffect } from "react";
import { Menu, Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";

// import ViewGroupAdminOrg from "./viewGroupAdmin";
// import ViewEntities from "./viewEntities";
// import ViewEntitiesGroup from "../../../main/group/modals/viewEntitiesGroup/index";
// import EditOrg from "./editOrg";
// import AddUsers from "./addUsers";
// import UpdateCompliance from "../../centralRepo/components/updateCompliances";
// import ViewGroupAdmin from "../../group/modals/viewgroup/index";
// import EditGroup from "../../group/modals/editgroup";
// import AddGroupAdminForm from "../../group/modals/viewgroup/AddGroupAdminForm";
// import ConfirmModal from "../../../../view/components/modals/ConfirmModal";
// import DeleteGroup from "../../group/modals/deleteGroup";

export const MyMenu = ({ setModalToShow, actionsList }) => {
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
        marginBottom: "-5px",
      }}
    >
      {actionsList.map((item, index) => {
        return (
          <Menu.Item
            key={index}
            // style={cls.ant_menu_item_selected}
            onClick={item.onClick}
          >
            <a>{item.label}</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

// const menuArr = ['Good Morning', 'Good Afternoon', 'Good Night']

// const menu = menuArr.map((element, index) =>  <Menu.Item>{element}</Menu.Item>
// )

function MoreOptions({ actionsList }) {
  // const [modalToShow, setModalToShow] = React.useState("");

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
                // setModalToShow={setModalToShow}
                actionsList={actionsList}
              />
            }
            placement="bottomRight"
          >
            <div>
              <MoreOutlined
                style={cls.moreIcon}
              />
            </div>
          </Dropdown>
        </Space>
      </Space>

      {/* organization modals */}
      {/* <AddUsers
        showModel={modalToShow === "Add User"}
        setShowModel={setShowModel}
      ></AddUsers>

      <EditOrg
        showModel={modalToShow === "Edit Organisation"}
        setShowModel={setShowModel}
      />

      <ViewEntities
        showModel={modalToShow === "View Entities"}
        setShowModel={setShowModel}
      ></ViewEntities>

      <ViewGroupAdminOrg
        showModel={modalToShow === "View Group Admin"}
        setShowModel={setShowModel}
      ></ViewGroupAdminOrg> */}
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
    background: "#fff !important",
  },
};
