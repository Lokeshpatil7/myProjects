import React, { useState } from "react";
import { Button, Col, Divider, notification, Row } from "antd";
import { get, post } from "../../../../api/HTTPService";
import { Typography } from "antd";
import FiltersHeader from "../../../components/tableFilter/FiltersHeader";
import ComplienceTable from "./components/ComplienceTable";
import SelectUnit from "../components/SelectUnit";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";

const { Title } = Typography;

export default function ViewAssign() {
  const [compliences, setCompliences] = useState([]);
  const [filterCompliences, setFilterCompliences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setSelectedGroup] = useState(null);
  const [, setSelectedEntity] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedCompliences, setSelectedCompliences] = useState([]);

  const getCompliences = async (selectedUnitId) => {
    setLoading(true);
    try {
      const res = await get(`compliance/assign/${selectedUnitId}/`);
      if (res.data) {
        const originData_ = res.data.map((row, index) => {
          return {
            key: index + 1,
            ...row.compliance_master,
            assignId: row.id,
            ...{
              legislationName: row.compliance_master.legislation.name,
              ruleName: row.compliance_master.rule.name,
              legislationLaw_category:
                row.compliance_master.legislation.law_category,
              legislationEsg_category:
                row.compliance_master.legislation.esg_category,
            },
            ...{
              esg_category: row.compliance_master.legislation.esg_category,
              law_category: row.compliance_master.legislation.law_category,
              first_penalty: row.compliance_master.consequence.first_penalty,
              reference: row.compliance_master.consequence.reference,
              consequenceOnCompliences:
                row.compliance_master.consequence.description,
              corrective_actions:
                row.compliance_master.consequence.corrective_actions,
            },
          };
        });
        setCompliences(originData_);
        setFilterCompliences(originData_);
      }

      setCompliences();
      setLoading(false);
    } catch (e) {
      notification.open({
        message: "Error",
        description: e?.response?.data?.message,
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        ),
      });
      setLoading(false);
    }
  };

  const removeCompliances = async () => {
    setLoading(true);
    const dataToSubmit = {
      assigned_compliance_ids: selectedCompliences.map(
        (complience) => complience.assignId
      ),
    };
    try {
      const added = await post(`compliance/assign/del/`, dataToSubmit);
      if (added && added.success) {
        notification.open({
          message: "Removed Successfully",
          description: "",
          icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
      getCompliences(selectedUnit.id);
      setLoading(false);
    } catch (e) {
      notification.open({
        message: "Error",
        description: e?.response?.data?.message,
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        ),
      });
      setLoading(false);
    }
  };

  const span = window.innerWidth < 900 ? 24 : 20;

  return (
    <div>
      <Title level={5}>Select Unit To VIew Assigned Compliences</Title>
      <Row gutter={[25, 20]}>
        <Col span={span}>
          <SelectUnit
            setSelectedGroup={setSelectedGroup}
            setSelectedEntity={setSelectedEntity}
            setSelectedUnit={(unit) => {
              setSelectedUnit(unit);
              getCompliences(unit.id);
            }}
          />
        </Col>
        <Col className="text-right">
          <Button
            onClick={() => removeCompliances()}
            disabled={selectedCompliences.length === 0 || !selectedUnit}
            type="secoundry"
          >
            Remove
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
      <ComplienceTable
        loading={loading}
        originData={filterCompliences}
        setSelectedCompliences={setSelectedCompliences}
      />
    </div>
  );
}

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
