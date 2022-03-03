import React, { useState } from "react";
import { Modal, notification, Row, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { post } from "../../../../../../api/HTTPService";
import FilterSelect from "../../../components/FilterSelect";
import GenerateForm from "../../../../../components/forms/GenerateForm";

function AddUnit({
  showModel,
  setShowModel,
  getUnit,
  getOrg,
  groups,
  selectedGroup,
  setSelectedGroup,
  entities,
  selectedEntity,
  setSelectedEntity,
}) {
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location_type: "",
  });

  const resetFormData = () => {
    setFormData({ name: "", address: "", location_type: "" });
  };

  // addunit validation
  const validation = () => {
    let isValid = true;
    if (formData.name) {
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(formData.name)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid unit name",
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
      return;
    }
    const { name, address, location_type } = formData;
    if (name !== "" && address !== "" && location_type !== "") {
      setloading(true);
      try {
        const added = await post(`/unit/`, {
          ...formData,
          organization_id: selectedEntity,
        });

        if (added && added.message === "UNIT CREATED SUCCESFULLY") {
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

        getUnit(selectedEntity);
        setloading(false);
        setShowModel(false);
        resetFormData();
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

  return (
    <div>
      <Modal
        title="Add Unit"
        centered
        visible={showModel}
        onCancel={() => {
          setShowModel(false);
          resetFormData();
        }}
        width={1000}
        footer={[
          <Button
            key="submit"
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
            <div style={{ marginTop: "20px" }}>
              <label>Select Group </label> <br />
              <FilterSelect
                placeholder="Select Group"
                options={groups}
                label="name"
                value="id"
                selectedValue={selectedGroup}
                onChange={(el) => {
                  setSelectedGroup(el);
                  getOrg(el);
                }}
              />
            </div>
          </Col>

          <Col className="gutter-row" span={8}>
            <div style={{ marginTop: "20px" }}>
              <label>Select Entity </label> <br />
              <FilterSelect
                placeholder="Select Entity"
                options={entities}
                selectedValue={selectedEntity}
                label="name"
                value="id"
                onChange={(el) => {
                  setSelectedEntity(el);
                }}
              />
            </div>
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

export default AddUnit;

const formField = [
  {
    label: "Unit name",
    placeholder: "Enter unit name",
    field: "name",
    inputType: "text",
  },
  {
    label: "Address",
    placeholder: "Enter address",
    field: "address",
    inputType: "text",
  },
  {
    label: "Location type ",
    placeholder: "Enter location type",
    field: "location_type",
    inputType: "text",
  },
];
