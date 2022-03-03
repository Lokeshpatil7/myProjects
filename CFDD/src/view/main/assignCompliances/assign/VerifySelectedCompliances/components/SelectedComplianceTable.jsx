import React from "react";
import { Table } from "antd";

const ComplianceTable = ({ selectedCompliences }) => {
  return (
    <div>
      <Table columns={columns} dataSource={selectedCompliences} />
    </div>
  );
};

export default ComplianceTable;

const columns = [
  {
    title: "SR NO",
    dataIndex: "key",
    width: "100px",
  },
  {
    title: "UID",
    dataIndex: "UID",
    width: "250px",
  },
  {
    title: "Name of Legislation",
    dataIndex: "legislationName",
    width: "400px",
  },
  {
    title: "ECG Category",
    dataIndex: "legislationEsg_category",
    width: "140px",
  },
  {
    title: "UID Title",
    dataIndex: "title",
    width: "250px",
  },
];
