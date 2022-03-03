import React from "react";
import CustomTable from "../../../../components/data-display/table/CustomTable";

export default function LicencesTable({ dataSource }) {
  return (
    <div>
      <CustomTable dataSource={dataSource} columns={columns} />
    </div>
  );
}

const columns = [
  {
    title: "SR NO",
    dataIndex: "index",
    width: "100px",
  },
  {
    title: "LICID",
    dataIndex: "number",
    width: "100px",
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "100px",
  },

  {
    title: "Licence renewal date",
    dataIndex: "renewal_date",
    width: "100px",
  },
  {
    title: "Action",
    dataIndex: "actions",
    width: "100px",
  },
];
