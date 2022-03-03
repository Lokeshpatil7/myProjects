import React, { useState, useEffect } from "react";
import { get } from "../../../../api/HTTPService";
import UnitTable from "./components/UnitTable";
import { Button, Row, Col } from "antd";
import AddUnit from "./components/addUnit";
import EditUnit from "./components/actions/editUnit";
import DeleteUnit from "./components/actions/deleteUnit";
import FilterSelect from "../components/FilterSelect";
import MoreOptions from "../../../components/data-display/tableActions";

const Units = () => {
  const [dataSource, setdataSource] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalToShow, setModalToShow] = React.useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState("");
  const setShowModel = () => {
    setModalToShow("");
  };

  useEffect(() => {
    getGroup();
  }, [selectedGroup]);

  const getGroup = () => {
    get("/groups").then((res) => {
      if (res) setGroups(res);
    });
  };

  const getOrg = (selectedGroup) => {
    get(`/entity?groupId=${selectedGroup}`).then((res) => {
      if (res) setEntities(res);
    });
  };

  const getUnit = (selectedEntity) => {
    get(`/unit?organizationId=${selectedEntity}`).then((res) => {
      const originData_ = res.map((row, index) => {
        return {
          index: index + 1,
          ...row,
          actions: (
            <MoreOptions
              actionsList={[
                {
                  label: "Edit Unit",
                  onClick: () => {
                    setModalToShow("Edit Unit");
                    setSelected({ ...row });
                  },
                },
                {
                  label: "Delete Unit",
                  onClick: () => {
                    setModalToShow("Delete Unit");
                    setSelected(row.id);
                  },
                },
              ]}
            />
          ),
        };
      });
      setdataSource(originData_);
    });
  };

  return (
    <div>
      <Row
        gutter={[15, 15]}
        // gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}
      >
        <Col span={6}>
          <FilterSelect
            placeholder="Select Group"
            options={groups}
            label="name"
            value="id"
            onChange={(el) => {
              setSelectedGroup(el);
              getOrg(el);
            }}
          />
        </Col>

        <Col span={6}>
          <FilterSelect
            placeholder="Select Entity"
            options={entities}
            label="name"
            value="id"
            onChange={(el) => {
              setSelectedEntity(el);
              getUnit(el);
            }}
          />
        </Col>
        <Col span={10}></Col>
        <Col>
          <Button type="secoundry" onClick={() => setModalToShow("Add Unit")}>
            Add
          </Button>
        </Col>
      </Row>
      <br />

      <UnitTable dataSource={dataSource} />

      <AddUnit
        getUnit={getUnit}
        getOrg={getOrg}
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        entities={entities}
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
        showModel={modalToShow === "Add Unit"}
        setShowModel={setShowModel}
      />

      <EditUnit
        getUnit={getUnit}
        getOrg={getOrg}
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        entities={entities}
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
        selected={selected}
        setSelected={setSelected}
        showModel={modalToShow === "Edit Unit"}
        setShowModel={setShowModel}
      />

      <DeleteUnit
        getUnit={getUnit}
        selectedUnit={selected}
        selectedEntity={selectedEntity}
        showModel={modalToShow === "Delete Unit"}
        setShowModel={setShowModel}
      />
    </div>
  );
};

export default Units;
