import { Button, Col, Divider, Row } from "antd";
import React from "react";
import SelectedComplianceTable from "./components/SelectedComplianceTable";
export default function VerifySelectedCompliances({
  selectedCompliences,
  selectedGroup,
  selectedEntity,
  selectedUnit,
  assingCompliances,
  setVerify,
  verify,
}) {
  const span = window.innerWidth < 583 ? 18 : 6;
  return (
    <div style={{ display: !verify && "none" }}>
      <Row gutter={[15, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={span}>
          <label className="label">Selected Group</label>
          <br /> <strong>{selectedGroup?.name}</strong>
        </Col>

        <Col span={span}>
          <label className="label">Selected Entity</label>
          <br />
          <strong>{selectedEntity?.name}</strong>
        </Col>

        <Col span={span}>
          <label className="label">Selected Unit</label>
          <br />
          <strong>{selectedUnit?.name}</strong>
        </Col>

        <Col className="text-right">
          <Button
            key="submit"
            type="default"
            onClick={() => {
              setVerify(false);
            }}
          >
            Back
          </Button>
        </Col>

        <Col>
          <Button key="submit" type="secoundry" onClick={assingCompliances}>
            Assign
          </Button>
        </Col>
      </Row>
      <Divider />
      <SelectedComplianceTable selectedCompliences={selectedCompliences} />
    </div>
  );
}
