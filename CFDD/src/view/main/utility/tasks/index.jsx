import React, { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import TasksTable from "./components/TasksTable";
import FiltersHeader from "../../../components/tableFilter/FiltersHeader";
import AddVia from "./components/actions/AddVia";
import CreateNewTask from "./components/actions/CreateNewTask";
import SuccessModal from "../../../components/modals/SuccessModal";
import EditTask from "./components/actions/EditTask";

const Tasks = () => {
  const [modal, setModal] = useState(false);
  const [filterData, ] = useState([]);
  const [originData, ] = useState([]);
  const [screen, setScreen] = useState(0);
  const [screen1, setScreen1] = useState(0);
  const [visible, setVisible] = useState(false);

  const filterCol = [
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
            <TasksTable setVisible={setVisible} />
          </Card>
        </Col>

        {screen === 0 ? (
          <AddVia
            screen={screen}
            setScreen={setScreen}
            modal={modal}
            setModal={setModal}
          />
        ) : screen === 1 ? (
          <CreateNewTask
            screen={screen}
            setScreen={setScreen}
            modal={modal}
            setModal={setModal}
          />
        ) : screen === 2 ? (
          <SuccessModal
            setScreen={setScreen}
            showModel={modal}
            setShowModel={setModal}
            titleText="Task added successfully"
          />
        ) : null}

        {screen1 === 0 ? (
          <EditTask
            setScreen={setScreen1}
            modal={visible}
            setModal={setVisible}
          />
        ) : screen1 === 1 ? (
          <SuccessModal
            setScreen={setScreen1}
            showModel={visible}
            setShowModel={setVisible}
            titleText="Task edited successfully"
          />
        ) : null}
      </Row>
    </div>
  );
};

export default Tasks;
