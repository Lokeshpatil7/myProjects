import React, { useState, useEffect } from "react";
// import MoreOptions from "./components/actions";
import { get } from "../../../../api/HTTPService";
import OrganizationTable from "./components/OrganizationTable";
import { Button, Row, Col } from "antd";
import EditOrgIndex from "./components/actions/editOrg/index";
import AddOrg from "./components/addOrg";
import DeleteOrg from "./components/actions/deleteOrg";
import FilterSelect from "../components/FilterSelect";
import MoreOptions from "../../../components/data-display/tableActions";

const Organization = () => {
  const [dataSource, setdataSource] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalToShow, setModalToShow] = React.useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const setShowModel = () => {
    setModalToShow("");
  };

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
      const originData_ = res.map((row, index) => {
        return {
          index: index + 1,
          ...row,
          actions: (
            <MoreOptions
              actionsList={[
                {
                  label: "Edit Organization",
                  onClick: () => {
                    setModalToShow("Edit Organization");
                    setSelected({ ...row });
                  },
                },
                {
                  label: "Delete Organization",
                  onClick: () => {
                    setModalToShow("Delete Organization");
                    setSelected(row.id);
                  },
                },
              ]}
            />
          ),
        };
      });
      setdataSource(originData_);
      // setFilterData(originData_);
    });
  };

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <FilterSelect
            placeholder="Select Group"
            options={groups}
            label="name"
            value="id"
            // selectedValue={selectedGroup}
            onChange={(el) => {
              setSelectedGroup(el);
              getOrg(el);
            }}
          />
        </Col>
        <Col span={13}></Col>
        <Col>
          <Button
            type="secoundry"
            onClick={() => setModalToShow("Add Organization")}
          >
            Add
          </Button>
        </Col>
      </Row>
      <br />

      <OrganizationTable dataSource={dataSource} />

      <AddOrg
        getOrg={getOrg}
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        showModel={modalToShow === "Add Organization"}
        setShowModel={setShowModel}
      />

      <EditOrgIndex
        getOrg={getOrg}
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        selected={selected}
        setSelected={setSelected}
        showModel={modalToShow === "Edit Organization"}
        setShowModel={setShowModel}
      />

      <DeleteOrg
        getOrg={getOrg}
        selectedEntity={selected}
        selectedGroup={selectedGroup}
        showModel={modalToShow === "Delete Organization"}
        setShowModel={setShowModel}
      />
    </div>
  );
};

export default Organization;
