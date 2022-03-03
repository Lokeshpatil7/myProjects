import React, { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import ActTable from "./components/ActTable";
import FiltersHeader from "../../../components/tableFilter/FiltersHeader";
import AddAct from "./components/actions/AddAct";
import AddVia from "./components/actions/AddVia";
import AddAct2 from "./components/actions/AddAct2";
import SuccessModal from "../../../components/modals/SuccessModal";

const Acts = () => {
  const [modal, setModal] = useState(false);
  const [filterData, ] = useState([]);
  const [originData, ] = useState([]);
  const [screen, setScreen] = useState(0);

  const filterCol = [
    // { label: "Date", colName: "legislationName" },
    { label: "region", colName: "ruleName" },
    { label: "country", colName: "legislationLaw_category" },
    { label: "legislation", colName: "esg_category" },
  ];

  return (
    <div>
      <Row gutter={[10, 15]}>
        <Col span={18}>
          <FiltersHeader
            filterData={filterData}
            originData={originData}
            cols={filterCol}
          />
        </Col>
        <Col>
          <Button>REMOVE</Button>
        </Col>
        <Col>
          <Button onClick={() => setModal(true)} type="secoundry">
            ADD
          </Button>
        </Col>

        <Col span={24}>
          <Card className="utility-tasks-table" size="small">
            <ActTable />
          </Card>
        </Col>

        {screen === 0 ? (
          <AddAct setScreen={setScreen} modal={modal} setModal={setModal} />
        ) : screen === 1 ? (
          <AddVia modal={modal} setModal={setModal} setScreen={setScreen} />
        ) : screen === 2 ? (
          <AddAct2 modal={modal} setModal={setModal} setScreen={setScreen} />
        ) : screen === 3 ? (
          <SuccessModal
            titleText="Act added successfully"
            setScreen={setScreen}
            showModel={modal}
            setShowModel={setModal}
          />
        ) : null}
      </Row>
    </div>
  );
};

export default Acts;
