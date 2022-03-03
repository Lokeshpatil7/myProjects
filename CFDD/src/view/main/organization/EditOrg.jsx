import React, { useState, useEffect } from "react";
import { Modal, notification, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { put } from "../../../api/HTTPService";
import GenerateForm from "../../components/forms/GenerateForm";

function EditOrg({ showModel, setShowModel, selected, setSelected, getOrg }) {
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({
    entityName: "",
    industry: "",
    unitName: "",
    unitType: "",
    gstNumber: "",
    adminName: "",
    description: "",
    pan: "",
  });

  useEffect(() => {
    setFormData({ ...selected });
  }, [selected]);

  const onSubmit = async () => {
    if (
      formData.entityName !== "" &&
      formData.description !== ""
      // formData.industry !== "" &&
      // formData.unitName !== "" &&
      // formData.unitType !== "" &&
      // formData.gstNumber !== "" &&
      // formData.adminName !== "" &&
      // formData.pan !== ""
    ) {
      setloading(true);
      try {
        const addedUser = await put("/groups", {
          name: formData.entityName,
          description: formData.description,
          // unit_name: formData.unitName,
          // unit_type: formData.unitType,
          // gst_number: formData.gstNumber,
          // admin_name: formData.adminName,
          // unit_name: formData.unitName,
        }).then();
        if (addedUser && addedUser.success) {
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
        }

        getOrg();

        setSelected(null);
        setloading(false);
      } catch (e) {
        notification.open({
          message: "Error",
          description: e.response.message
            ? e.response.message
            : "something went wrong.",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });

        setSelected(null);
        setloading(false);
        // handleModleClose();
      }
    }
  };

  
  return (
    <div>
      <Modal
        centered
        title="Edit Organisation"
        visible={showModel}
        onOk={() => setShowModel(false)}
        onCancel={() => setShowModel(false)}
        width={1000}
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

        <Col span={24}>
          <GenerateForm
            formField={formField}
            formData={formData}
            setFormData={setFormData}
            colSpan={8}
          />
        </Col>
      </Modal>
    </div>
  );
}

export default EditOrg;

const formField = [
  {
      label: "Entity name",
      placeholder: "Enter entity name",
      field: "entityName",
      inputType: "text",
  },
  {
      label: "Industry",
      placeholder: "Enter industry",
      field: "industry",
      inputType: "text",
  },
  {
      label: "Unit type",
      placeholder: "Enter unit type",
      field: "unitType",
      inputType: "text",
  },
  {
      label: "GST number",
      placeholder: "Enter gst number",
      field: "gstNumber",
      inputType: "text",
  },
  {
      label: "Description",
      placeholder: "Enter description",
      field: "description",
      inputType: "text",
  },
  {
      label: "Unit name",
      placeholder: "Enter unit name",
      field: "unitName",
      inputType: "text",
  },
  {
      label: "Group name",
      placeholder: "Enter group name",
      field: "groupName",
      inputType: "text",
  },
  {
      label: "Admin name",
      placeholder: "Enter admin name",
      field: "adminName",
      inputType: "text",
  },
  {
      label: "PAN",
      placeholder: "Enter pan",
      field: "pan",
      inputType: "text",
  },
];