import React from "react";
import { Table } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import editIcon from "../../../../assets/images/utility/edit-icon.svg";

const OnboardingTable = ({ setModal, dataSource, setSelectedRowId }) => {
  const columns = [
    {
      title: "Sr no",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "answer",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "delete",
      dataIndex: "delete",
      key: "delete",
      render: (_, data) => (
        <DeleteFilled
          onClick={() => {
            setSelectedRowId(data.id);
            setModal("Delete");
          }}
          style={{ cursor: "pointer", fontSize: "20px" }}
        />
      ),
    },
    {
      title: "edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, data) => (
        <img
          className="table-edit-btn"
          onClick={() => {
            setSelectedRowId(data.id);
            setModal("Edit Question");
          }}
          alt=""
          src={editIcon}
        />
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default OnboardingTable;
