import React, { useState } from "react";
import ConfirmModal from "../../../../../components/modals/ConfirmModal";
import SuccessModal from "../../../../../components/modals/SuccessModal";
import { httpDelete } from "../../../../../../api/HTTPService";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { notification } from "antd";

const DeleteGroup = ({ selected, showModel, setShowModel, getGroup }) => {
  const [screen, setScreen] = useState(0);

  const deleteGroup = () => {
    httpDelete(`groups/${selected}`)
      .then((data) => {
        notification.open({
          message: "Data Deleted Successfully",
          description: "",
          icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
        getGroup();
        setShowModel(false);
      })
      .catch((e) => {
        notification.open({
          message: "Error",
          description: "something went wrong.",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      });
  };

  return (
    <div>
      {screen === 0 ? (
        <ConfirmModal
          message="Are you sure you want to delete this group?"
          show={showModel}
          onCancel={() => {
            setShowModel(false);
          }}
          okText="Delete"
          onOk={deleteGroup}
        />
      ) : screen === 1 ? (
        <SuccessModal
          titleText="Group Admin deleted successfully"
          deleteIcon
          setScreen={setScreen}
          showModel={showModel}
          setShowModel={setShowModel}
        />
      ) : null}
    </div>
  );
};

export default DeleteGroup;
