import React from "react";
import { httpDelete } from "../../../../../../../api/HTTPService";
import ConfirmModal from "../../../../../../components/modals/ConfirmModal";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { notification } from "antd";

export default function DeleteUnit({
  showModel,
  setShowModel,
  selectedUnit,
  selectedEntity,
  getUnit,
}) {
  const deleteOrg = () => {
    httpDelete(`/unit/${selectedUnit}`)
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
        getUnit(selectedEntity);
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
        onOk={deleteOrg}
        onCancel={onCancel}
        okText="Delete"
        message={"Are you sure you want to delete this Unit?"}
      />
    </div>
  );
}
