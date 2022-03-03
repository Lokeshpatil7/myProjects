import React, { useState, useEffect } from "react";
import { Modal, notification, Row, Col, Button } from "antd";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { put } from "../../../../../../../api/HTTPService";
import FilterSelect from "../../../../../master/components/FilterSelect";
import moment from "moment";
import { s3Upload } from "../../../../../../../utils/s3/s3Upload";
import GenerateForm from "../../../../../../components/forms/GenerateForm";

function EditForm({
  showModel,
  setShowModel,
  selected,
  setSelected,
  getOrg,
  getAssets,
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
    setFormData({
      ...selected,
      asset_renewal_date: moment(selected?.asset_renewal_date),
    });
  }, [selected]);

  const onSubmit = async () => {
    let {
      name,
      number,
      asset_renewal_date,
      compliance_type,
      asset_image_link,
    } = formData;

    //  upload file to s3 first
    if (asset_image_link.name) {
      asset_image_link = await (
        await s3Upload(asset_image_link, "assets")
      ).location;
    }

    if (name && number && asset_renewal_date) {
      setloading(true);
      try {
        const updated = await put(`/asset/${selected.id}/`, {
          name,
          number,
          asset_renewal_date,
          compliance_type,
          asset_image_link,
          group_id: selectedGroup,
          entity_id: selectedEntity,
          unit_id: selectedUnit,
        });
        if (updated && updated.success) {
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

        getAssets(selectedUnit);

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
          title="Edit Asset"
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
                    getAssets(el);
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
    label: "Asset name",
    placeholder: "Enter",
    field: "name",
    inputType: "text",
  },
  {
    label: "Asset number",
    placeholder: "Enter",
    field: "number",
    inputType: "text",
  },
  {
    label: "Type of complaince",
    placeholder: "Enter",
    field: "compliance_type",
    inputType: "text",
  },
  {
    label: "Asset compliance due date",
    placeholder: "Enter",
    field: "asset_renewal_date",
    inputType: "date",
  },
  {
    label: "Add image (optional)",
    placeholder: "select Image",
    field: "asset_image_link",
    inputType: "file",
    accept: "image/*",
  },
];
