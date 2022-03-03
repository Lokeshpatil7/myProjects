import React, { useState } from "react";
import { Button, Col, Modal } from "antd";
import GenerateForm from "../../../../../components/forms/GenerateForm";

const AddAct2 = ({ setScreen, modal, setModal }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  return (
    <Modal
      title="Add act"
      centered
      visible={modal}
      onCancel={() => {
        setModal(false);
        setScreen(0);
      }}
      width={800}
      footer={[
        <>
          <Button
            onClick={() => {
              setModal(false);
              setScreen(0);
            }}
          >
            cancel
          </Button>
          <Button onClick={() => setScreen(3)} type="secoundry">
            create
          </Button>
        </>,
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
  );
};

export default AddAct2;

const formField = [
  {
    label: "UID",
    placeholder: "ddc_1234",
    field: "region",
    inputType: "text_disabled",
  },
  {
    label: "esg category",
    placeholder: "select",
    field: "esg",
    inputType: "select",
  },
  {
    label: "law category",
    placeholder: "select",
    field: "law",
    inputType: "select",
  },
  {
    label: "central/state/ut",
    placeholder: "select",
    field: "central",
    inputType: "select",
  },
  {
    label: "name of state",
    placeholder: "select",
    field: "name",
    inputType: "select",
  },
  {
    label: "name of the act",
    placeholder: "select",
    field: "act",
    inputType: "select",
  },
  {
    label: "rule/regulations",
    placeholder: "select",
    field: "rule",
    inputType: "select",
  },
  {
    label: "linkage",
    placeholder: "type here",
    field: "linkage",
    inputType: "text",
  },
  {
    label: "reference (section, rule,e etc)",
    placeholder: "select",
    field: "reference",
    inputType: "select",
  },
];
