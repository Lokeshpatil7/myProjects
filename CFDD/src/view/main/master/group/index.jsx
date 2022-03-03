import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { get } from "../../../../api/HTTPService";
import GroupTable from "./grouptable/GroupTable";
import AddGroup from "./addGroup/";
// import MoreOptions from "../compliances/actions/index";
import DeleteGroup from "./actions/deleteGroup";
import EditGroup from "./actions/editgroup";
import MoreOptions from "../../../components/data-display/tableActions";

const Group = () => {
  const [dataSource, setDataSource] = useState([]);
  const [showAddModel, setShowAddModel] = useState(false);
  const [modalShow, setModalShow] = useState("");
  const [selected, setSelected] = useState(null);

  const ShowModal = () => {
    setModalShow("");
  };

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = () => {
    get("/groups").then((res) => {
      const originData_ = res.map((row, index) => {
        return {
          index: index + 1,
          ...row,
          actions: (
            <MoreOptions
              actionsList={[
                {
                  label: "Edit Group",
                  onClick: () => {
                    setModalShow("Edit Group");
                    setSelected({ ...row });
                  },
                },
                {
                  label: "Delete Group",
                  onClick: () => {
                    setModalShow("Delete Group");
                    setSelected(row.id);
                  },
                },
              ]}
            />
          ),
          //   delete: <DeleteFilled onClick={() => alert("working")} />,
        };
      });
      setDataSource(originData_);
      // setFilterData(originData_);
    });
  };

  return (
    <div>
      <Row>
        <Col span={20}></Col>
        <Col>
          <Button
            onClick={() => {
              setShowAddModel(true);
            }}
            type="secoundry"
          >
            Add
          </Button>
        </Col>
      </Row>
      <br />
      <GroupTable dataSource={dataSource} />

      <AddGroup
        visible={showAddModel}
        setVisible={setShowAddModel}
        getGroup={getGroup}
      />

      <EditGroup
        getGroup={getGroup}
        selected={selected}
        setSelected={setSelected}
        showModel={modalShow === "Edit Group"}
        setShowModel={ShowModal}
      />

      <DeleteGroup
        selected={selected}
        getGroup={getGroup}
        setSelected={setSelected}
        showModel={modalShow === "Delete Group"}
        setShowModel={ShowModal}
      />
    </div>
  );
};

export default Group;
