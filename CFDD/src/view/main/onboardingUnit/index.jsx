import React, { useState } from "react";
import { Button, Card, Col, Row, Input } from "antd";
import OnboardingUnitTable from "./components/onboardingUnitTable";
import { useLocation } from "react-router-dom";
import OnBoardingQuestionaire from "./components/onBoardingQuestionaire";
import OnBoardingCompliance from "./components/onBoardingCompliance";
import OnBoardingUsers from "./components/onBoardingUsers";
import OnBoardingCompleted from "./components/onBoardingCompleted";
import OnBoardingLegislation from "./components/onBoardingLegislation";
// import CustomDropdown from "./components/CustomDropdown";
// import AddQuestion from "./components/actions/addQuestion";
// import EditQuestion from "./components/actions/editQuestion";
// import { SearchOutlined } from "@ant-design/icons";
// import DeleteQuestion from "./components/actions/delete";

const OnboardingUnit = () => {
  const location = useLocation();
  const [selectedRows, setSelectedRows] = useState([]);
  const [, , path, unitId] = location.pathname.split("/");
  const getComponentByPath = () => {
    switch (path) {
      case "questions":
        return <OnBoardingQuestionaire unitId={unitId} />;
      case "compliances":
        return (
          <OnBoardingCompliance
            selectedLegislations={selectedRows}
            unitId={unitId}
          />
        );
      case "legislations":
        return (
          <OnBoardingLegislation
            unitId={unitId}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        );
      case "users":
        return <OnBoardingUsers unitId={unitId} />;
      case "completed":
        return <OnBoardingCompleted unitId={unitId} />;
    }
  };

  return (
    <Card className="card-without-padding">
      <Col span={24}>
        <Card className="utility-tasks-table" size="small">
          {!path ? <OnboardingUnitTable /> : getComponentByPath()}
        </Card>
      </Col>
    </Card>
  );
};

export default OnboardingUnit;
