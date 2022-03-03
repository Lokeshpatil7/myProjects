import React from "react";
import { Modal, Button, Table } from "antd";
import { Colors } from "../../../../../assets/Colors";
import MoreOptions from "..";
// import MoreOptions from "../components/MoreOptions";
// import SuccessModal from "../../../../components/modals/SuccessModal";

function GroupAdminModal({
  setScreen,
  showModel,
  setShowModel,
  setUserToRemove,
}) {
  const myarray = [
    {
      label: "Remove Group Admin",
      onClick: () => {
        setScreen(3);
        setUserToRemove({ id: "abcd" });
        // setSelected({ ...row });
      },
    },
  ];

  const dataSource = [
    {
      key: "1",
      sr_no: 1,
      name: "4562",
      email: "The Code on Wages, 2019",
      actions: <MoreOptions actionsList={myarray} />,
    },
  ];

  const columns = [
    {
      title: "SR NO",
      dataIndex: "sr_no",
      key: "sr_no",
    },
    {
      title: "ADMIN NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ADMIN EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  return (
    <Modal
      title={"Admins"}
      centered
      visible={showModel}
      onOk={() => setShowModel(false)}
      onCancel={() => {
        setShowModel(false);
        setScreen(0);
      }}
      width={700}
      footer={[
        <div style={cls.submitDiv}>
          <Button
            style={cls.submitBtn}
            key="submit"
            onClick={() => setScreen(1)}
            // loading={loading}
          >
            ADD ADMIN
          </Button>
        </div>,
      ]}
    >
      {/* <div style={cls.titleDiv}>
        <label style={cls.title}>ABC Group - Add Admin</label>
      </div> */}

      <Table pagination={false} dataSource={dataSource} columns={columns} />
    </Modal>
  );
}

export default GroupAdminModal;

const cls = {
  submitDiv: {
    display: "flex",
    justifyContent: "center",
  },
  submitBtn: {
    backgroundColor: Colors.green,
    color: "white",
    padding: "1% 10%",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "2% 0",
  },
};
