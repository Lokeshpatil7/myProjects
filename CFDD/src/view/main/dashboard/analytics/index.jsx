import React, { useState, useEffect } from "react";

import { Row, Col } from "antd";

import FeatureCard from "./featureCard";
import Graph from "../dashboardTabs";
import StatusColors from "../statusColors";
import DashboardOrgTable from "../dashboardTabs/DashboardOrgTable";
import ComplianceOrgTable from "../dashboardTabs/ComplianceOrgTable";
import UtilityOrgTable from "../dashboardTabs/UtilityOrgTable";
import { get, post } from "../../../../api/HTTPService";

export default function Analytics() {
  const [selectedTab, setSelectedTab] = useState("Organization");
  const [count, setCount] = useState({});
  const [units, setUnits] = useState([]);
  const [organizationCountByMonth, setOrganizationCountByMonth] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  useEffect(() => {
    get("/dashboardSuperAdmin").then((response) => {
      console.log(response);
      if (response) {
        const { count, organizationCountByMonth, unitsList } = response;
        setCount(count);
        setOrganizationCountByMonth(organizationCountByMonth);
        setUnits(
          unitsList.map((unit, index) => {
            return {
              index: index + 1,
              groupName: unit.organization.group.name,
              entityName: unit.organization.name,
              unitName: unit.name,
              gst: unit.organization.gstin,
              pan: unit.organization.pan_number,
              unitLocationType: unit.location_type,
            };
          })
        );
      }
    });
  }, []);
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <FeatureCard count={count} />
      </Col>

      {/* <Row gutter={20}> */}
      <Col span={window.innerWidth < 900 ? 24 : 18}>
        <Graph
          organizationCountByMonth={organizationCountByMonth}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </Col>

      <Col>{/* <StatusColors /> */}</Col>

      {selectedTab === "Organization" ? (
        <Col className="da-mt-32" span={24}>
          <DashboardOrgTable units={units} />
        </Col>
      ) : selectedTab === "Compliances" ? (
        <Col className="da-mt-32" span={24}>
          {/* <ComplianceOrgTable /> */}
        </Col>
      ) : selectedTab === "Utility" ? (
        <Col className="da-mt-32" span={24}>
          {/* <UtilityOrgTable /> */}
        </Col>
      ) : null}

      {/* </Row> */}
      {/* <Col span={24}>
              <EditableRowsTable />
            </Col> */}
    </Row>
  );
}
