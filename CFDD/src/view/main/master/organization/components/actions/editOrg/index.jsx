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
  groups,
  selectedGroup,
  setSelectedGroup,
}) {
  const [loading, setloading] = useState();
  const [formData, setFormData] = useState({ ...selected });
  useEffect(() => {
    setFormData({ ...selected });
  }, [selected]);

  const onSubmit = async () => {
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
        const added = await put(`/entity/${selected.id}/`, {
          name,
          address,
          unitType,
          gstin,
          pan_number,
          industry_type,
          entity_type,
          group_id: selectedGroup,
        });
        if (added && added.success) {
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

        getOrg(selectedGroup);

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
          title="Edit Organisation"
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
    label: "Entity name",
    placeholder: "Enter entity name",
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
    label: "GST Number",
    placeholder: "Enter gst number",
    field: "gstin",
    inputType: "text",
  },
  {
    label: "PAN",
    placeholder: "Enter pan",
    field: "pan_number",
    inputType: "text",
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
