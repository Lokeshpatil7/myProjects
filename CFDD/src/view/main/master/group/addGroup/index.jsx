import { notification } from "antd";
import React, { useState } from "react";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { post } from "../../../../../api/HTTPService";
import AddGroupVieExcel from "./screens/VieExcel";
import AddGroupVieForm from "./screens/VieForm";

export default function AddGroup({ visible, setVisible, getGroup }) {
  const [screen, setScreen] = useState("vie excel");
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const onClose = () => {
    setScreen("vie excel");
    setVisible(false);
  };

  //group name validation
  const validation = () => {
    let isValid = true;
    if (formData.name) {
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(formData.name)) {
        console.log("call function");
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid group name",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }
    return isValid;
  };

  const onSubmit = async () => {
    if (!validation()) {
      return;
    }
    const { name, description } = formData;
    if (name !== "" && description !== "") {
      setloading(true);

      const added = await post("/groups/", formData)
        .then((data) => {
          setFormData({ name: "", description: "" });
          notification.open({
            message: "Data Added Successfully",
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
          setVisible(false);
        })
        .catch((e) => {
          notification.open({
            message: "Error",
            description: "Server Error",
            icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
            closeIcon: (
              <RiCloseFill
                className="remix-icon da-text-color-black-80"
                size={24}
              />
            ),
          });
        });
      setloading(false);
    } else {
      notification.open({
        message: "Error",
        description: "All fields are mandatory",
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        ),
      });
    }
  };

  return (
    <div>
      {screen === "vie excel" ? (
        <AddGroupVieExcel
          visible={visible}
          onClose={onClose}
          setScreen={setScreen}
        />
      ) : (
        <AddGroupVieForm
          visible={visible}
          formData={formData}
          setFormData={setFormData}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
