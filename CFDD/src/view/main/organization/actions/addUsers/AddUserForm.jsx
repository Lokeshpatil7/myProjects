import React from "react";
import { Modal, Button, Row, Col } from "antd";
import { Colors } from "../../../../../assets/Colors";
import { SelectInput, TextInput } from "../../../../components/forms";

const formFeilds = [
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
    field: "UIDTitle",
    inputType: "text",
  },
  {
    label: "Unit locations",
    placeholder: "Enter",
    field: "UIDTitle",
    inputType: "text",
  },
  {
    label: "Entity Admin",
    placeholder: "Enter",
    field: "UIDTitle",
    inputType: "text",
  },
];

function AddEntityModal({ setScreen, showModel, setShowModel }) {
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
            onClick={() => setScreen(2)}
            // loading={loading}
          >
            ADD User
          </Button>
        </div>,
      ]}
    >
      <div style={cls.titleDiv}>
        <label style={cls.title}> Add User</label>
      </div>

      <Row gutter={15}>
        {formFeilds.map((fieldDetail, index) => (
          <Col key={index} className="gutter-row" span={8}>
            {fieldDetail.inputType === "text" ? (
              <TextInput
                label={fieldDetail.lable}
                placeholder={fieldDetail.placeholder}
              />
            ) : (
              <SelectInput
                label={fieldDetail.lable}
                placeholder={fieldDetail.placeholder}
                options={fieldDetail.options}
              ></SelectInput>
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
