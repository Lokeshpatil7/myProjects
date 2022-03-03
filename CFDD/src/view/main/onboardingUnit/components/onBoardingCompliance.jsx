import React, { useState } from "react";
import { Button, Card, Col, Row, Input, Typography, Progress } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import editIcon from "../../../../assets/images/utility/edit-icon.svg";
import { useHistory } from "react-router-dom";
import CentralRepo from "../../centralRepo";
import { post, get } from "../../../../api/HTTPService";

const { Title } = Typography;
const OnBoardingCompliance = ({ unitId, selectedLegislations }) => {
  const history = useHistory();
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const onAssign = async () => {
    const compliance_ids = selectedRows.map((row) => row.id);
    await post("/unitCompliances", { unit_id: unitId, compliance_ids });
  };

  get("/unitLegislation").then((response) => console.log(response));

  return (
    <>
      <Row style={{ padding: "20px" }}>
        <Col>
          <Title level={2}>Suggested Compliance</Title>
        </Col>
        <Col span={10}></Col>
        <Col>
          <Button onClick={() => {}} type="default">
            Back
          </Button>
        </Col>
        <Col span={1}></Col>
        <Col>
          <Button
            onClick={() => {
              history.push("/onboarding-unit/users/" + unitId);
            }}
            type="secoundry"
          >
            Next
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <CentralRepo
            isOnboarding={true}
            selectedLegislations={selectedLegislations}
            unitId={unitId}
            setSelectedRows={setSelectedRows}
            onAssign={onAssign}
          />
        </Col>
      </Row>
    </>
  );
};

export default OnBoardingCompliance;
