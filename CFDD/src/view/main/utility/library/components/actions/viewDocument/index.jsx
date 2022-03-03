import React from "react";
import { Button, Col, Image, Modal, Row } from "antd";

const ViewDocument = ({ modal, setModal }) => {
  const Header = () => {
    return (
      <>
        <Row justify="space-between">
          <Col>Copy of licence act 1234.pdf</Col>
          <Button align='end' type="secoundry">download</Button>
        </Row>
      </>
    );
  };
  return (
    <Modal
      className="viewDocument" //for hiding close btn
      title={<Header/>}
      visible={modal}
      onCancel={() => setModal(false)}
      onOk={() => setModal(false)}
      footer={[]}
      width={900}
    >
      <Image
        src="https://cdn.kalingatv.com/wp-content/uploads/2020/07/bmc-11.jpg"
        alt=""
      />
    </Modal>
  );
};

export default ViewDocument;
