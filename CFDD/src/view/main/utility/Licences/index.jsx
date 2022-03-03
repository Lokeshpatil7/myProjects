import React, { useState, useEffect } from "react";
import { get } from "../../../../api/HTTPService";
import LicencesTable from "./components/LicencesTable";
import { Button, Row, Col } from "antd";
import AddLicences from "./components/AddLicences";
import FilterSelect from "../../master/components/FilterSelect";
import moment from "moment";
import DeleteLicence from "./components/actions/deleteLicence";
import EditLicence from "./components/actions/editLicences";
import MoreOptions from "../../../components/data-display/tableActions";

export default function Licences() {
  const [dataSource, setdataSource] = useState([]);
  const [modalToShow, setModalToShow] = React.useState("");
  const [selectedLicence, setselectedLicence] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [entites, setEntites] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = () => {
    get("/groups").then((res) => {
      if (res.data) setGroups(res.data);
    });
  };
  const getOrg = (selectedGroup) => {
    get(`/group/${selectedGroup}/entity/`).then((res) => {
      if (res.data) setEntites(res.data);
    });
  };

  const getUnit = (selectedEntity) => {
    get(`/entity/${selectedEntity}/unit/`).then((res) => {
      if (res.data) setUnits(res.data);
    });
  };

  const getLicences = (selectedUnit) => {
    get(`/licence/unit/${selectedUnit}`).then((res) => {
      const originData_ = res.data.map((row, index) => {
        return {
          index: index + 1,
          ...row,
          renewal_date: moment(row.renewal_date).format("DD-MM-YYYY"),
          actions: (
            <MoreOptions
              actionsList={[
                {
                  label: "Edit Licence",
                  onClick: () => {
                    setModalToShow("Edit Licence");
                    setselectedLicence({ ...row });
                  },
                },
                {
                  label: "Delete Licence",
                  onClick: () => {
                    setModalToShow("Delete Licence");
                    setselectedLicence(row.id);
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
      <Row gutter={16}>
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
              getLicences(el);
            }}
          />
        </Col>
        <Col span={4}></Col>
        <Col span={2}>
          <Button
            type="secoundry"
            onClick={() => setModalToShow("Add Licences")}
          >
            Add
          </Button>
        </Col>
      </Row>
      <br />

      <LicencesTable dataSource={dataSource} />

      <AddLicences
        getLicences={getLicences}
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
        showModel={modalToShow === "Add Licences"}
        setShowModel={setModalToShow}
      />

      <EditLicence
        getLicences={getLicences}
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
        selected={selectedLicence}
        setSelected={setselectedLicence}
        showModel={modalToShow === "Edit Licence"}
        setShowModel={setModalToShow}
      />

      <DeleteLicence
        getLicences={getLicences}
        selectedUnit={selectedUnit}
        selectedLicence={selectedLicence}
        showModel={modalToShow === "Delete Licence"}
        setShowModel={setModalToShow}
      />
    </div>
  );
}
