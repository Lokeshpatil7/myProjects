import React, { useState } from "react";
import { Button, Col, Modal } from "antd";
import GenerateForm from '../../../../../components/forms/GenerateForm'

const AddAct = ({ setScreen, modal, setModal }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  return (
    <Modal
      title="Add act"
      centered
      visible={modal}
      onCancel={() => {
        setModal(false);
      }}
      width={500}
      footer={[
        <Button onClick={() => setScreen(1)} type="secoundry">continue</Button>
      ]}
    >
      <Col span={24}>
            <GenerateForm
              formField={formField}
              formData={formData}
              setFormData={setFormData}
              colSpan={24}
            />
          </Col>
    </Modal>
  );
};

export default AddAct;

const formField = [
  {
    label: "Region",
    placeholder: "select",
    field: "region",
    inputType: "select",
  },
  {
    label: "Country",
    placeholder: "select",
    field: "country",
    inputType: "select",
  },
];