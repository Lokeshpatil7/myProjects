import React from "react";
import { Table, Tag } from "antd";

const GroupTable = ({ dataSource }) => {
  const columns = [
    {
      title: "GROUP NAME",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "GROUP ADMIN",
      dataIndex: "group_admin",
      key: "groupadmin",
      render: (users) => (
        <>
          {users?.map((user) => {
            return <Tag key={user}>{user.toUpperCase()}</Tag>;
          })}
        </>
      ),
      width: 300,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 300,
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default GroupTable;
