import React from "react";
import { Modal, Button, Row, Col } from "antd";
import { Colors } from "../../../../../../../assets/Colors";
import { SelectInput, TextInput } from "../../../../../../components/forms";

const formFeilds = [
  {
    label: "Select Admin",
    placeholder: "Select",
    field: "user_id",
    inputType: "select",
    options: ["user1", "user2", "user3"],
  },
];

function AddEntityModal({ setScreen, showModel, setShowModel }) {
  return (
    <Modal
      centered
      visible={showModel}
      onOk={() => setShowModel(false)}
      onCancel={() => {
        setShowModel(false);
        setScreen(0);
      }}
      width={700}
      footer={[
        <div style={cls.submitDiv}>
          <Button
            style={cls.submitBtn}
            key="submit"
            onClick={() => setScreen(2)}
            // loading={loading}
          >
            ADD Admin
          </Button>
        </div>,
      ]}
    >
      <div style={cls.titleDiv}>
        <label style={cls.title}> Select Admin</label>
      </div>

      <Row gutter={15}>
        {formFeilds.map((fieldDetail, index) => (
          <Col key={index} className="gutter-row" span={23}>
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
