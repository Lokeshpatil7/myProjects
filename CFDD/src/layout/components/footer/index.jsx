import { Col, Layout, Row } from "antd";

import themeConfig from "../../../configs/themeConfig";

const { Footer } = Layout;

export default function MenuFooter(){
    return(
        <Footer className="da-bg-color-black-10">
            <Row align="middle" justify="space-between">
                <Col md={12} span={24}>
                    <p className="da-badge-text da-mb-0">
                        COPYRIGHT ©2021 UpperThrust, All rights Reserved
                    </p>
                </Col>

                <Col md={12} span={24} className="da-mt-sm-8 da-text-sm-center da-text-right">
                    <a
                        href="https://www.upperthrust.com/"
                        target="_blank"
                        className="da-badge-text"
                    >
                        🥁 Version: {themeConfig.version}
                    </a>
                </Col>
            </Row>
        </Footer>
    );
};

