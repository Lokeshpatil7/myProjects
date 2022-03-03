import React, { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import FiltersHeader from "../../../components/tableFilter/FiltersHeader";
import LibraryTable from "./components/LibraryTable";
import AddDocument from "./components/actions/addDocument";
import SuccessModal from "../../../components/modals/SuccessModal";
import ShareAs from "./components/actions/shareAs/index";
import ViewDocument from "./components/actions/viewDocument";

const Library = () => {
  const [compliences, setCompliences] = useState([]);
  const [filterCompliences, ] = useState([]);
  // const [modalToShow, setModalToShow] = useState("");
  const [modal, setModal] = useState(false);
  const [share, setShare] = useState(false);
  const [view, setView] = useState(false)
  const [screen, setScreen] = useState(0);

  const filterCol = [
    { label: "Group", colName: "legislationName" },
    { label: "Entity", colName: "ruleName" },
    { label: "unit", colName: "legislationLaw_category" },
    { label: "department", colName: "esg_category" },
  ];

  return (
    <div>
      <Row gutter={[15, 15]}>
        <Col span={18}>
          <FiltersHeader
            filterData={filterCompliences}
            originData={compliences}
            setFilterData={setCompliences}
            cols={filterCol}
          />
        </Col>
        <Col>
          <Button onClick={() => setModal(true)} type="secoundry">
            ADD NEW DOCUMENT
          </Button>
        </Col>
        <Col span={24}>
          <Card size="small">
            <LibraryTable 
            setView={setView}
            setModal={setShare} />
          </Card>
        </Col>

        {screen === 0 ? (
          <AddDocument
            setScreen={setScreen}
            modal={modal}
            setModal={setModal}
          />
        ) : screen === 1 ? (
          <SuccessModal
            setScreen={setScreen}
            showModel={modal}
            setShowModel={setModal}
            titleText="Document added successfully"
          />
        ) : (
          ""
        )}
        <ViewDocument modal={view} setModal={setView}/>
        <ShareAs setScreen={setScreen} modal={share} setModal={setShare} />
      </Row>
    </div>
  );
};

export default Library;
