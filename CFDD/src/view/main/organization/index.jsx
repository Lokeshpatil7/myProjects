import React, { useState, useEffect } from "react";
import MoreOptions from "./actions";
import { get } from "../../../api/HTTPService";
import OrganizationTable from "./components/OrganizationTable";
import FiltersHeader from "../../components/tableFilter/FiltersHeader";
import { Button, Card, Row, Col } from "antd";
import EditOrgIndex from "./actions/editOrg";
import ViewEntities from "../organization/actions/viewEntities/index";
import ViewGroupAdminOrg from "./actions/viewGroupAdmin";
import AddOrg from "./actions/addOrg";
import DeleteOrg from "./actions/deleteOrg";

const Organization = () => {
  const [dataSource, setdataSource] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [showAddModule, setshowAddModule] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setloading] = useState(false);

  const [modalToShow, setModalToShow] = React.useState("");

  const setShowModel = () => {
    setModalToShow("");
  };

  useEffect(() => {
    getOrg();
  }, []);

  const getOrg = () => {
    setloading(true);
    get("/groups/").then((res) => {
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
                  label: "View Group Admin",
                  onClick: () => {
                    setModalToShow("View Group Admin");
                    setSelected({ ...row });
                  },
                },
                {
                  label: "Delete Organization",
                  onClick: () => {
                    setModalToShow("Delete Organization");
                    setSelected({ ...row });
                  },
                },
                // {
                //     label: "Delete users",
                //     onClick: () => {
                //         setuserToDelete(row.id);
                //     },
                // },
              ]}
            />
          ),
          //   delete: <DeleteFilled onClick={() => alert("working")} />,
        };
      });
      setdataSource(originData_);
      setFilterData(originData_);
      setloading(false);
    });
  };

  const filterCol = [{ label: "User Type", colName: "user_type" }];

  return (
    <Card span={24} className="da-border-color-black-40 ant-card">
      <Row gutter={[1, 10]}>
        <Col span={22}>
          <FiltersHeader
            filterData={filterData}
            originData={dataSource}
            setFilterData={setFilterData}
            cols={filterCol}
          />
        </Col>
        <Col>
          <Button type="secoundry" onClick={() => setshowAddModule(true)}>
            Add
          </Button>
        </Col>
      </Row>
      <br />

      <Row style={{ overflowX: "auto" }}>
        <OrganizationTable loading={loading} dataSource={dataSource} />
      </Row>

      <AddOrg
        selected={selected}
        setSelected={setSelected}
        getOrg={getOrg}
        showModel={showAddModule}
        setShowModel={setshowAddModule}
      />

      <EditOrgIndex
        getOrg={getOrg}
        selected={selected}
        setSelected={setSelected}
        showModel={modalToShow === "Edit Organization"}
        setShowModel={setShowModel}
      />

      <ViewGroupAdminOrg
        showModel={modalToShow === "View Group Admin"}
        setShowModel={setShowModel}
      ></ViewGroupAdminOrg>

      <ViewEntities
        getOrg={getOrg}
        selected={selected}
        setSelected={setSelected}
        showModel={modalToShow === "View Entities"}
        setShowModel={setShowModel}
      ></ViewEntities>

      {/* <AddUsers
        showModel={modalToShow === "Add user"}
        setShowModel={setShowModel}
      ></AddUsers> */}
      <DeleteOrg
        selectedEntity={selected}
        showModel={modalToShow === "Delete Organization"}
        setShowModel={setShowModel}
      />
    </Card>
  );
};

export default Organization;
