import React from "react";
import { Button, Radio, Col, Modal, Row, Input } from "antd";
// import CustomDropdown from "../../CustomDropdown";

const Edit = ({ setScreen, modal, setModal }) => {
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Modal
      title="Edit Question"
      visible={modal}
      onCancel={() => setModal(false)}
      onOk={() => setModal(false)}
      width={1000}
      footer={[
        <Button onClick={() => setScreen(1)} type="secoundry">
          edit question
        </Button>,
      ]}
    >
      <Row gutter={[32, 32]}>
        <Col style={{ marginTop: "5px" }}>SELECT SECTION TYPE</Col>
        <Col>{/* <CustomDropdown label="ENTITY DETAILS" /> */}</Col>
      </Row>

      <Row style={{ marginTop: "15px" }} gutter={32}>
        <Col span={24}>
          <Input
            className="input-without-border"
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

export default Edit;
