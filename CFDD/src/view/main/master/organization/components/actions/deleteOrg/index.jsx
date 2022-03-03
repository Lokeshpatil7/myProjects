import { notification } from "antd";
import React from "react";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { httpDelete } from "../../../../../../../api/HTTPService";
import ConfirmModal from "../../../../../../components/modals/ConfirmModal";

export default function DeleteOrg({
  showModel,
  setShowModel,
  selectedEntity,
  getOrg,
  selectedGroup,
}) {
  const onOk = () => {
    deleteOrg();
  };

  const deleteOrg = () => {
    httpDelete(`/entity/${selectedEntity}/`)
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
        getOrg(selectedGroup);
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

  const onCancel = () => {
    setShowModel(false);
  };

  return (
    <div>
      <ConfirmModal
        show={showModel}
        onOk={onOk}
        onCancel={onCancel}
        okText="Delete"
        message={"Are you sure you want to delete this Organisation?"}
      />
    </div>
  );
}
