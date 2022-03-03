import { Tabs } from "antd";
import React from "react";
import ComplianceDetailsAuditStatus from "./ComplianceDetailsAuditStatus";
import ComplianceDetailsInfo from "./ComplianceDetailsInfo";
import ComplianceDetailsSop from "./ComplianceDetailsSop";
import ComplianceDetailsWorkflow from "./ComplianceDetailsWorkflow";
// import Assign from "./assign";
// import ViewAssign from "./viewAssign/Index";
const { TabPane } = Tabs;

export default ({ selectedRow }) => {
  console.log(selectedRow);
  return (
    <div style={{ margin: "20px" }}>
      <Tabs justify="space-between" defaultActiveKey="info">
        <TabPane tab="Info" key="info">
          <ComplianceDetailsInfo selectedRow={selectedRow} />
        </TabPane>
        {/* <TabPane tab="History" key="history">
            In Progress
          </TabPane> */}
        <TabPane tab="SOP" key="sop">
          <ComplianceDetailsSop selectedRow={selectedRow} />
        </TabPane>
        <TabPane tab="Workflow" key="workflow">
          <ComplianceDetailsWorkflow selectedRow={selectedRow} />
        </TabPane>
        <TabPane tab="Audit Status" key="auditStatus">
          <ComplianceDetailsAuditStatus selectedRow={selectedRow} />
        </TabPane>
      </Tabs>
    </div>
  );
};
