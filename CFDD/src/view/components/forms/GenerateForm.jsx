import { Col, Row } from "antd";
import React from "react";
import { DateInput, FileInput, SelectInput, TextInput } from ".";

export default function GenerateForm({
  formField,
  formData,
  setFormData,
  colSpan,
}) {
  return (
    <div>
      <Row gutter={15}>
        {formField.map((fieldDetail, index) => (
          <Col key={index} className="gutter-row" span={colSpan}>
            {fieldDetail.inputType === "text" ? (
              <TextInput
                label={fieldDetail.label}
                field={fieldDetail.field}
                placeholder={fieldDetail.placeholder}
                value={formData[fieldDetail.field]}
                onChange={(e) => {
                  setFormData((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  });
                }}
                // rules={[
                //   { required: true, message: "Please input your password!" },
                // ]}
              />
            ) : fieldDetail.inputType === "text_disabled" ? (
              <TextInput
                disabled
                label={fieldDetail.label}
                field={fieldDetail.field}
                placeholder={fieldDetail.placeholder}
                value={formData[fieldDetail.field]}
                onChange={(e) => {
                  setFormData((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  });
                }}
              />
            ) : fieldDetail.inputType === "date" ? (
              <DateInput
                label={fieldDetail.label}
                placeholder={fieldDetail.placeholder}
                value={formData[fieldDetail.field]}
                onChange={(e) => {
                  setFormData((prev) => {
                    return { ...prev, [fieldDetail.field]: e };
                  });
                }}
              />
            ) : fieldDetail.inputType === "select" ? (
              <SelectInput
                label={fieldDetail.label}
                placeholder={fieldDetail.placeholder}
                options={fieldDetail.options}
                value={formData[fieldDetail.field]}
                onChange={(e) => {
                  setFormData((prev) => {
                    return { ...prev, [fieldDetail.field]: e };
                  });
                }}
              ></SelectInput>
            ) : fieldDetail.inputType === "file" ? (
              <FileInput
                marginBottom={"20px"}
                label={fieldDetail.label}
                placeholder={fieldDetail.placeholder}
                value={formData[fieldDetail.field]}
                onChange={(e) => {
                  setFormData((prev) => {
                    return { ...prev, [fieldDetail.field]: e };
                  });
                }}
                accept={fieldDetail.accept ?? "*"}
              />
            ) : (
              <div></div>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
}
