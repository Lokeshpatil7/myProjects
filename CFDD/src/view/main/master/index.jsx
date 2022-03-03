import React from "react";
import { Tabs, Card } from "antd";
import Group from "./group/index";
import Organization from "./organization";
import Users from "./users";
import Units from "./units";
import Department from "./department";
const { TabPane } = Tabs;

const ComplianceMaster = () => {
  return (
    <Card bordered={false} className="da-elevatior">
      <Tabs justify="space-between" defaultActiveKey="Group">
        <TabPane tab="Group" key="Group">
          <Group />
        </TabPane>

        {/* <TabPane tab="Law category" key="Law_Category">
                law cat
            </TabPane> */}

        <TabPane tab="Organizations" key="Organizations">
          <Organization />
        </TabPane>

        <TabPane tab="Units" key="Units">
          <Units />
        </TabPane>

        <TabPane tab="Department" key="Department">
          <Department />
        </TabPane>

        {/* <TabPane tab="Compliances" key="Compliances">
          <Compliances />
        </TabPane> */}

        <TabPane tab="User" key="User">
          <Users />
        </TabPane>

        {/* <TabPane tab="Acts" key="Acts">
                group
            </TabPane> */}
      </Tabs>
    </Card>
  );
};

export default ComplianceMaster;
