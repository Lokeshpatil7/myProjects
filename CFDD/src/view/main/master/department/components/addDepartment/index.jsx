import React, { useState } from "react";
import { Modal, notification, Row, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { post } from "../../../../../../api/HTTPService";
import FilterSelect from "../../../components/FilterSelect";
import GenerateForm from "../../../../../components/forms/GenerateForm";

function AddDepartment({
  showModel,
  setShowModel,
  getOrg,
  getDepartment,
  getUnit,
  groups,
  selectedGroup,
  setSelectedGroup,
  entites,
  selectedEntity,
  setSelectedEntity,
  units,
  selectedUnit,
  setSelectedUnit,
}) {
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({
    name: "",
  });

  //department validation
  const validation = () => {
    let isValid = true;
    if (formData.name) {
      const regex = /^[a-zA-Z0-9_ ]*$/;
      if (!regex.test(formData.name)) {
        isValid = false;
        notification.open({
          message: "Error",
          description: "Please enter valid department name",
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
    const { name } = formData;
    if (name !== "") {
      setloading(true);
      try {
        const added = await post(`/department`, {
          ...formData,
          unit_id: selectedUnit,
        });
        if (added && added.message === "DEPARTMENT CREATED SUCCESFULLY") {
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

        getDepartment(selectedUnit);
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
  const resetFormData = () => {
    setFormData({ name: "" });
  };

  return (
    <div>
      <Modal
        title="Add Department"
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
                options={entites}
                selectedValue={selectedEntity}
                label="name"
                value="id"
                onChange={(el) => {
                  setSelectedEntity(el);
                  getUnit(el);
                }}
              />
            </div>
          </Col>

          <Col className="gutter-row" span={8}>
            <div style={{ marginTop: "20px" }}>
              <label>Select Unit </label> <br />
              <FilterSelect
                placeholder="Select Entity"
                options={units}
                selectedValue={selectedUnit}
                label="name"
                value="id"
                onChange={(el) => {
                  setSelectedUnit(el);
                  getDepartment();
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

export default AddDepartment;

const formField = [
  {
    label: "Department name",
    placeholder: "Enter department name",
    field: "name",
    inputType: "text",
  },
];
