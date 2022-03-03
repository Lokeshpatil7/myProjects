import React, { useState } from "react";
import { Table } from "antd";

const ComplianceTable = ({ setSelectedCompliences, originData, loading }) => {
  const [selectionType, ] = useState("checkbox");
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCompliences(selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  return (
    <div>
      <Table
        loading={loading}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={originData}
      />
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
