import React, { useState, useEffect } from "react";
import { Modal, notification, Row, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { put } from "../../../../../../../api/HTTPService";
import FilterSelect from "../../../../components/FilterSelect";
import GenerateForm from "../../../../../../components/forms/GenerateForm";

function EditOrg({
  showModel,
  setShowModel,
  selected,
  setSelected,
  getOrg,
  getUnit,
  groups,
  selectedGroup,
  setSelectedGroup,
  entities,
  selectedEntity,
  setSelectedEntity,
}) {
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({ ...selected });

  useEffect(() => {
    setFormData({ ...selected });
  }, [selected]);

  const resetFormData = () => {
    setFormData({ name: "", address: "", location_type: "" });
  };

  const onSubmit = async () => {
    const { name, address, location_type } = formData;
    if (name !== "" && address !== "" && location_type !== "") {
      setloading(true);
      try {
        const added = await put(`/unit/${selected.id}/`, {
          name,
          address,
          location_type,
          organization_id: selectedEntity,
        });
        if (added) {
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
          resetFormData();
          getUnit(selectedEntity);
          setSelected(null);
          setloading(false);
        }
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
          title="Edit Unit"
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
      )}
    </div>
  );
}

export default EditOrg;

const formField = [
  {
    label: "Unit name",
    placeholder: "Enter",
    field: "name",
    inputType: "text",
  },
  {
    label: "Address",
    placeholder: "Enter",
    field: "address",
    inputType: "text",
  },
  {
    label: "Location type ",
    placeholder: "Enter",
    field: "location_type",
    inputType: "text",
  },
];
