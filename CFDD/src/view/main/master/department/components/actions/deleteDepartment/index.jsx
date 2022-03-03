import { notification } from "antd";
import React from "react";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { httpDelete } from "../../../../../../../api/HTTPService";
// import { httpDelete } from "../../../../../../../api/HTTPService";
import ConfirmModal from "../../../../../../components/modals/ConfirmModal";
// import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
// import { notification } from "antd";

export default function DeleteDepartment({
  showModel,
  setShowModel,
  selectedDept,
  selectedUnit,
  getDepartment,
}) {
  const deleteOrg = () => {
    httpDelete(`/department/${selectedDept}`)
      .then((data) => {
        notification.open({
          message: "Data Deleted Successful",
          description: "",
          icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
        getDepartment(selectedUnit);
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
        message={"Are you sure you want to delete this Department?"}
      />
    </div>
  );
}
