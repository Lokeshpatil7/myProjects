import React from "react";
import EditableRowsTable from "../../../../components/data-display/table/CustomTable";
import { Row } from "antd";

function DepartmentTable({ dataSource }) {
  const columns = [
    {
      title: "SR NO",
      dataIndex: "index",
      width: "20px",
      editable: false,
    },

    {
      title: "Department NAME",
      dataIndex: "name",
      width: "40px",
    },

    {
      title: "actions",
      dataIndex: "actions",
      width: "40px",
    },
  ];

  return (
    <div>
      <Row gutter={[0, 5]} justify="end"></Row>
      <EditableRowsTable columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default DepartmentTable;
