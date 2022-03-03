import React from "react";
import { Table } from "antd";

const CustomTable = ({
  loading,
  dataSource,
  columns,
  allowRowSelect = false,
  onChange = () => {},
}) => {
  return (
    <div style={{ overflowY: "auto" }}>
      <Table
        rowSelection={
          allowRowSelect
            ? {
                onChange: onChange,
              }
            : null
        }
        scroll={{ x: "max-content" }}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default CustomTable;
