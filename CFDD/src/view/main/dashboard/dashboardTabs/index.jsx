import React from "react";
import { Tabs } from "antd";
import ComplianceChart from "../../widgets/charts/ComplianceChart";
import OrgChart from "../../widgets/charts/OrgChart";
import UtilityChart from "../../widgets/charts/UtilityChart";
import { Card } from "antd";

const { TabPane } = Tabs;

export default function Graph({
  selectedTab,
  setSelectedTab,
  organizationCountByMonth,
}) {
  return (
    <>
      <Card bordered={false} className="da-elevatior">
        <Tabs
          defaultActiveKey="1"
          onChange={(value) => {
            setSelectedTab(value);
          }}
        >
          {/* TODO  Update the logic to create TabPlane looping to array of object containing tab name & key   */}
          <TabPane tab="Organization" key="Organization">
            <OrgChart organizationCountByMonth={organizationCountByMonth} />
          </TabPane>

          <TabPane tab="Compliances" key="Compliances">
            {/* <ComplianceChart /> */}
          </TabPane>

          <TabPane tab="Utility" key="Utility">
            {/* <UtilityChart/> */}
          </TabPane>

          {/* <TabPane tab="View Details" key="Utility">
                <Button type="secoundry" style={{color : 'black'}}> hiiiiiiiiiiiiii</Button>
                </TabPane> */}
        </Tabs>
      </Card>

      {/* {
            key_ === '1' ? 
            <DashboardOrgTable /> : null
        } */}
    </>
  );
}
