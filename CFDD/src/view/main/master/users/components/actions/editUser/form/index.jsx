import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { get } from "../../../../../../../../api/HTTPService";
import FilterSelect from "../../../../../components/FilterSelect";
import GenerateForm from "../../../../../../../components/forms/GenerateForm";

function EditUserForm({ formData, setFormData }) {
  const [groups, setGroups] = useState([]);
  const [entites, setEntites] = useState([]);
  // const [formData, setFormData] = useState({
  //   name : "",
  //   email : "",
  //   phone : "",
  //   user_type : ""
  // })

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = () => {
    get("/groups").then((res) => {
      setGroups(res.data);
    });
  };

  const getOrg = (selectedGroup) => {
    get(`/group/${selectedGroup}/entity/`).then((res) => {
      if (res.data) setEntites(res.data);
    });
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
            <GenerateForm
              formField={formField}
              formData={formData}
              setFormData={setFormData}
              colSpan={8}
            />
          </Col>

        <Col span={12}>
          {(formData.user_type === "Group Admin" ||
            formData.user_type === "Entity Admin") && (
            <div>
              <div style={{ marginTop: "20px" }}>
                <label>Select Group</label>
              </div>
              <FilterSelect
                placeholder="Select Group"
                options={groups}
                label="name"
                value="id"
                onChange={(el) => {
                  getOrg(el);
                  setFormData((prev) => {
                    return { ...prev, group_id: el };
                  });
                }}
              />
            </div>
          )}
        </Col>
        <Col span={12}>
          {formData.user_type === "Entity Admin" && (
            <div>
              <div style={{ marginTop: "20px" }}>
                <label>Select Entity</label>
              </div>
              <FilterSelect
                placeholder="Select Entity"
                options={entites}
                label="name"
                value="id"
                onChange={(el) => {
                  setFormData((prev) => {
                    return { ...prev, entity_id: el };
                  });
                }}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default EditUserForm;


const formField = [
  {
    label: "Name",
    placeholder: "Enter Name",
    field: "name",
    inputType: "text",
  },

  {
    label: "email",
    placeholder: "Enter email",
    field: "email",
    inputType: "text",
  },
  {
    label: "phone",
    placeholder: "Enter phone",
    field: "phone",
    inputType: "text",
  },
  {
    label: "User Type",
    placeholder: "Select type",
    field: "user_type",
    inputType: "select",
    options: ["Super Admin", "Group Admin", "Entity Admin"],
  },
];