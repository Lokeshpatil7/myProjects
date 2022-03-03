import React, { useState, useEffect } from "react";
import { Modal, notification, Row, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { put } from "../../../../../../../api/HTTPService";
import FilterSelect from "../../../../../master/components/FilterSelect";
import moment from "moment";
import GenerateForm from "../../../../../../components/forms/GenerateForm";

function EditForm({
  showModel,
  setShowModel,
  selected,
  setSelected,
  getOrg,
  getLicences,
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
    ...selected,
  });

  useEffect(() => {
    setFormData({ ...selected, renewal_date: moment(selected?.renewal_date) });
  }, [selected]);

  const onSubmit = async () => {
    const { name, number, renewal_date } = formData;

    if (name && number && renewal_date) {
      setloading(true);
      try {
        const addedUser = await put(`/licence/${selected.id}/`, {
          name,
          number,
          renewal_date,
          group_id: selectedGroup,
          entity_id: selectedEntity,
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

        getLicences(selectedUnit);

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
          title="Edit Licence"
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
                    getLicences(el);
                  }}
                />
              </div>
            </Col>

            <Col className="gutter-row" span={24}>
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
    placeholder: "Select renewal date",
    field: "renewal_date",
    inputType: "date",
  },
];
