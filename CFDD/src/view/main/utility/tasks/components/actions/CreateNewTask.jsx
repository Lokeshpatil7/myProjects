import React, { useState } from "react";
import { Button, Modal } from "antd";
import GenerateForm from "../../../../../components/forms/GenerateForm";

const CreateNewTask = ({ setScreen, modal, setModal }) => {
  const [formData, setFormData] = useState({
    task_name: "",
    task_desc: "",
    dept: "",
    person: "",
    due_date: "",
    existing_task: "",
  });

  return (
    <Modal
      title="Create a new task"
      centered
      visible={modal}
      onCancel={() => {
        setModal(false);
        setScreen(0);
      }}
      footer={[
        <Button type="secoundry" onClick={() => setScreen(2)}>
          Create task
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

export default CreateNewTask;

const formField = [
  {
    label: "TASK NAME",
    placeholder: "type here",
    field: "name",
    inputType: "text",
  },
  {
    label: "TASK DESCRIPTION",
    placeholder: "type here",
    field: "desc",
    inputType: "text",
  },
  {
    label: "DEPARTMENT",
    placeholder: "Select  a department",
    field: "dept",
    inputType: "select",
  },
  {
    label: "PERSON",
    placeholder: "Assign the task to",
    field: "person",
    inputType: "select",
  },
  {
    label: "DUE DATE",
    placeholder: "Select a date",
    field: "due_date",
    inputType: "date",
  },
  {
    label: "LINK TO EXISTING TASK",
    placeholder: "Select a date",
    field: "link_date",
    inputType: "date",
  },
];
