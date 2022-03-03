import { Card, Tabs } from "antd";
import React from "react";
import Asset from "./Asset";
import CommonEmail from "./commonEmail";
import Library from "./library";
import Licences from "./Licences";
import NotInOffice from "./NotInOffice";
import Acts from "./acts";
import Tasks from "./tasks";
const { TabPane } = Tabs;

export default function Utility() {
  return (
    <div>
      <Tabs defaultActiveKey="7">
        <TabPane tab="Not In Office" key="1">
          <Card>
            <NotInOffice />
          </Card>
        </TabPane>
        <TabPane tab="Library" key="2">
          <Card>
            <Library />
          </Card>
        </TabPane>
        <TabPane tab="Common email" key="3">
          <Card>
          <CommonEmail />
          </Card>
        </TabPane>
        <TabPane tab="Licences" key="4">
          <Card>
            <Licences />
          </Card>
        </TabPane>
        <TabPane tab="Asset management" key="5">
          <Card>
            <Asset />
          </Card>
        </TabPane>
        <TabPane tab="Acts" key="6">
          <Card>
            <Acts />
          </Card>
        </TabPane>
        <TabPane tab="Tasks" key="7">
          <Card>
            <Tasks />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
}
