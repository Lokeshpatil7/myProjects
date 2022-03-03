import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import FormFilds from "./filedDetails";
import { TextInput, SelectInput } from "../../../components/forms";
// import { post } from "../../../../../api/HTTPService";

function AddComplianceForm({ setshowAddModule, setAddModuleScreen }) {
  // const [formData, setFormData] = useState({});
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({
    uId: "",
    legislation: "",
    rule: "",
    law_Category: "",
    esg_Category: "",
    csu_Category: "",
    state: "",
    linkage: "",
    reference: "",
    applicablity: "",
    title: "",
    requirement: "",
    threshold: "",
    threshold_Val: "",
    threshold_Unit: "",
    authority: "",
    frequency: "",
    consequence: "",
    first_Penalty: "",
    reference_Consequence: "",
    corrective_Actions: "",
    severity: "",
    daily_Fine: "",
    daily_Fine_Amount: "",
    compoundable: "",
    help_Text: "",
    form_Details: "",
    online_Link: "",
    source_Matrix: "",
    update_Calver_link: "",
    event_Question: "",
    global_Principle: "",
  });
  const resetData = () => {
    setFormData({
      ...formData,
    });
  };
  const onFormSubmit = async () => {
    try {
      const response = await post("/compliances", formValue);
      console.log(response);
    } catch (error) {
      console.log("Something went wrong while adding compliance");
    }
  };
  return (
    <div>
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
      <div>
        <Row justify="end">
          <Col span={4}>
            <Button
              type=""
              onClick={() => {
                setshowAddModule(false);
                setAddModuleScreen(1);
              }}
              style={{ marginRight: "20px" }}
            >
              Back
            </Button>

            <Button
              type="secoundry"
              onClick={() => {
                setshowAddModule(false);
                setAddModuleScreen(1);
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AddComplianceForm;
