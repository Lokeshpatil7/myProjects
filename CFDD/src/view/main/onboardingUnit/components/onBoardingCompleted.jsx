import React, { useState } from "react";
import { Button, Card, Col, Row, Input, Typography, Progress } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import editIcon from "../../../../assets/images/utility/edit-icon.svg";
import { useHistory } from "react-router-dom";
import Users from "../../master/users";
import { put } from "../../../../api/HTTPService";
import { useEffect } from "react";

const { Title } = Typography;
const OnBoardingCompleted = ({ unitId }) => {
  useEffect(() => {
    put(`/unit/onboard/${unitId}/`, {});
  }, []);
  return (
    <>
      <Row style={{ padding: "20px" }}>
        <Col>
          <Title level={2}>Onboarding Success</Title>
        </Col>
      </Row>
    </>
  );
};

export default OnBoardingCompleted;
