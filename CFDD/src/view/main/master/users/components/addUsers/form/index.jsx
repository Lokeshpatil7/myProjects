import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import FormFilds from "./filedDetails";
import { TextInput, SelectInput } from "../../../../../../components/forms";
import { get } from "../../../../../../../api/HTTPService";
import FilterSelect from "../../../../components/FilterSelect";
import SelectInputWithObjectOptions from "../../../../../../components/forms/selectInputWithObjectOptions";

function AddUserForm({ formData, setFormData, roles, departments }) {
  const [groups, setGroups] = useState([]);
  const [entites, setEntites] = useState([]);

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = () => {
    get("/groups").then((res) => {
      setGroups(res);
    });
  };

  const getOrg = (selectedGroup) => {
    get(`/entity?groupId=${selectedGroup}`).then((res) => {
      if (res) setEntites(res);
    });
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {FormFilds.map((fieldDetail, index) => (
          <Col key={index} className="gutter-row" span={12}>
            {fieldDetail.inputType === "text" ? (
              <TextInput
                label={fieldDetail.lable}
                placeholder={fieldDetail.placeholder}
                field={fieldDetail.fild}
                value={formData[fieldDetail.fild]}
                onChange={(e) => {
                  setFormData((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  });
                }}
              />
            ) : (
              <SelectInputWithObjectOptions
                isMultiSelect={
                  fieldDetail.fild === "departments" ? true : false
                }
                label={fieldDetail.lable}
                placeholder={fieldDetail.placeholder}
                options={
                  fieldDetail.fild === "departments" ? departments : roles
                }
                keyField={"id"}
                valueField={
                  fieldDetail.fild === "departments" ? "name" : "role_type"
                }
                value={formData[fieldDetail.fild]}
                onChange={(e) => {
                  setFormData((prev) => {
                    return { ...prev, [fieldDetail.fild]: e };
                  });
                }}
              ></SelectInputWithObjectOptions>
            )}
          </Col>
        ))}

        {/* <Col span={12}>
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
        </Col> */}
        {/* <Col span={12}>
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
        </Col> */}
      </Row>
    </div>
  );
}

export default AddUserForm;
