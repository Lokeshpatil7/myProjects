import React, { useState, useEffect } from "react";
import { Button, Radio, Col, Modal, Row, Input } from "antd";
import CustomDropdown from "../../CustomDropdown";
import { PlusCircleFilled } from "@ant-design/icons";
import { Select } from "antd";
import { post, put } from "../../../../../../api/HTTPService";

const { Option } = Select;

const Add = ({ setScreen, modal, setModal, mode, data }) => {
  const [selectedSection, setSelectedSection] = useState("Entity details");
  const [question, setQuestion] = useState("");
  const [uid, setUid] = useState("");
  const [value, setValue] = React.useState(1);

  useEffect(() => {
    if (data) {
      const { section, question, answer } = data;
      setSelectedSection(section);
      setQuestion(question);
      setUid(uid);
      setValue(answer === "YES" ? 1 : 2);
    }
  }, [data]);

  const options = [
    "Entity details",
    "Company Secratorial Details",
    "Finance And Exam And Customs",
    "EHS And HR",
    "Types Of Law",
    "Event Based Questions",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion(value);
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onAdd = async () => {
    const questionObject = {
      question,
      answer: value === 1 ? "YES" : "NO",
      section: selectedSection,
      UID: uid,
    };
    if (mode === "ADD") {
      const added = await post(`/questions/`, questionObject);
      if (added) {
        setScreen(1);
      }
    } else {
      const added = await put(`/questions/${data.id}`, questionObject);
      if (added) {
        setScreen(1);
      }
    }
  };

  return (
    <Modal
      title={(mode === "ADD" ? "Add" : "Edit") + " Question"}
      visible={modal}
      onCancel={() => setModal(false)}
      onOk={() => setModal(false)}
      width={1000}
      footer={[
        <Button
          onClick={() => {
            // setScreen(1);
            onAdd();
          }}
          type="secoundry"
        >
          {(mode === "ADD" ? "Add" : "Edit") + " Question"}
        </Button>,
      ]}
    >
      <Row gutter={[32, 32]}>
        <Col style={{ marginTop: "5px" }}>SELECT SECTION TYPE</Col>
        <Col span={8}>
          {/* <CustomDropdown label="ENTITY DETAILS" /> */}
          <Select
            placeholder={"ENTITY DETAILS"}
            optionFilterProp="children"
            onChange={(value) => {
              setSelectedSection(options[value]);
            }}
            value={selectedSection || options[0]}
          >
            {options.map((item, index) => {
              return (
                <Option key={index} value={index}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col style={{ marginTop: "5px" }}>UID</Col>
        <Col span={6}>
          <Input
            className="input-without-border onboarding-input"
            value={uid}
            onChange={(event) => {
              setUid(event.target.value);
            }}
            size="large"
            placeholder="Enter UID"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "15px" }} gutter={32}>
        <Col span={24}>
          <Input
            className="input-without-border onboarding-input"
            value={question}
            onChange={(event) => {
              handleInputChange(event);
            }}
            size="large"
            placeholder="Type the question here and select the correct Answer"
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "15px", marginLeft: "10px" }} gutter={[32, 32]}>
        <Radio.Group onChange={onChange} value={value}>
          <Radio className="custom-radio" value={1}>
            Yes
          </Radio>
          <Radio className="custom-radio" value={2}>
            No
          </Radio>
        </Radio.Group>
      </Row>
    </Modal>
  );
};

export default Add;
