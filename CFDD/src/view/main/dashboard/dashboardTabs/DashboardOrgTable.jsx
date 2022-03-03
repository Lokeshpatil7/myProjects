import React from "react";
import { Col, Card } from "antd";
import CustomTable from "../../../components/data-display/table/CustomTable";

const DashboardOrgTable = ({ units }) => {
  const columns = [
    {
      title: "Sr No",
      dataIndex: "index",
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
    },
    {
      title: "Entity Name",
      dataIndex: "entityName",
    },
    {
      title: "Unit Name",
      dataIndex: "unitName",
    },
    {
      title: "GST Number",
      dataIndex: "gst",
    },
    {
      title: "PAN",
      dataIndex: "pan",
    },
    {
      title: "Location Type",
      dataIndex: "unitLocationType",
    },
  ];
  return (
    <Card>
      <Col span={24}>
        <CustomTable dataSource={units} columns={columns} />
      </Col>
    </Card>
  );
};

export default DashboardOrgTable;
