import React, { useState } from "react";
import { Modal, Button, Row, Col, notification } from "antd";
import { Colors } from "../../../../../assets/Colors";
import { SelectInput, TextInput } from "../../../../components/forms";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { post } from "../../../../../api/HTTPService";

const formFields = [
  {
    label: "UID",
    placeholder: "Enter UID",
    field: "uid",
    inputType: "text",
  },
  {
    label: "Entity name",
    placeholder: "Enter",
    field: "Entityname",
    inputType: "text",
  },
  {
    label: "City",
    placeholder: "Enter",
    field: "applicability",
    inputType: "text",
  },
  {
    label: "GST Number",
    placeholder: "Enter",
    field: "UIDTitle",
    inputType: "text",
  },
  {
    label: "Pan",
    placeholder: "Enter",
    field: "UIDTitles",
    inputType: "text",
  },
  {
    label: "Unit locations",
    placeholder: "Enter",
    field: "UIDTitle",
  },
  {
    label: "Entity Admin",
    placeholder: "Enter",
    field: "UIDTitle",
    options: ["Closed", "Communicated", "Resolved"],
    // inputType: "text",
  },
];

function AddEntityModal({
  setScreen,
  showModel,
  setShowModel,
  selected,
  setSelected,
  getOrg,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    entityname: "",
    city: "",
    gstNumber: "",
    pan: "",
    unitLocations: "",
    entityAdmin: "",
  });
  const { entityname, city, gstNumber, pan, unitLocations, entityAdmin } =
    formData;

  const OnSubmit = async () => {
    if (
      entityname !== "" &&
      city !== "" &&
      gstNumber !== "" &&
      pan !== "" &&
      unitLocations !== "" &&
      entityAdmin !== ""
    ) {
      setLoading(true);
      try {
        const addedUser = await post("/groups/", formData).then();
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

        setShowModel(false);
        setLoading(false);
      } catch (e) {
        notification.open({
          message: "Error",
          description: e.response.data.message
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
        setShowModel(false);
        setLoading(false);
        // handleModleClose();
      }
    }
  };

  return (
    <Modal
      centered
      visible={showModel}
      onOk={() => setShowModel(false)}
      onCancel={() => setShowModel(false)}
      width={700}
      footer={[
        <div style={cls.submitDiv}>
          <Button
            style={cls.submitBtn}
            key="submit"
            onClick={() => {
              // setScreen(2)
              OnSubmit();
            }}
            loading={loading}
          >
            ADD ADMIN
          </Button>
        </div>,
      ]}
    >
      <div style={cls.titleDiv}>
        <label style={cls.title}>ABC Group - Add Admin</label>
      </div>

      <Row gutter={15}>
        {formFields.map((fieldDetail, index) => (
          <Col key={index} className="gutter-row" span={8}>
            {fieldDetail.inputType === "text" ? (
              <TextInput
                label={fieldDetail.lable}
                placeholder={fieldDetail.placeholder}
                value={formData[fieldDetail.field]}
                field={fieldDetail.field}
                onChange={(e) => {
                  setFormData((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  });
                }}
              />
            ) : (
              <SelectInput
                label={fieldDetail.lable}
                placeholder={fieldDetail.placeholder}
                options={fieldDetail.options}
              ></SelectInput>
              // <Select
              //   showSearch
              //   style={{ width: '100%' }}
              //   placeholder={fieldDetail.placeholder}
              //   optionFilterProp="children"
              //   filterOption={(input, option) =>
              //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   }
              //   filterSort={(optionA, optionB) =>
              //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              //   }
              // >
              //   <Option value="1">Not Identified</Option>
              //   <Option value="2">Closed</Option>
              //   <Option value="3">Communicated</Option>
              //   <Option value="4">Identified</Option>
              //   <Option value="5">Resolved</Option>
              //   <Option value="6">Cancelled</Option>
              // </Select>
            )}
          </Col>
        ))}
      </Row>
    </Modal>
  );
}

export default AddEntityModal;

const cls = {
  submitDiv: {
    display: "flex",
    justifyContent: "center",
  },
  submitBtn: {
    backgroundColor: Colors.green,
    color: "white",
    padding: "1% 10%",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "2% 0",
  },
};
