import React, { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import OfficeTable from "./components/OfficeTable";
import FiltersHeader from "../../../components/tableFilter/FiltersHeader";
import AddEmp from "./components/AddEmp";
import SuccessModal from "../../../components/modals/SuccessModal";

const NotInOffice = () => {
  const [modal, setModal] = useState(false);
  const [filterData, ] = useState([]);
  const [originData, ] = useState([]);
  const [screen, setScreen] = useState(0);

  const filterCol = [
    { label: "region", colName: "ruleName", date : '' },
  ];


  return (
    <div>
      <Row gutter={[15, 15]}>
        <Col span={20}>
          <FiltersHeader
            filterData={filterData}
            originData={originData}
            cols={filterCol}
          />
        </Col>
        <Col>
          <Button onClick={() => setModal(true)} type="secoundry">
            ADD
          </Button>
        </Col>
        <Col span={24}>
          <Card size="small">
            <OfficeTable />
          </Card>
        </Col>

        {
          screen === 0 ?
          <AddEmp 
          setScreen={setScreen}
          modal={modal}
          setModal={setModal}
          /> : 
          screen === 1 ?
          <SuccessModal
            setScreen={setScreen}
            showModel={modal}
            setShowModel={setModal}
            titleText="Employee added successfully"
          /> : null

        }
      </Row>
    </div>
  );
};

export default NotInOffice;
