import { Button, Modal } from "antd";
import React, { useState } from "react";
import CustomTable from "../../../components/data-display/table/CustomTable";
import { TextInput } from "../../../components/forms";

const columns = [
  {
    title: "SR NO",
    dataIndex: "index",
  },
  {
    title: "Task Name",
    dataIndex: "taskName",
  },
  {
    title: "Auditor Name",
    dataIndex: "auditorName",
  },
  {
    title: "Comments",
    dataIndex: "comments",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Audit Status",
    dataIndex: "auditStatus",
  },
];

export default ({ selectedRow }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formValue, setFormValue] = useState({});
  const onValueChange = (name, value) => {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <>
      <CustomTable loading={loading} columns={columns} dataSource={data} />
    </>
  );
};
