import React, { useState, useEffect } from "react";
import { Button, Modal, notification } from "antd";
import { put } from "../../../../../../../api/HTTPService";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import EditUserForm from "./form";

function EditUserModel({ dataToEdit, setDataToEdit, getUses }) {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    user_type: "",
  });

  useEffect(() => {
    setFormData({ ...dataToEdit });
  }, [dataToEdit]);

  const onSubmit = async () => {
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.phone !== ""
    ) {
      setloading(true);
      try {
        const addedData = await put("/users/" + formData.id + "/", {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          user_type: formData.user_type.split(" ").join("_").toUpperCase(),
        }).then();
        if (addedData && addedData.success) {
          notification.open({
            message: "Data Updated Successfully",
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
          setloading(false);
          setDataToEdit(null);
        }
      } catch (e) {
        notification.open({
          message: "Error",
          description:
            e.response && e.response.data && e.response.data.message
              ? e.response.data.message
              : "something went wrong.",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });

        setloading(false);
      }
    } else alert("Fields cannot be empty");
  };

  return (
    <div>
      <Modal
        title="Edit User"
        centered
        visible={dataToEdit}
        onOk={() => setDataToEdit(null)}
        onCancel={() => setDataToEdit(null)}
        width={700}
        footer={[
          <Button
            key="submit"
            type="secoundry"
            loading={loading}
            onClick={onSubmit}
          >
            Update
          </Button>,
        ]}
      >
        <EditUserForm
          formData={formData}
          setFormData={setFormData}
        ></EditUserForm>
      </Modal>
    </div>
  );
}

export default EditUserModel;