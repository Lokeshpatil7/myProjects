import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { useHistory } from "react-router-dom";
import { get } from "../../../../api/HTTPService";

const OnboardingUnitTable = () => {
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    getUnit();
  }, []);

  const getUnit = () => {
    get(`/unit`).then((res) => {
      const originData_ = res
        .filter((unit) => !unit.is_onboarded)
        .map((row, index) => {
          return {
            id: row.id,
            index: index + 1,
            group: row?.organization?.group?.name,
            entity: row?.organization?.name,
            unit: row.name,
          };
        });
      setDataSource(originData_);
    });
  };

  const columns = [
    {
      title: "Sr no",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "entity",
      dataIndex: "entity",
      key: "entity",
    },
    {
      title: "unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "options",
      dataIndex: "options",
      key: "options",
      render: (text, record, index) => {
        return (
          <Button
            onClick={() => {
              history.push("/onboarding-unit/questions/" + record.id);
            }}
            type="secoundry"
          >
            Start Onboarding Process
          </Button>
        );
      },
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default OnboardingUnitTable;
