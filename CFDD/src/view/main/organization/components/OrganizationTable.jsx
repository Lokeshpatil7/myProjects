import React, { useEffect, useState } from "react";
import EditableRowsTable from "../../../components/data-display/table/CustomTable";
import { get } from "../../../../api/HTTPService";
import MoreOptions from "../actions";
import { Row, Tag } from "antd";

function OrganizationTable({ loading, dataSource }) {
  const [, setOriginData] = useState([]);
  const myarray = [
    "Edit Organisation",
    "View Group Admin",
    "Delete Organisation",
  ];
  useEffect(() => {
    getRepo();
  }, []);

  const getRepo = () => {
    get("/compliances").then((res) => {
      if (res) {
        setOriginData(
          res.map((row, index) => {
            return {
              index: index + 1,
              ...row,
              ...{
                groupName: "ebay",
                entityName: "starbucks",
                legislationLaw_category: row.rule.legislation.law_category,
                entityAdmin: <div>Aditi Choudhary</div>,
                actions: <MoreOptions actionsList={myarray} />,
              },
            };
          })
        );
      }
    });
  };

  const columns = [
    {
      title: "SR NO",
      dataIndex: "index",
      width: "20px",
      editable: false,
    },
    {
      title: "UID",
      dataIndex: "ids",
      width: "240px",
      editable: false,
    },
    {
      title: "GROUP NAME",
      dataIndex: "name",
      width: "240px",
    },
    {
      title: "ENTITY NAME",
      dataIndex: "namez",
      width: "240px",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "240px",
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
      width: "240px",
    },
  ];

  return (
    <div>
      <Row gutter={[0, 5]} justify="end"></Row>
      <EditableRowsTable
        loading={loading}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
}

export default OrganizationTable;
