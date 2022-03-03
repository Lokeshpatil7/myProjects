import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, Col, Row, Button } from "antd";

import { get, put } from "../../../api/HTTPService";
import { useHistory } from "react-router";
import FiltersHeader from "../../components/tableFilter/FiltersHeader";
import MoreOptions from "../../components/data-display/tableActions";
import CustomTable from "../../components/data-display/table/CustomTable";
import FilterSelect from "../master/components/FilterSelect";
// import ComplianceRepositoryTable from "./components/ComplianceRepositoryTable";
// import ComplianceDetails from "./components/ComplianceDetails";

export default ({ isOnboarding, setSelectedRows, onAssign }) => {
  const location = useLocation();
  const [, , path, complianceId] = location.pathname.split("/");
  const [showAddModule, setshowAddModule] = useState(false);

  const [originData, setOriginData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  //   const [legislation, setlegislation] = useState([]);
  //   const [rule, setrule] = useState([]);
  //   const [legislation_rule, setLegislation_rule] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [entites, setEntites] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");

  const history = useHistory();

  useEffect(() => {
    setOriginData([]);
    setFilterData([]);
  }, [location.search]);

  useEffect(() => {
    getGroup();
    setSelectedGroup("");
    setSelectedEntity("");
    setSelectedUnit("");
  }, []);

  const getGroup = () => {
    get("/groups").then((res) => {
      if (res) setGroups(res);
    });
  };
  const getOrg = (selectedGroup) => {
    get(`/entity?groupId=${selectedGroup}`).then((res) => {
      if (res) setEntites(res);
    });
  };

  const getUnit = (selectedEntity) => {
    get(`/unit?organizationId=${selectedEntity}`).then((res) => {
      if (res) setUnits(res);
    });
  };

  const columns = [
    {
      title: "SR NO",
      dataIndex: "index",
    },
    {
      title: "Task Title",
      dataIndex: "title",
      render: (text, row) => {
        return location.search === "?internal=true" ? (
          text
        ) : (
          <Link to={`/compliance-repository/details/${row.compliance_id}`}>
            {text}
          </Link>
        );
      },
    },
    {
      title: "Task Description",
      dataIndex: "description",
    },
    {
      title: "Name of Legislation",
      dataIndex: "legislationName",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
    },
    {
      title: "Severity",
      dataIndex: "severity",
    },

    {
      title: "User Assigned",
      dataIndex: "title",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Form Available",
      dataIndex: "form_details",
    },
    {
      title: "Attachment Available",
      dataIndex: "attachments",
    },
    {
      title: "actions",
      dataIndex: "actions",
    },
  ];

  const updateUnitCompliance = (unitComplianceId, status) => {
    put("/unitCompliances/" + unitComplianceId + "/" + status).then((res) => {
      setOriginData([]);
      setFilterData([]);
      getRepo();
    });
  };

  const updateTaskStatus = (taskId, status) => {
    put("/tasks/" + taskId + "/" + status).then((res) => {
      setOriginData([]);
      setFilterData([]);
      getTasks();
    });
  };

  const getRepo = (unitId) => {
    setloading(true);
    get("/unitCompliances/" + selectedUnit).then((res) => {
      const originData_ = res.map((row, index) => {
        return {
          key: row.id,
          index: index + 1,
          title: row.compliance.title,
          description: row.compliance.title,
          frequency: row.compliance.frequency,
          severity: row.compliance.severity,
          form_details: row.compliance.form_details,
          compliance_id: row.compliance_id,
          attachments: row.attachments,
          dueDate: new Date(row.due_Date || "").toLocaleDateString(),
          status: row.status,
          legislationName: row.compliance.rule.legislation.name,
          actions: (
            <MoreOptions
              actionsList={[
                ...["PENDING", "IN-PROGRESS", "COMPLETED"]
                  .filter((status) => status !== row.status)
                  .map((status) => {
                    return {
                      label: "Mark " + status,
                      onClick: () => {
                        updateUnitCompliance(row.id, status);
                      },
                    };
                  }),
              ]}
            />
          ),
        };
      });
      setOriginData(originData_);
      setFilterData(originData_);
      setloading(false);
    });
  };

  const getTasks = () => {
    setloading(true);
    get("/tasks").then((res) => {
      const dataModified = res.map((row, indexValue) => {
        return {
          key: row.id,
          index: indexValue + 1,
          title: row.task_name,
          description: row.task_description,
          frequency: row.frequency,
          severity: row.severity,
          form_details: "NA",
          compliance_id: row.compliance_id,
          attachments: row.attachments,
          dueDate: new Date(row.due_date || "").toLocaleDateString(),
          status: row.status || "PENDING",
          legislationName: row.compliance
            ? row.compliance.rule.legislation.name
            : "",
          actions: (
            <MoreOptions
              actionsList={[
                ...["PENDING", "IN-PROGRESS", "COMPLETED"]
                  .filter((status) => status !== row.status)
                  .map((status) => {
                    return {
                      label: "Mark " + status,
                      onClick: () => {
                        updateTaskStatus(row.id, status);
                      },
                    };
                  }),
              ]}
            />
          ),
        };
      });
      setOriginData(dataModified);
      setFilterData(dataModified);
      setloading(false);
    });
  };

  return (
    <Card
      span={24}
      className="da-border-color-black-40 ant-card card-without-padding"
    >
      <>
        <Row
          style={{ marginTop: "20px", marginLeft: "20px" }}
          gutter={[20, 20]}
        >
          <Col span={6}>
            <FilterSelect
              placeholder="Select Group"
              options={groups}
              label="name"
              value="id"
              onChange={(el) => {
                setSelectedGroup(el);
                getOrg(el);
              }}
            />
          </Col>

          <Col span={6}>
            <FilterSelect
              placeholder="Select Entity"
              options={entites}
              label="name"
              value="id"
              onChange={(el) => {
                setSelectedEntity(el);
                getUnit(el);
              }}
            />
          </Col>

          <Col span={6}>
            <FilterSelect
              placeholder="Select Unit"
              options={units}
              label="name"
              value="id"
              // selectedValue={selectedEntity}
              onChange={(el) => {
                setSelectedUnit(el);
              }}
            />
          </Col>
          <Col>
            <Button
              type="secoundry"
              onClick={() =>
                location.search === "?internal=true" ? getTasks() : getRepo()
              }
            >
              Fetch
            </Button>
          </Col>
        </Row>
        <br />
        <div style={{ overflowY: "auto" }}>
          <CustomTable
            loading={loading}
            columns={columns}
            dataSource={filterData}
          />
        </div>
      </>
    </Card>
  );
};
