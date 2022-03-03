import { Col, Modal, Row } from "antd";
import React from "react";
import { SelectInput, TextInput } from "../../../../components/forms";
import FormFilds from "../forms/filedDetails";

export default function UpdateCompliance({ formData, setFormData, showModel, setShowModel }) {
  return (
    <Modal
      centered
      visible={showModel}
      onOk={() => setShowModel(false)}
      onCancel={() => setShowModel(false)}
      width={700}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {FormFilds.map((fieldDetail, index) => (
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
      <br /> <br />
    </Modal>
  );
}
