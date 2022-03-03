import React, { useState } from "react";
import { Col, Button, Row, Card } from "antd";
import FiltersHeader from "../../../components/tableFilter/FiltersHeader";
import CommonTable from "./components/CommonTable";
import Email from "./components/email";
import Compose from "./components/compose/Compose";
import SuccessModal from "../../../components/modals/SuccessModal";

const CommonEmail = () => {
  const [compliences, setCompliences] = useState([]);
  const [filterCompliences, ] = useState([]);
  // const [modalToShow, setModalToShow] = useState("");
  const [modal, setModal] = useState(false);
  const [screen, setScreen] = useState(0);

  const filterCol = [
    { label: "NAME OF LEGISLATION", colName: "legislationName" },
    { label: "NAME OF RULE", colName: "ruleName" },
    { label: "LAW CATEGORY", colName: "legislationLaw_category" },
    { label: "ESG CATEGORY", colName: "esg_category" },
    { label: "LAW CATEGORY", colName: "esg_category" },
    { label: "ESG CATEGORY", colName: "esg_category" },
  ];

  return (
    <div>
      <Row>
        <Col span={20}>
          <FiltersHeader
            filterData={filterCompliences}
            originData={compliences}
            setFilterData={setCompliences}
            cols={filterCol}
          />
        </Col>
        <Col>
          <Button onClick={() => setModal(true)} type="secoundry">
            Compose
          </Button>
        </Col>
      </Row>
      <br />

      <Row gutter={20} span={24}>
        <Col span={12}>
          <Card size="small">
            <CommonTable />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Annual compliance report and strategy">
            <Email />
          </Card>
        </Col>
      </Row>
      {/* <AddDocument
                modal={modal}
                setModal={setModal} /> */}
      {screen === 0 ? (
        <Compose
          screen={screen}
          setScreen={setScreen}
          modal={modal}
          setModal={setModal}
        />
      ) : screen === 1 ? (
        <SuccessModal
          setScreen={setScreen}
          showModel={modal}
          setShowModel={setModal}
          titleText="Mail sent successfully"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CommonEmail;
