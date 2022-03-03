import React from "react";
import CustomTable from "../../../../components/data-display/table/CustomTable";

export default function UserTable({
  dataSource,
  isOnboarding,
  setSelectedRows,
}) {
  const columns = [
    {
      title: "SR NO",
      dataIndex: "index",
      width: "100px",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "100px",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "100px",
    },
    {
      title: "User Type",
      dataIndex: "role_type",
      width: "100px",
    },
  ];

  if (!isOnboarding) {
    columns.push({
      title: "Action",
      dataIndex: "actions",
      width: "100px",
    });
  }

  return (
    <div>
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        allowRowSelect={isOnboarding ? true : false}
        onChange={(selectedRowKeys, selectedRows) => {
          setSelectedRows(selectedRows);
        }}
      />
    </div>
  );
}
