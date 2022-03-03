import React, { useState } from "react";
import { Button, Modal } from "antd";
import GenerateForm from "../../../../components/forms/GenerateForm";

const AddEmp = ({ setScreen, modal, setModal }) => {
    const [formData, setFormData] = useState({
        emp_name: "",
        reason: "",
        task_title: "",
        assigned_to: "",
        leave_period: "",
      });

  return (
    <Modal
      title="Add employee"
      centered
      visible={modal}
      onCancel={() => {
        setModal(false);
        setScreen(0);
      }}
      footer={[
        <Button type="secoundry" onClick={() => setScreen(1)}>
          add employee
        </Button>,
      ]}
    >
      <GenerateForm
        formField={formField}
        formData={formData}
        setFormData={setFormData}
        colSpan={24}
      />
    </Modal>
  );
};

export default AddEmp;

const formField = [
  {
    label: "EMPLOYEE NAME",
    placeholder: "select name",
    field: "name",
    inputType: "select",
  },
  {
    label: "REASON FOR LEAVE",
    placeholder: "type here",
    field: "leave",
    inputType: "date",
  },
  {
    label: "TASK TITLE",
    placeholder: "type here",
    field: "dept",
    inputType: "text",
  },
  {
    label: "TASK ASSIGNED TO",
    placeholder: "Assign the task to",
    field: "task",
    inputType: "select",
  },
  {
    label: "LEAVE PERIOD",
    placeholder: "Please select",
    field: "leave_period",
    inputType: "select",
  }
];
