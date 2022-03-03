import { Card, Tabs } from "antd";
import React from "react";
import Assign from "./assign";
import ViewAssign from "./viewAssign/Index";
const { TabPane } = Tabs;

export default function AssignCompliances() {
  return (
    <div>
      <Card>
        <Tabs justify="space-between" defaultActiveKey="Assign">
          <TabPane tab="Assign Compliances" key="Assign">
            <Assign />
          </TabPane>
          <TabPane tab="View Assigned Compliances" key="View">
            <ViewAssign />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
