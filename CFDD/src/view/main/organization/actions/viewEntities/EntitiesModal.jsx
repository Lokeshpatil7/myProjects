import React from "react";
import { Modal, Button, Table } from "antd";
import { Colors } from "../../../../../assets/Colors";
// import MoreOptions from "../components/MoreOptions";
// import SuccessModal from "../../../../components/modals/SuccessModal";

function EntitiesModal({ setScreen, showModel, setShowModel, onsubmit }) {
  // const myarray = ["Edit Admin", "Delete Admin"];

  const dataSource = [
    {
      key: "1",
      sr_no: 1,
      name: "4562",
      email: "The Code on Wages, 2019",
      // actions: <MoreOptions actionsList={myarray} />,
      actions: "",
    },
  ];

  const columns = [
    {
      title: "SR NO",
      dataIndex: "sr_no",
      key: "sr_no",
    },
    {
      title: "UID",
      dataIndex: "sr_no",
      key: "uid",
    },
    {
      title: "ENTITY NAME",
      dataIndex: "sr_no",
      key: "entity_name",
    },
    {
      title: "UNIT",
      dataIndex: "name",
      key: "unit",
    },
    {
      title: "GST NUMBER",
      dataIndex: "name",
      key: "gst_number",
    },
    {
      title: "PAN",
      dataIndex: "name",
      key: "pan",
    },
    {
      title: "UNIT LOCATIONS",
      dataIndex: "name",
      key: "unit_location",
    },
    {
      title: "ENTITY ADMIN",
      dataIndex: "name",
      key: "entity_admin",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  return (
    <Modal
      centered
      visible={showModel}
      onOk={() => setShowModel(false)}
      onCancel={() => setShowModel(false)}
      width={1200}
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
      <div style={cls.titleDiv}>
        <label style={cls.title}>ABC Group - Entities</label>
      </div>

      <Table pagination={false} dataSource={dataSource} columns={columns} />
    </Modal>
  );
}

export default EntitiesModal;

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
