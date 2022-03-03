import { notification } from "antd";
import React from "react";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { httpDelete } from "../../../../../../../api/HTTPService";
import ConfirmModal from "../../../../../../components/modals/ConfirmModal";

export default function DeleteLicence({
  showModel,
  setShowModel,
  selectedLicence,
  selectedUnit,
  getLicences,
}) {
  const deleteOrg = () => {
    httpDelete(`/licence/${selectedLicence}/`)
      .then((data) => {
        notification.open({
          message: "Data Added Successful",
          description: "",
          icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
        getLicences(selectedUnit);
        setShowModel("");
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
    setShowModel("");
  };

  return (
    <div>
      <ConfirmModal
        show={showModel}
        onOk={deleteOrg}
        onCancel={onCancel}
        okText="Delete"
        message={"Are you sure you want to delete this Licence?"}
      />
    </div>
  );
}
