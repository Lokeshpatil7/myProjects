import React from "react";
import ConfirmModal from "../../../../../../components/modals/ConfirmModal";
import { httpDelete } from "../../../../../../../api/HTTPService";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { notification } from "antd";

export default function DeleteUser({ userId, setUserId, getUses,show,setShow }) {
  const deleteUser = () => {
    httpDelete("/users/" + userId).then((res) => {

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

      getUses();
      setUserId("");
      
    }).catch(e=>{
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
      <ConfirmModal
   
        show={userId}
        onCancel={() => setUserId("")}
        okText="Delete"
        message="Are you sure you want to delete this User?"
        onOk={deleteUser}
      ></ConfirmModal>
    </div>
  );
}
