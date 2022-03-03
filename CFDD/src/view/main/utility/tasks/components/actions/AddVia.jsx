import React from "react";
import { Row, Col, Divider, Button, Upload, Modal } from "antd";
import excelFile from "../../../../../../assets/images/centralRepo/viaExcel.svg";
import vaiForm from "../../../../../../assets/images/centralRepo/viaForm.svg";

function AddVia({ selectedFile, setScreen, modal, setModal }) {
  // const onChange = (info) => {
  //   if (info.file)
  //     setSelectedFile((prevVal) => ({
  //       ...prevVal,
  //       file: info.file.originFileObj,
  //       fileName: info.file.name,
  //     }));
  // };

  return (
    <Modal
      centered
      visible={modal}
      onCancel={() => {setModal(false); setScreen(0)}}
      footer={
        [
          // <div style={{ display: "flex", justifyContent: "center" }}>
          //   <Button type="secoundry" onClick={() => setScreen(1)}>
          //     Next
          //   </Button>
          // </div>,
        ]
      }
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={10} className="da-text-center">
          <img src={excelFile} alt="" /> <br />
          <br />
          <Upload
            // onChange={onChange}
            action=""
            showUploadList={false}
          >
            <Button type="secoundry"> Add Via Excel </Button>
          </Upload>
          <br />
          <small>{selectedFile?.fileName}</small>
        </Col>
        <Col span={2} className="da-text-center">
          <Divider type="vertical" style={{ height: "180px" }} />
        </Col>
        <Col span={10} className="da-text-center">
          <img src={vaiForm} alt="" />
          <br />
          <br />
          <Button type="secoundry" onClick={() => setScreen(1)}>
            Add Via Form
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}

export default AddVia;
