import { Col, Image, Modal, Row } from "antd";
import React from "react";
import { MailOutlined } from "@ant-design/icons";
import download from "../../../../../../../assets/images/utility/download-pdf.svg";

const ShareAs = ({ modal, setModal }) => {
  return (
    <Modal
      title="Share as"
      visible={modal}
      onCancel={() => setModal(false)}
      onOk={() => setModal(false)}
      footer={[]}
      width={260}
    >
      <>
        <Row
          align="center"
          onClick={() => alert("downloading...")}
          style={{ pointer: "cursor" }}
          gutter={[20, 20]}
        >
          <Col>
            <Image alt="" src={download} />
          </Col>

          <Col>
            <label>Download PDF</label>
          </Col>
        </Row>
        <Row
          align="center"
          onClick={() => alert("sharing...")}
          style={{ cursor: "pointer" }}
          gutter={[20, 20]}
        >
          <Col>
            <MailOutlined />
          </Col>

          <Col>
            <label>Share via Email</label>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default ShareAs;
