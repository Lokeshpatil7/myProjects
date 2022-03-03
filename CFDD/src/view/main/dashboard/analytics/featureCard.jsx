import React from "react";

import { Card, Row, Col } from "antd";
import { Location } from "react-iconly";
import entity from "../../../../assets/images/icons/dashboard/entity.svg";
import more from "../../../../assets/images/icons/dashboard/more.svg";
import user from "../../../../assets/images/icons/dashboard/user.svg";

export default function FeatureCard({ count }) {
  const entityCard = "Entities";
  const unitCard = "Unit";
  const complianceCard = "Compliance";
  const userCard = "Users";
  const myCard = {
    boxShadow: "0px 0px 20px 1px lightgray",
  };

  const { organization, units, compliance, users } = count;

  return (
    <Row gutter={[32, 32]}>
      <Col xl={6} md={12} span={24}>
        <Card style={myCard} className="da-border-color-black-40">
          <Row>
            <Col className="da-statistic-icon-bg da-mr-16 da-mb-xs-16">
              <img alt="" src={entity} />
            </Col>

            <Col className="da-mt-8">
              <h3 className="da-mb-4">{organization}</h3>

              <p className="da-p1-body da-mb-0 da-text-color-black-80">
                {entityCard}
              </p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col xl={6} md={12} span={24}>
        <Card className="da-border-color-black-40">
          <Row>
            <Col className="da-statistic-icon-bg da-mr-16 da-mb-xs-16">
              <Location className="da-text-color-secondary-1 remix-icon" />
            </Col>

            <Col className="da-mt-8">
              <h3 className="da-mb-4">{organization}</h3>

              <p className="da-p1-body da-mb-0 da-text-color-black-80">
                {unitCard}
              </p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col xl={6} md={12} span={24}>
        <Card className="da-border-color-black-40">
          <Row>
            <Col className="da-statistic-icon-bg da-mr-16 da-mb-xs-16">
              <img alt="" src={more} />
            </Col>

            <Col className="da-mt-8">
              <h3 className="da-mb-4">{compliance}</h3>

              <p className="da-p1-body da-mb-0 da-text-color-black-80">
                {complianceCard}
              </p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col xl={6} md={12} span={24}>
        <Card className="da-border-color-black-40">
          <Row>
            <Col className="da-statistic-icon-bg da-mr-16 da-mb-xs-16">
              <img alt="" src={user} />
            </Col>

            <Col className="da-mt-8">
              <h3 className="da-mb-4">{users}</h3>

              <p className="da-p1-body da-mb-0 da-text-color-black-80">
                {userCard}
              </p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
