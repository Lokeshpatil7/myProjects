import React, { useState, useEffect } from "react";
import { Modal, notification, Row, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import FilterSelect from "../../../../components/FilterSelect";

import { put } from "../../../../../../../api/HTTPService";
import GenerateForm from "../../../../../../components/forms/GenerateForm";

function EditForm({
  showModel,
  setShowModel,
  selected,
  setSelected,
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
  const [formData, setFormData] = useState({ ...selected });

  useEffect(() => {
    setFormData({ ...selected });
  }, [selected]);

  const onSubmit = async () => {
    const { name } = formData;

    if (name !== "") {
      setloading(true);
      try {
        const addedUser = await put(`/department/${selected.id}/`, {
          name,
          unit_id: selectedUnit,
        }).then();
        if (addedUser && addedUser.success) {
          notification.open({
            message: "Data Updated Successfully",
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

        setSelected(null);
        setloading(false);
      } catch (e) {
        notification.open({
          message: "Error",
          description: e.response.message
            ? e.response.message
            : "something went wrong.",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });

        setSelected(null);
        setloading(false);
        // handleModleClose();
      }
    }
  };

  return (
    <div>
      {selected && (
        <Modal
          centered
          title="Edit Department"
          visible={showModel}
          onOk={() => setShowModel(false)}
          onCancel={() => setShowModel(false)}
          width={1000}
          footer={[
            <Button
              key="submit"
              type="secoundry"
              loading={loading}
              onClick={onSubmit}
            >
              Update
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
                    getDepartment(el);
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
      )}
    </div>
  );
}

export default EditForm;

const formField = [
  {
    label: "Department name",
    placeholder: "Enter",
    field: "name",
    inputType: "text",
  },
];
