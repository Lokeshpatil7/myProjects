import React, { useState } from "react";
import { Modal, notification, Row, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { post } from "../../../../../api/HTTPService";
import FilterSelect from "../../../master/components/FilterSelect";
import moment from "moment";
import GenerateForm from "../../../../components/forms/GenerateForm";

export default function AddLicencesModel({
  setShowModel,
  showModel,
  getLicences,
  getOrg,
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
    number: "",
    renewal_date: "",
  });

  const resetFormData = () => {
    setFormData({ name: "", number: "", renewal_date: "" });
  };

  const onSubmit = async () => {
    const { name, number, renewal_date } = formData;
    if (name !== "" && number !== "" && renewal_date !== "") {
      setloading(true);
      const formData_ = formData;
      formData_.group_id = selectedGroup;
      formData_.entity_id = selectedEntity;
      formData_.unit_id = selectedUnit;
      formData_.renewal_date = moment(formData_.renewal_date);

      try {
        const added = await post(`/licence/`, formData_);
        if (added && added.success) {
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

        getLicences(selectedUnit);
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
        title="Add Licences"
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
                  getLicences();
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

const formField = [
  {
    label: "Licence Name",
    placeholder: "Enter licence name",
    field: "name",
    inputType: "text",
  },
  {
    label: "Licence Number",
    placeholder: "Enter licence number",
    field: "number",
    inputType: "text",
  },
  {
    label: "Renewal date",
    placeholder: "Enter renewal date",
    field: "renewal_date",
    inputType: "date",
  },
];
