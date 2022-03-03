import { Button, Col, Modal, Row } from "antd";
import React, { useState, useEffect } from "react";
import CustomTable from "../../../components/data-display/table/CustomTable";
import { TextInput } from "../../../components/forms";
import { get, post } from "../../../../api/HTTPService";
import { Select } from "antd";
const { Option } = Select;

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
    title: "Task Description",
    dataIndex: "taskDescription",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Person",
    dataIndex: "person",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const frequencies = [
  "one time",
  "weekly",
  "monthly",
  "quarterly",
  "half yearly",
  "annually",
  "3 yearly",
  "5 yearly",
  "10 yearly",
  "event based",
  "ongoing",
];

const severityList = [
  {
    id: 1,
    value: "Low",
  },
  {
    id: 2,
    value: "Mid",
  },
  {
    id: 3,
    value: "High",
  },
];

export default ({ selectedRow }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUses();
    getDepartments();
    getTasks();
  }, []);

  const getDepartments = () => {
    get("/department").then((res) => {
      setDepartments(res);
    });
  };

  const getUses = () => {
    get("/users").then((res) => {
      setUsers(res);
    });
  };

  const getTasks = () => {
    get("/tasks").then((res) => {
      const dataModified = res.map((task, indexValue) => {
        return {
          index: indexValue + 1,
          taskName: task.task_name,
          taskDescription: task.task_description,
          department: task.departments.length
            ? (departments.find(
                (department) => department.id === task.departments[0]
              ) || {})["name"]
            : "",
          person: task.persons.length
            ? (users.find((user) => user.id === task.persons[0]) || {})["name"]
            : "",
          dueDate: new Date(task.due_date || "").toLocaleDateString(),
          status: task.status || "PENDING",
        };
      });
      setData(dataModified);
    });
  };

  const onValueChange = (name, value) => {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onFormSubmit = () => {
    const {
      department,
      dueDate,
      frequency,
      person,
      severity,
      startDate,
      taskDescription,
      taskName,
    } = formValue;
    post("/tasks", {
      task_name: taskName,
      task_description: taskDescription,
      start_date: startDate,
      due_date: dueDate,
      severity: 1,
      departments: [department],
      frequency: frequency,
      persons: [person],
    }).then((response) => {
      setShowUploadModal(false);
      getTasks();
    });
  };

  return (
    <>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "end" }}>
        <Button type="secoundry" onClick={() => setShowUploadModal(true)}>
          Create Task
        </Button>
      </div>
      <CustomTable loading={loading} columns={columns} dataSource={data} />
      <Modal
        centered
        visible={showUploadModal}
        onOk={() => setShowUploadModal(false)}
        onCancel={() => setShowUploadModal(false)}
        width={900}
        footer={[
          <div>
            <Button onClick={() => setShowUploadModal(false)}>Cancel</Button>
            <Button
              loading={loading}
              onClick={() => onFormSubmit()}
              type="secoundry"
            >
              Add Task
            </Button>
          </div>,
        ]}
      >
        <div className="modal-title">Create a new task</div>
        <Row>
          <Col span={10}>
            <TextInput
              label={"Task Name"}
              placeholder={"Enter Task Name"}
              name={"taskName"}
              onChange={(event) => {
                onValueChange("taskName", event.target.value);
              }}
              type={"text"}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={10}>
            <TextInput
              label={"Task Description"}
              placeholder={"Enter Task Description"}
              name={"taskDescription"}
              onChange={(event) => {
                onValueChange("taskDescription", event.target.value);
              }}
              type={"text"}
            />
          </Col>
        </Row>

        <Row>
          <Col span={10}>
            <TextInput
              label={"Start Date"}
              placeholder={"Enter Start Date"}
              name={"startDate"}
              onChange={(value) => {
                onValueChange("startDate", value);
              }}
              type={"date"}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={10}>
            {/* <TextInput
              label={"Severity"}
              placeholder={"Enter Severity"}
              name={"severity"}
              onChange={(event) => {
                onValueChange("severity", event.target.value);
              }}
              type={"text"}
            /> */}
            <div style={{ marginTop: "20px" }}>
              <label> Severity </label> <br />
              <Select
                placeholder={"Select Severity"}
                onChange={(value) => {
                  onValueChange("severity", value);
                }}
              >
                {severityList.map((severityValue) => (
                  <Option key={severityValue.id} value={severityValue.id}>
                    {severityValue.value}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={10}>
            <div style={{ marginTop: "20px" }}>
              <label> Department </label> <br />
              <Select
                placeholder={"Select Department"}
                onChange={(value) => {
                  onValueChange("department", value);
                }}
              >
                {departments.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col span={2}></Col>
          <Col span={10}>
            {/* <TextInput
              label={"Frequency"}
              placeholder={"Enter Frequency"}
              name={"frequency"}
              onChange={(event) => {
                onValueChange("frequency", event.target.value);
              }}
              type={"text"}
            /> */}
            <div style={{ marginTop: "20px" }}>
              <label> Frequency </label> <br />
              <Select
                placeholder={"Select Frequency"}
                onChange={(value) => {
                  onValueChange("frequency", value);
                }}
              >
                {frequencies.map((frequency) => (
                  <Option key={frequency} value={frequency}>
                    {frequency}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={10}>
            <div style={{ marginTop: "20px" }}>
              <label> Person </label> <br />
              <Select
                placeholder={"Select Person"}
                onChange={(value) => {
                  onValueChange("person", value);
                }}
              >
                {users.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col span={2}></Col>
          <Col span={10}>
            <TextInput
              label={"Due Date"}
              placeholder={"Enter Due Date"}
              name={"dueDate"}
              onChange={(value) => {
                onValueChange("dueDate", value);
              }}
              type={"date"}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
