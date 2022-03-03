import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Input } from "antd";
import OnboardingTable from "./components/OnboardingTable";
// import CustomDropdown from "./components/CustomDropdown";
import AddQuestion from "./components/actions/addQuestion";
import EditQuestion from "./components/actions/editQuestion";
import { SearchOutlined } from "@ant-design/icons";
import DeleteQuestion from "./components/actions/delete";
import { get } from "../../../api/HTTPService";
import MoreOptions from "../../components/data-display/tableActions";

const Onboarding = () => {
  const [modal, setModal] = useState("");

  const [dataSource, setDataSource] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState("");

  useEffect(() => {
    getQuestions();
  }, [modal]);

  const getQuestions = () => {
    get("/questions").then((res) => {
      const originData_ = res.map((row, index) => {
        return {
          index: index + 1,
          ...row,
        };
      });
      setDataSource(originData_);
    });
  };

  return (
    <Card className="card-without-padding">
      <Row
        style={{ padding: "20px 30px" }}
        // align="center"
        gutter={[10, 10]}
      >
        <Col span={20}>
          {/* <Input
            className="gray-input"
            placeholder="Search"
            suffix={<SearchOutlined />}
          /> */}
          <br />
        </Col>
        <Col>{/* <CustomDropdown /> */}</Col>

        <Col>
          <Button onClick={() => setModal("Add Question")} type="secoundry">
            ADD
          </Button>
        </Col>
      </Row>
      <br />

      <Col span={24}>
        <Card className="utility-tasks-table" size="small">
          <OnboardingTable
            setModal={setModal}
            dataSource={dataSource}
            setSelectedRowId={setSelectedRowId}
          />
        </Card>
      </Col>

      <AddQuestion
        modal={modal === "Add Question"}
        setModal={setModal}
        mode={"ADD"}
      />
      <AddQuestion
        modal={modal === "Edit Question"}
        setModal={setModal}
        mode={"EDIT"}
        data={dataSource.find((data) => data.id === selectedRowId)}
      />
      <DeleteQuestion
        modal={modal === "Delete"}
        setModal={setModal}
        selectedRowId={selectedRowId}
      />
    </Card>
  );
};

export default Onboarding;
