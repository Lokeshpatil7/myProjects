import React from "react";
// import EditableRowsTable from "../../components/data-display/table/editableRows";
import EditableRowsTable from "../../../../components/data-display/table/CustomTable";
import { Row, Tag } from "antd";
// import ConfirmModal from "../../modals/ConfirmModal";
// import SuccessModal from "../../modals/SuccessModal";

function OrganizationTable({ dataSource }) {
  const columns = [
    {
      title: "SR NO",
      dataIndex: "index",
      width: "20px",
      editable: false,
    },

    {
      title: "ENTITY NAME",
      dataIndex: "name",
      width: "40px",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      width: "40px",
    },
    {
      title: "ENTITY TYPE",
      dataIndex: "entity_type",
      width: "40px",
    },
    {
      title: "ENTITY ADMIN",
      dataIndex: "entity_admin",
      key: "entity_admin",
      width: "40px",
      render: (users) => (
        <>
          {users?.map((user) => {
            return <Tag key={user}>{user.toUpperCase()}</Tag>;
          })}
        </>
      ),
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

export default OrganizationTable;
