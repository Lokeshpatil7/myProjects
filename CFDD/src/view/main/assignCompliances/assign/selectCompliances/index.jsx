import React, { useState } from "react";
import ComplianceTable from "./components/ComplianceTable";
import { Button, Col, Divider, Row } from "antd";
import { get } from "../../../../../api/HTTPService";
import FiltersHeader from "../../../../components/tableFilter/FiltersHeader";
import { Typography } from "antd";
import SelectUnit from "../../components/SelectUnit";
const { Title } = Typography;

const SelectCompliances = ({
  setSelectedGroup,
  setSelectedEntity,
  selectedUnit,
  setSelectedUnit,
  setSelectedCompliences,
  selectedCompliences,
  setVerify,
  assingCompliances,
  verify,
}) => {
  const [compliences, setCompliences] = useState([]);
  const [filterCompliences, setFilterCompliences] = useState([]);
  const [loading, setloading] = useState(false);
  const [alreadyAssignedIds, setAlreadyAssignedIds] = useState([]);

  const getCompliences = () => {
    setloading(true);
    get("/compliances")
      .then((res) => {
        const originData_ = res.data.map((row, key) => {
          return {
            key: key + 1,
            ...row,

            ...{
              legislationName: row.legislation.name,
              ruleName: row.rule.name,
              legislationLaw_category: row.legislation.law_category,
              legislationEsg_category: row.legislation.esg_category,
            },
            ...{
              esg_category: row.legislation.esg_category,
              law_category: row.legislation.law_category,
              first_penalty: row.consequence.first_penalty,
              reference: row.consequence.reference,
              consequenceOnCompliences: row.consequence.description,
              corrective_actions: row.consequence.corrective_actions,
            },
          };
        });
        setCompliences(originData_);
        setFilterCompliences(originData_);
        setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  const getSelectedCompliences = async (selectedUnitId) => {
    try {
      const res = await get(`compliance/assign/${selectedUnitId}/`);
      if (res.data) {
        const complienceIds = res.data.map((row) => row.compliance_master.id);
        setAlreadyAssignedIds(complienceIds);
      }
    } catch (e) {}
  };

  const span = window.innerWidth < 800 ? 24 : 19;

  return (
    <div style={{ display: verify && "none" }}>
      <Title level={5}>Select Unit To Assign Compliences</Title>
      <Row
        gutter={[25, 20]}
        // gutter={{ xs: 18, sm: 18, md: 18, lg: 24 }}
      >
        <Col className="gutter-row" span={span}>
          <SelectUnit
            setSelectedGroup={setSelectedGroup}
            setSelectedEntity={setSelectedEntity}
            setSelectedUnit={(unit) => {
              setSelectedUnit(unit);
              getSelectedCompliences(unit.id);
              getCompliences();
            }}
          />
        </Col>

        <Col className="text-right">
          <Button
            onClick={() => setVerify(true)}
            disabled={selectedCompliences.length === 0 || !selectedUnit}
          >
            preview
          </Button>
        </Col>

        <Col className="text-right">
          <Button
            onClick={() => assingCompliances()}
            disabled={selectedCompliences.length === 0 || !selectedUnit}
            type="secoundry"
          >
            ASSIGN
          </Button>
        </Col>
      </Row>

      <Divider />

      <FiltersHeader
        filterData={filterCompliences}
        originData={compliences}
        setFilterData={setFilterCompliences}
        cols={filterCol}
      />
      <ComplianceTable
        loading={loading}
        alreadyAssignedIds={alreadyAssignedIds}
        originData={filterCompliences}
        setSelectedCompliences={setSelectedCompliences}
      />
    </div>
  );
};

export default SelectCompliances;

const filterCol = [
  { label: "NAME OF LEGISLATION", colName: "legislationName" },
  { label: "NAME OF RULE", colName: "ruleName" },
  { label: "LAW CATEGORY", colName: "legislationLaw_category" },
  { label: "ESG CATEGORY", colName: "esg_category" },
  { label: "REFERANCE", colName: "reference" },
  { label: "PARENT/CHILD", colName: "linkage" },
  { label: "FREQUENCY", colName: "frequency" },
  { label: "SEVERITY", colName: "severity" },
];
