import React, { useState, useEffect } from "react";
import { Row, Col, Button, notification } from "antd";
import FormFilds from "./filedDetails";
import { TextInput, SelectInput } from "../../../../../components/forms";
import { post } from "../../../../../../api/HTTPService";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
const AddComplianceForm = ({
  setshowAddModule,
  setAddModuleScreen,
  region,
  zone,
  country,
}) => {
  const [formValue, setFormValue] = useState({
    region,
    zone,
    country,
    UID: "",
    applicability: "",
    authority: "",
    consequence: "",
    corrective_actions: "",
    csu_category: "",
    daily_fine: "",
    daily_fine_amount: "",
    esg_category: "",
    event_question: "",
    first_penalty: "",
    form_details: "",
    frequency: "",
    global_principles: "",
    help_text: "",
    is_compoundable: "",
    law_category: "",
    linkage: "",
    name: "",
    name_of_state: "",
    online_link: "",
    reference: "",
    requirement: "",
    rule_name: "",
    severity: "",
    source_matrix: "",
    threshold: "",
    threshold_value: "",
    threshold_unit: "",
    title: "",
    update_page_crawler_link: "",
  });
  const [selectDate, setSelectDate] = useState();
  const [loading, setloading] = useState();
  const onValueChange = (name, value) => {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  //validation
  const validation = () => {
    let isValid = true;
    if (formValue.UID) {
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(formValue.UID)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid UID number",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }

    if (formValue.law_category) {
      const regex = /^[a-zA-Z0-9_ /,.]*$/;
      if (!regex.test(formValue.law_category)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid law category ",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }
    if (formValue.esg_category) {
      const regex = /^[a-zA-Z0-9_ /,.()-]*$/;
      if (!regex.test(formValue.esg_category)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid esg category ",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }

    if (formValue.linkage) {
      const regex = /^[a-zA-Z0-9_ ,./]*$/;
      if (!regex.test(formValue.linkage)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter correct linkage ",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }
    if (formValue.name_of_state) {
      const regex = /^[a-zA-Z_ ]*$/;
      if (!regex.test(formValue.name_of_state)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter correct state name ",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }

    if (formValue.threshold) {
      const regex = /^[a-zA-Z_ ]*$/;
      if (!regex.test(formValue.threshold)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter correct threshold ",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }

    if (formValue.threshold_unit) {
      const regex = /^[a-zA-Z0-9_ /.,%]*$/;
      if (!regex.test(formValue.threshold_unit)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter correct threshold_unit ",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }
    if (formValue.severity) {
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(formValue.severity)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter correct severity ",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }
    if (formValue.first_penalty) {
      const regex = /^[0-9_ ]*$/;
      if (!regex.test(formValue.first_penalty)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "first penalty should be in numbers",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }
    if (formValue.daily_fine_amount) {
      const regex = /^[0-9_ ]*$/;
      if (!regex.test(formValue.daily_fine_amount)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: " daily fine amount should be in numbers",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
    }
    return isValid;
  };

  const onFormSubmit = async () => {
    console.log("region", region, country, zone);
    if (!validation()) {
      return;
    }
    if (
      formValue &&
      formValue.UID !== "" &&
      formValue.applicability !== "" &&
      formValue.authority !== "" &&
      formValue.consequence !== "" &&
      formValue.consequence_reference !== "" &&
      formValue.corrective_actions !== "" &&
      formValue.csu_category !== "" &&
      formValue.daily_fine !== "" &&
      formValue.daily_fine_amount !== "" &&
      formValue.esg_category !== "" &&
      formValue.event_question !== "" &&
      formValue.first_penalty !== "" &&
      formValue.form_details !== "" &&
      formValue.frequency !== "" &&
      formValue.global_principles !== "" &&
      formValue.help_text !== "" &&
      formValue.is_compoundable !== "" &&
      formValue.law_category !== "" &&
      formValue.linkage !== "" &&
      formValue.name !== "" &&
      formValue.name_of_state !== "" &&
      formValue.online_link !== "" &&
      formValue.reference !== "" &&
      formValue.requirement !== "" &&
      formValue.rule_name !== "" &&
      formValue.severity !== "" &&
      formValue.source_matrix !== "" &&
      formValue.threshold !== "" &&
      formValue.threshold_value !== "" &&
      formValue.threshold_unit !== "" &&
      formValue.title !== "" &&
      formValue.update_page_crawler_link !== ""
    ) {
      setloading(true);
      try {
        console.log("response");
        const response = await post("/compliances", formValue).then();
        if (response.message === "") {
          notification.open({
            message: "Data Added Successfully",
            description: "",
            icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
            closeIcon: (
              <RiCloseFill
                className="remix-icon da-text-color-black-80"
                size={24}
              />
            ),
          });
        }
        resetForm();
      } catch (e) {
        let errorMsg = "something went wrong.";
        console.log("Something went wrong while adding compliance");
        if (e.response) {
          if (e.response?.message) {
            errorMsg = e?.response?.message;
            notification.open({
              message: "Error",
              description: e?.response?.data?.message,
              icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
              closeIcon: (
                <RiCloseFill
                  className="remix-icon da-text-color-black-80"
                  size={24}
                />
              ),
            });
          } else if (e?.response?.data?.message) {
            errorMsg = e?.response?.data?.message;
            notification.open({
              message: "Error",
              description: e?.response?.data?.message,
              icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
              closeIcon: (
                <RiCloseFill
                  className="remix-icon da-text-color-black-80"
                  size={24}
                />
              ),
            });
            console.log(errorMsg);
          }
        }
      }
      setloading(true);
    } else {
      console.log("data not filled");
      notification.open({
        message: "Error",
        description: " All fields are mandatory ",
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        ),
      });
    }
  };
  const resetForm = () => {
    setFormValue({
      ...(formValue !== " "),
    });
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {FormFilds.map((fieldDetail, index) => (
          <Col key={index} className="gutter-row" span={8}>
            {fieldDetail.inputType === "text" ||
            fieldDetail.inputType === "number" ? (
              <TextInput
                label={fieldDetail.lable}
                placeholder={fieldDetail.placeholder}
                onChange={(event) => {
                  // console.log("date", fieldDetail, event);
                  onValueChange(
                    fieldDetail.fild,
                    event && event.target ? event.target.value : event
                  );
                }}
                type={fieldDetail.inputType}
              />
            ) : (
              <SelectInput
                label={fieldDetail.lable}
                placeholder={fieldDetail.placeholder}
                options={fieldDetail.options}
                onChange={(value) => onValueChange(fieldDetail.fild, value)}
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
                console.log(formValue);
                onFormSubmit();
                // setshowAddModule(false);
                // setAddModuleScreen(1);
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddComplianceForm;
