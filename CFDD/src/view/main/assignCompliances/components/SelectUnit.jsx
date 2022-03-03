import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { get } from "../../../../api/HTTPService";
import FilterSelect from "../../master/components/FilterSelect";

export default function SelectUnit({
  setSelectedGroup,
  setSelectedEntity,
  setSelectedUnit,
}) {
  const [groups, setGroups] = useState([]);
  const [entites, setEntites] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = () => {
    get("/groups").then((res) => {
      if (res.data) setGroups(res.data);
    });
  };
  const getEntity = (selectedGroup) => {
    setEntites([]);
    setSelectedEntity(undefined);
    get(`/group/${selectedGroup}/entity/`).then((res) => {
      if (res.data) setEntites(res.data);
    });
  };

  const getUnit = (selectedEntity) => {
    setUnits([]);
    get(`/entity/${selectedEntity}/unit/`).then((res) => {
      if (res.data) setUnits(res.data);
    });
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={8}>
          <FilterSelect
            placeholder="Select Group"
            options={groups}
            label="name"
            value="id"
            onChange={(el) => {
              setSelectedGroup(groups.find((group) => group.id === el));
              getEntity(el);
            }}
          />
        </Col>

        <Col span={8}>
          <FilterSelect
            placeholder="Select Entity"
            options={entites}
            label="name"
            value="id"
            onChange={(el) => {
              setSelectedEntity(entites.find((group) => group.id === el));
              getUnit(el);
            }}
          />
        </Col>

        <Col span={8}>
          <FilterSelect
            placeholder="Select Unit"
            options={units}
            label="name"
            value="id"
            onChange={(el) => {
              setSelectedUnit(units.find((units) => units.id === el));
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
