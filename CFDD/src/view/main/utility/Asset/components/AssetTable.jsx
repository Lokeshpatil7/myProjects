import React from "react";
import CustomTable from "../../../../components/data-display/table/CustomTable";

export default function LicencesTable({ dataSource }) {
  return (
    <div>
      <CustomTable dataSource={dataSource} columns={columns}></CustomTable>
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
    title: "Asset compliance due date",
    dataIndex: "asset_renewal_date",
    width: "100px",
  },

  {
    title: "Type of compliance",
    dataIndex: "compliance_type",
    width: "100px",
  },
  {
    title: "Picture",
    dataIndex: "asset_image_link",
    render: (url) => <img alt="" src={url}></img>,
    width: "100px",
  },

  {
    title: "Action",
    dataIndex: "actions",
    width: "100px",
  },
];
