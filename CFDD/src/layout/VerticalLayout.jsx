import React, { useState } from "react";

import ScrollToTop from "react-scroll-up";
import { Layout, Button } from "antd";
import { RiArrowUpLine } from "react-icons/all";

import MenuHeader from "./components/header";
// import MenuFooter from "./components/footer";
import Sidebar from "./components/menu/Sidebar";

const { Content } = Layout;

export default function VerticalLayout(props) {
  const { children } = props;

  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout className="da-app-layout">
        <Sidebar
          visible={visible}
          setVisible={setVisible}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />

        <Layout>
          <MenuHeader setVisible={setVisible} collapsed={collapsed} />

          <Content
            // className="da-content-main"
            className={`da-content-main 
            ${window.innerWidth < 800 ? 'sider-margin' : 
            window.innerWidth > 800 && collapsed  ? 
            'sider-margin' : 'sider-margin2'}`}
            // style={{ marginLeft: collapsed ? "120px" : "270px" }}
            // style={{ marginLeft: "120px"}}
          >
            {children}
          </Content>

          {/* <MenuFooter /> */}
        </Layout>
      </Layout>

      <div className="scroll-to-top">
        <ScrollToTop showUnder={300} style={{ bottom: "5%" }}>
          <Button
            className="da-primary-shadow"
            type="primary"
            shape="circle"
            icon={<RiArrowUpLine />}
          />
        </ScrollToTop>
      </div>
    </div>
  );
}
