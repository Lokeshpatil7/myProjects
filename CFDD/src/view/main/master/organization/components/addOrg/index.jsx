import React, { useState } from "react";
import { Modal, notification, Row, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { post } from "../../../../../../api/HTTPService";
import FilterSelect from "../../../components/FilterSelect";
import GenerateForm from "../../../../../components/forms/GenerateForm";
function AddOrg({
  showModel,
  setShowModel,
  getOrg,
  groups,
  selectedGroup,
  setSelectedGroup,
}) {
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gstin: "",
    pan_number: "",
    industry_type: "",
    entity_type: "",
  });

  //check gst number
  const checkGSTNumber = (g) => {
    let regTest = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(
      g
    );
    if (regTest) {
      let a = 65,
        b = 55,
        c = 36,
        p;
      return Array["from"](g).reduce((i, j, k, g) => {
        p =
          (p =
            (j.charCodeAt(0) < a ? parseInt(j) : j.charCodeAt(0) - b) *
            ((k % 2) + 1)) > c
            ? 1 + (p - c)
            : p;
        return k < 14
          ? i + p
          : j == ((c = c - (i % c)) < 10 ? c : String.fromCharCode(c + b));
      }, 0);
    }
    return regTest;
  };

  //organisation validation
  const validation = () => {
    let isValid = true;
    if (formData.name) {
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(formData.name)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid entity name",
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

    if (formData.industry_type) {
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(formData.industry_type)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid  industry type",
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

    if (formData.entity_type) {
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(formData.entity_type)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid entity type",
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

    //gst number
    if (formData.gstin) {
      const checkGST = checkGSTNumber(formData.gstin);
      console.log("formData", checkGST);
      if (!checkGST) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid GSTIN Number !!!",
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

    //pan number
    if (formData.pan_number) {
      console.log("formdata", formData);
      const regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if (!regex.test(formData.pan_number)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid Pan Number !!!",
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

  const onSubmit = async () => {
    if (!validation()) {
      return false;
    }
    const {
      name,
      address,
      unitType,
      gstin,
      pan_number,
      industry_type,
      entity_type,
    } = formData;

    if (
      name !== "" &&
      address !== "" &&
      unitType !== "" &&
      gstin !== "" &&
      industry_type !== "" &&
      entity_type !== "" &&
      pan_number !== ""
    ) {
      setloading(true);
      try {
        const addedUser = await post(`/entity/`, {
          ...formData,
          group_id: selectedGroup,
        });

        if (
          addedUser &&
          addedUser.message === "ORGANIZATION CREATED SUCCESFULLY"
        ) {
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

        getOrg(selectedGroup);
        setloading(false);
        setShowModel(false);
        resetForm();
      } catch (e) {
        let errorMsg = "something went wrong.";

        if (e.response) {
          if (e.response?.message) {
            errorMsg = e?.response?.message;
          } else if (e?.response?.data?.message) {
            errorMsg = e?.response?.data?.message;
            console.log(errorMsg);
          }
        }
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

        setloading(false);
        // handleModleClose();
      }
    } else {
      notification.open({
        message: "Error",
        description: "All fields are mandatory",
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
    setFormData({
      name: "",
      address: "",
      gstin: "",
      pan_number: "",
      industry_type: "",
      entity_type: "",
    });
  };
  return (
    <div>
      <Modal
        name="control-hooks"
        title="Add Organisation"
        centered
        visible={showModel}
        onOk={() => setShowModel(false)}
        onCancel={() => setShowModel(false)}
        width={1000}
        footer={[
          <Button
            key="submit"
            htmlType="submit"
            type="secoundry"
            loading={loading}
            onClick={onSubmit}
          >
            Add
          </Button>,
        ]}
      >
        <Row gutter={15}>
          <Col className="gutter-row" span={8}>
            <label>Select Group </label> <br />
            <FilterSelect
              placeholder="Select Group"
              options={groups}
              label="name"
              value="id"
              selectedValue={selectedGroup}
              onChange={(el) => {
                setSelectedGroup(el);
              }}
            />
          </Col>

          <Col span={24}>
            <GenerateForm
              formField={formField}
              formData={formData}
              setFormData={setFormData}
              colSpan={8}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default AddOrg;

const formField = [
  {
    name: "Entity Name",
    label: "Entity Name",
    placeholder: "Enter entity name",
    field: "name",
    inputType: "text",
    //     rules={[
    //    {
    //        condition ? this.state.isRequired: null,
    //        message: 'This field is required',
    //    },
    // ]},
    rules: [{ required: true, message: "Please enter Entity Name!" }],
  },
  {
    label: "Address",
    placeholder: "Enter address",
    field: "address",
    inputType: "text",
  },
  {
    label: "GST Number",
    placeholder: "Enter gst number",
    field: "gstin",
    inputType: "text",
    // inputNumber: "number",
  },
  {
    label: "PAN",
    placeholder: "Enter pan",
    field: "pan_number",
    inputType: "text",
    //  onChange: { pancardValidation },
  },
  {
    label: "Industry type",
    placeholder: "Enter industry type",
    field: "industry_type",
    inputType: "text",
  },
  {
    label: "Entity type",
    placeholder: "Enter entity type",
    field: "entity_type",
    inputType: "text",
  },
];
