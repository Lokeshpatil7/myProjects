import React, { useState } from "react";
import { Table } from "antd";
import editIcon from "../../../../../assets/images/utility/edit-icon.svg";

const data = [
  {
    key: "1",
    sr_no: "1",
    uid: "John Brown",
    task_name: "Salary slips",
    task_desc: "Submit the salary slips",
    dept: "Human resources",
    person: "NA",
    due_date: "27 Oct 2021",
  },
  {
    key: "2",
    sr_no: "2",
    uid: "John Brown",
    task_name: "Salary slips",
    task_desc: "Submit the salary slips",
    dept: "Human resources",
    person: "NA",
    due_date: "27 Oct 2021",
  },
  {
    key: "3",
    sr_no: "3",
    uid: "John Brown",
    task_name: "Salary slips",
    task_desc: "Submit the salary slips",
    dept: "Human resources",
    person: "NA",
    due_date: "27 Oct 2021",
  },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(
    //   `selectedRowKeys: ${selectedRowKeys}`,
    //   "selectedRows: ",
    //   selectedRows
    // );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const TasksTable = ({ setVisible }) => {
  const [selectionType, ] = useState("checkbox");
  const links = "http://dev.demoapps.ind.in/";
  const columns = [
    {
      title: "SR NO",
      dataIndex: "sr_no",
    },
    {
      title: "UID",
      dataIndex: "uid",
    },
    {
      title: "task name",
      dataIndex: "task_name",
    },
    {
      title: "task description",
      dataIndex: "task_desc",
    },
    {
      title: "department",
      dataIndex: "dept",
    },
    {
      title: "person",
      dataIndex: "person",
    },
    {
      title: "due date",
      dataIndex: "due_date",
    },
    {
      title: "Link to existing task",
      dataIndex: "link_existing_task",
      render: () => (
        <a href={links} target="_blank" rel="noreferrer" style={{ color: "#179864" }}>
          http://dev.demoapps.ind.in/
        </a>
      ),
    },
    {
      title: "edit",
      dataIndex: "edit",
      render: () => (
        <img
          className="utility-tasks-edit"
          onClick={() => setVisible(true)}
          alt=""
          src={editIcon}
        />
      ),
    },
  ];
  return (
    <div style={{ overflowY: "auto" }}>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default TasksTable;
