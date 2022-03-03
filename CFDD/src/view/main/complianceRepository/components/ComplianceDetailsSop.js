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
    title: "Document Number",
    dataIndex: "documentNumber",
  },
  {
    title: "SOP Name",
    dataIndex: "sopName",
  },
  {
    title: "SOP originator",
    dataIndex: "sopOriginator",
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
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "end" }}>
        <Button type="secoundry" onClick={() => setShowUploadModal(true)}>
          Upload Document
        </Button>
      </div>
      <CustomTable loading={loading} columns={columns} dataSource={data} />
      <Modal
        centered
        visible={showUploadModal}
        onOk={() => null}
        onCancel={() => null}
        width={900}
        footer={[
          <div>
            <Button onClick={() => null}>Cancel</Button>
            <Button loading={loading} onClick={() => ""} type="secoundry">
              Add Document
            </Button>
          </div>,
        ]}
      >
        <div className="modal-title">Add new document</div>
        <TextInput
          label={"Document Name"}
          placeholder={"Enter Document Name"}
          name={"documentNumber"}
          onChange={(event) => {
            onValueChange("documentNumber", event.target.value);
          }}
          type={"text"}
        />
        <TextInput
          label={"SOP Name"}
          placeholder={"Enter SOP Name"}
          name={"sopName"}
          onChange={(event) => {
            onValueChange("sopName", event.target.value);
          }}
          type={"text"}
        />
        <TextInput
          label={"SOP originator"}
          placeholder={"Enter SOP originator"}
          name={"sopOriginator"}
          onChange={(event) => {
            onValueChange("sopOriginator", event.target.value);
          }}
          type={"text"}
        />
        <strong>Attachment</strong>
      </Modal>
    </>
  );
};
