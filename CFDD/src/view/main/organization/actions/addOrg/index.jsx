import React, { useState, useEffect } from "react";
import { Modal, notification, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { put } from "../../../../../api/HTTPService";
import GenerateForm from "../../../../components/forms/GenerateForm";

function AddOrg({ showModel, setShowModel, selected, setSelected, getOrg }) {
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({
    entityName: "",
    industry: "",
    unitType: "",
    gstNumber: "",
    description: "",
    unitName: "",
    groupName: "",
    adminName: "",
    pan: "",
  });

  const {
    entityName,
    industry,
    unitType,
    gstNumber,
    description,
    unitName,
    groupName,
    adminName,
    pan,
  } = formData;

  useEffect(() => {
    setFormData({ ...selected });
  }, [selected]);

  const onSubmit = async () => {
    if (
      entityName !== "" &&
      industry !== "" &&
      unitType !== "" &&
      gstNumber !== "" &&
      description !== "" &&
      unitName !== "" &&
      groupName !== "" &&
      adminName !== "" &&
      pan !== ""
    ) {
      setloading(true);
      try {
        const addedUser = await put("/groups", formData).then();
        if (addedUser && addedUser.success) {
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

        getOrg();

        setSelected(null);
        setloading(false);
      } catch (e) {
        notification.open({
          message: "Error",
          description: e.response.message
            ? e.response.message
            : "somthing went wrong.",
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
        title="Add organisation"
        centered
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
            Add
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

export default AddOrg;

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
