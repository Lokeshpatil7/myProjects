import React from "react";
// import EditableRowsTable from "../../components/data-display/table/editableRows";
import EditableRowsTable from "../../../../components/data-display/table/CustomTable";
import { Row } from "antd";

function UnitTable({ dataSource }) {
  return (
    <div>
      <Row gutter={[0, 5]} justify="end"></Row>
      <EditableRowsTable columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default UnitTable;

const columns = [
  {
    title: "SR NO",
    dataIndex: "index",
    width: "20px",
    editable: false,
  },

  {
    title: "UNIT NAME",
    dataIndex: "name",
    width: "40px",
  },

  {
    title: "ADDRESS",
    dataIndex: "address",
    width: "40px",
  },
  {
    title: "LOCATION TYPE",
    dataIndex: "location_type",
    width: "40px",
  },
  {
    title: "actions",
    dataIndex: "actions",
    width: "40px",
  },
];
