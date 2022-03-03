import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Input,
  Typography,
  Progress,
  Radio,
  Divider,
} from "antd";
import { DeleteFilled } from "@ant-design/icons";
import editIcon from "../../../../assets/images/utility/edit-icon.svg";
import { useHistory } from "react-router-dom";
import { get, post } from "../../../../api/HTTPService";

const { Title } = Typography;
const OnBoardingQuestionaire = ({ unitId }) => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions();
  }, []);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  const sections = [
    { name: "Section 1" },
    { name: "Section 2" },
    { name: "Section 3" },
    { name: "Section 4" },
    { name: "Section 5" },
    { name: "Section 6" },
    // { name: "Entity Details" },
    // { name: "Company Secratorial Details" },
    // { name: "Finance And Exam And Customs" },
    // { name: "EHS And HR" },
    // { name: "Types Of Law" },
    // { name: "Event Based Questions" },
  ];

  const getQuestions = () => {
    get("/questions").then((res) => {
      const originData_ = res.map((row, index) => {
        return {
          index: index + 1,
          ...row,
        };
      });
      setQuestions(originData_);
    });
  };

  return (
    <>
      <Row style={{ paddingLeft: "20px", paddingTop: "20px" }}>
        <Title level={2}>Questionaire</Title>
      </Row>
      <Row>
        <Progress
          percent={100 / (sections.length - selectedSectionIndex)}
          showInfo={false}
        />
      </Row>
      <Row style={{ padding: "20px" }}>
        <Col>
          <Title level={4}>{sections[selectedSectionIndex].name}</Title>
        </Col>
        <Col span={10}></Col>

        <Col>
          <Button
            onClick={() => {
              if (selectedSectionIndex > 0) {
                setSelectedSectionIndex(selectedSectionIndex - 1);
              }
            }}
            type="default"
          >
            Back
          </Button>
        </Col>
        <Col span={1}></Col>
        {selectedSectionIndex < sections.length - 1 ? (
          <Col>
            <Button
              onClick={() => {
                if (selectedSectionIndex < sections.length - 1) {
                  setSelectedSectionIndex(selectedSectionIndex + 1);
                }
              }}
              type="secoundry"
            >
              Next
            </Button>
          </Col>
        ) : (
          <Col>
            <Button
              onClick={async () => {
                const questionsResponse = questions.map((question) => {
                  return {
                    question_id: question.id,
                    answer: question.answer,
                  };
                });
                await post("/unitQuestions", {
                  unit_id: unitId,
                  questions: questionsResponse,
                });
                history.push("/onboarding-unit/legislations/" + unitId);
              }}
              type="secoundry"
            >
              View Suggested Compliances
            </Button>
          </Col>
        )}
      </Row>

      {questions.filter(
        (question) => question.section === sections[selectedSectionIndex].name
      ).length === 0 ? (
        <Row style={{ padding: "20px" }}>
          Sorry No questions available for this section
        </Row>
      ) : null}

      {questions
        .filter(
          (question) => question.section === sections[selectedSectionIndex].name
        )
        .map((question, index) => {
          return (
            <Row style={{ paddingLeft: "20px" }}>
              <Col style={{ width: "100%" }}>
                {index + 1 + ") " + question.question}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio.Group
                  onChange={(event) => {
                    const { value } = event.target;
                    const questionIndex = questions.findIndex(
                      (questionInner) => questionInner.id === question.id
                    );
                    questions[questionIndex].answer = value == 1 ? "Yes" : "No";
                    setQuestions([...questions]);
                  }}
                  value={question.answer === "Yes" ? 1 : 2}
                >
                  <Radio value={1}>Yes</Radio>
                  <Radio value={2}>No</Radio>
                </Radio.Group>
                <Divider />
              </Col>
            </Row>
          );
        })}
    </>
  );
};

export default OnBoardingQuestionaire;
