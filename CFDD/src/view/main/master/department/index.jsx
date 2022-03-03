import React, { useState, useEffect } from "react";
import { get } from "../../../../api/HTTPService";
import DepartmentTable from "./components/DepartmentTable";
import { Button, Row, Col } from "antd";
import AddDepartment from "./components/addDepartment";
import EditDepartment from "./components/actions/editDepartment";
import DeleteDepartment from "./components/actions/deleteDepartment";
import FilterSelect from "../components/FilterSelect";
import MoreOptions from "../../../components/data-display/tableActions";

const Department = () => {
  const [dataSource, setdataSource] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalToShow, setModalToShow] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [entites, setEntites] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");

  const setShowModel = () => {
    setModalToShow("");
  };

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = () => {
    get("/groups").then((res) => {
      if (res) setGroups(res);
    });
  };
  const getOrg = (selectedGroup) => {
    get(`/entity?groupId=${selectedGroup}`).then((res) => {
      if (res) setEntites(res);
    });
  };

  const getUnit = (selectedEntity) => {
    get(`/unit?organizationId=${selectedEntity}`).then((res) => {
      if (res) setUnits(res);
    });
  };

  const getDepartment = (selectedUnit) => {
    get(`/department?unitId=${selectedUnit}`).then((res) => {
      const originData_ = res.map((row, index) => {
        return {
          index: index + 1,
          ...row,
          actions: (
            <MoreOptions
              actionsList={[
                {
                  label: "Edit Department",
                  onClick: () => {
                    setModalToShow("Edit Department");
                    setSelected({ ...row });
                  },
                },
                {
                  label: "Delete Department",
                  onClick: () => {
                    setModalToShow("Delete Department");
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
      <Row gutter={[20, 20]}>
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
            options={entites}
            label="name"
            value="id"
            onChange={(el) => {
              setSelectedEntity(el);
              getUnit(el);
            }}
          />
        </Col>

        <Col span={6}>
          <FilterSelect
            placeholder="Select Unit"
            options={units}
            label="name"
            value="id"
            // selectedValue={selectedEntity}
            onChange={(el) => {
              setSelectedUnit(el);
              getDepartment(el);
            }}
          />
        </Col>
        <Col span={4}></Col>
        <Col>
          <Button
            type="secoundry"
            onClick={() => setModalToShow("Add Department")}
          >
            Add
          </Button>
        </Col>
      </Row>
      <br />

      <DepartmentTable dataSource={dataSource} />

      <AddDepartment
        getDepartment={getDepartment}
        getOrg={getOrg}
        getUnit={getUnit}
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        entites={entites}
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
        units={units}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
        showModel={modalToShow === "Add Department"}
        setShowModel={setShowModel}
      />

      <EditDepartment
        getDepartment={getDepartment}
        getOrg={getOrg}
        getUnit={getUnit}
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        entites={entites}
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
        units={units}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
        selected={selected}
        setSelected={setSelected}
        showModel={modalToShow === "Edit Department"}
        setShowModel={setShowModel}
      />

      <DeleteDepartment
        getDepartment={getDepartment}
        selectedUnit={selectedUnit}
        selectedDept={selected}
        showModel={modalToShow === "Delete Department"}
        setShowModel={setShowModel}
      />
    </div>
  );
};

export default Department;
