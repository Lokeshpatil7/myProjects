import React, { useState } from "react";
import { Button, Modal, notification } from "antd";
import AddUserForm from "./form";
import { post } from "../../../../../../api/HTTPService";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";

function AddUserModel({ visible, setVisible, getUses, roles, departments }) {
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    user_type: "",
    Level: "",
    departments: [],
  });

  const resetData = () => {
    setFormData({
      email: "",
      name: "",
      phone: "",
      role_id: "",
      Level: "",
      departments: [],
    });
  };

  //user form validation
  const validation = () => {
    let isValid = true;
    if (formData.name) {
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(formData.name)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter your correct name",
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
    //email
    // if (formData.email) {
    //   const regex = /\S+@\S+\.\S+/;
    //   if (!regex.test(formData.email)) {
    //     isValid = false;
    //     notification.open({
    //       message: "Error",
    //       description: "Please enter your valid Email !!!",
    //       icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
    //       closeIcon: (
    //         <RiCloseFill
    //           className="remix-icon da-text-color-black-80"
    //           size={24}
    //         />
    //       ),
    //     });
    //   }
    // }

    if (formData.phone) {
      const regex = /^-?\d*\.?\d*$/;
      const checkNumber = regex.test(formData.phone);
      if (checkNumber === false) {
        if (formData.phone.length !== 10) {
          isValid = false;
          notification.open({
            message: "Error",
            description: "Please enter valid Phone number!!!",
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
    }
    return isValid;
  };

  const onSubmit = async () => {
    if (!validation()) {
      return;
    }
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.phone !== "" &&
      formData.role_id !== "" &&
      formData.departments.length > 0
      // (formData.user_type === "Group Admin" ? formData.group_id : true) &&
      // (formData.user_type === "Entity Admin" ? formData.entity_id : true)
    ) {
      setloading(true);
      try {
        const addedUser = await post("/users/", {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone,
          role_id: formData.role_id,
          departments: formData.departments,
          password: "password",
          // user_type: formData.user_type.split(" ").join("_").toUpperCase(),
          // group_id:
          //   formData.user_type === "Group Admin" ? formData.group_id : null,
          // entity_id:
          //   formData.user_type === "Entity Admin" ? formData.entity_id : null,
        }).then();
        if (addedUser && addedUser.message === "USER CREATED SUCCESFULLY") {
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
        }

        getUses();
        resetData();
        setVisible(false);
        setloading(false);
      } catch (e) {
        notification.open({
          message: "Error",
          description: e.response.data.message
            ? e.response.data.message
            : "somthing went wrong.",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
        setVisible(false);
        setloading(false);
        // handleModleClose();
      }
    } else {
      notification.open({
        message: "Error",
        description: "Fill all mandatory fields",
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
      <Modal
        title="Add User"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => {
          setVisible(false);
          resetData();
        }}
        width={700}
        footer={[
          <Button
            key="submit"
            type="secoundry"
            loading={loading}
            onClick={onSubmit}
          >
            Add
          </Button>,
        ]}
      >
        <AddUserForm
          formData={formData}
          setFormData={setFormData}
          roles={roles}
          departments={departments}
        ></AddUserForm>
      </Modal>
    </div>
  );
}

export default AddUserModel;
