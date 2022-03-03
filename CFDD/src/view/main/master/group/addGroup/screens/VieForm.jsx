import React from "react";
import { Modal, Button, Row, Col } from "antd";
import GenerateForm from "../../../../../components/forms/GenerateForm";

function AddGroupVieForm({
  visible,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  // const getAllGroupAdmin = () => {
  //   get(`/users/byRole/GROUP_ADMIN/`)
  //     .then((data) => {
  //     })
  //     .catch((e) => {
  //     });
  // };

  return (
    <Modal
      centered
      title="Add Group"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      width={500}
      footer={[
        <div>
          <Button type="secoundry" onClick={onSubmit}>
            ADD
          </Button>
        </div>,
      ]}
    >
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24}>
            <GenerateForm
              formField={formField}
              formData={formData}
              setFormData={setFormData}
              colSpan={24}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

export default AddGroupVieForm;

const formField = [
  {
    // name: "name",
    lable: "Group Name",
    placeholder: "Enter group Name",
    field: "name",
    inputType: "text",
    // rules: [{ required: true, message: "Please enter your groupname!" }],
  },
  {
    lable: "Description",
    placeholder: "Enter group description",
    field: "description",
    inputType: "text",
    // rules: [{ required: true, message: "Please enter your Description!" }],
  },
  // {
  //   label: "ADMIN NAME",
  //   placeholder: "Select Admin",
  //   fild: "user_type",
  //   inputType: "select",
  //   options: ["user1", "user2"],
  // },
];
