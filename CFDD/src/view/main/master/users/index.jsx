import React, { useEffect, useState } from "react";
import { get } from "../../../../api/HTTPService";
import UserTable from "./components/UserTable";
import { Row, Col, Button } from "antd";
import AddUserModel from "./components/addUsers";
import EditUserModel from "./components/actions/editUser";
import DeleteUser from "./components/actions/deleteUser";
import MoreOptions from "../../../components/data-display/tableActions";

export default ({ isOnboarding, setSelectedRows, onAssign }) => {
  const [dataSource, setdataSource] = useState([]);
  const [, setFilterData] = useState([]); // filterData
  const [showAddModule, setshowAddModule] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [userToDelete, setuserToDelete] = useState("");
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getUses();
    getRoles();
    getDepartments();
  }, []);

  const getRoles = () => {
    get("/roles").then((res) => {
      setRoles(res);
    });
  };

  const getDepartments = () => {
    get("/department").then((res) => {
      setDepartments(res);
    });
  };

  const getUses = () => {
    get("/users").then((res) => {
      const originData_ = res.map((row, index) => {
        return {
          index: index + 1,
          role_type: row.role.role_type,
          ...row,
          key: row.id,
          actions: (
            <MoreOptions
              actionsList={[
                {
                  label: "Edit users",
                  onClick: () => {
                    setDataToEdit({ ...row });
                  },
                },
                {
                  label: "Delete users",
                  onClick: () => {
                    setuserToDelete(row.id);
                  },
                },
              ]}
            />
          ),
          //   delete: <DeleteFilled onClick={() => alert("working")} />,
        };
      });
      setdataSource(originData_);
      setFilterData(originData_);
    });
  };

  // const filterCol = [{ label: "User Type", colName: "user_type" }];

  return (
    <div>
      <Row>
        <Col span={isOnboarding ? 18 : 20}>
          {/* <FiltersHeader
            filterData={filterData}
            originData={dataSource}
            setFilterData={setFilterData}
            cols={filterCol}
          /> */}
        </Col>
        <Col span={isOnboarding ? 2 : 1}>
          <Button type="secoundry" onClick={() => setshowAddModule(true)}>
            Add
          </Button>
        </Col>
        {isOnboarding && (
          <Col>
            <Button type="secoundry" onClick={() => onAssign()}>
              Assign User(s)
            </Button>
          </Col>
        )}
      </Row>
      <br />
      <UserTable
        isOnboarding={isOnboarding}
        dataSource={dataSource}
        setSelectedRows={setSelectedRows}
      />
      <AddUserModel
        getUses={getUses}
        visible={showAddModule}
        setVisible={setshowAddModule}
        roles={roles}
        departments={departments}
      />

      <EditUserModel
        getUses={getUses}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      ></EditUserModel>

      <DeleteUser
        userId={userToDelete}
        setUserId={setuserToDelete}
        getUses={getUses}
      ></DeleteUser>
    </div>
  );
};
