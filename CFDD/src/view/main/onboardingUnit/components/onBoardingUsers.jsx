import React, { useState } from "react";
import { Button, Card, Col, Row, Input, Typography, Progress } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import editIcon from "../../../../assets/images/utility/edit-icon.svg";
import { useHistory } from "react-router-dom";
import Users from "../../master/users";
import { post } from "../../../../api/HTTPService";

const { Title } = Typography;
const OnBoardingUsers = ({ unitId }) => {
  const history = useHistory();
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const onAssign = async () => {
    const user_ids = selectedRows.map((row) => row.id);
    await post("/unitUsers", { unit_id: unitId, user_ids });
    // history.push("/onboarding-unit/completed/" + unitId);
  };

  return (
    <>
      <Row style={{ padding: "20px" }}>
        <Col>
          <Title level={2}>User List</Title>
        </Col>
        <Col span={11}></Col>
        {/* <Col>
          <Button onClick={() => {}} type="default">
            Download
          </Button>
        </Col>
        <Col span={1}></Col>
        <Col>
          <Button onClick={() => {}} type="secoundry">
            Add User
          </Button>
        </Col>
        <Col span={1}></Col>
        <Col>
          <Button onClick={() => {}} type="secoundry">
            Assign User
          </Button>
        </Col> */}

        <Col>
          {/* <Button onClick={() => {}} type="default">
            Back
          </Button> */}
        </Col>
        <Col span={1}></Col>
        <Col>
          <Button
            onClick={() => {
              history.push("/onboarding-unit/completed/" + unitId);
            }}
            type="secoundry"
          >
            Next
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Users
            isOnboarding={true}
            setSelectedRows={setSelectedRows}
            onAssign={onAssign}
          />
        </Col>
      </Row>
    </>
  );
};

export default OnBoardingUsers;
