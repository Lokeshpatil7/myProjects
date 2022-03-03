import React from "react";
import { Row, Col, Divider, Button, Upload } from "antd";
import excelFile from "../../../../../assets/images/centralRepo/viaExcel.svg";
import vaiForm from "../../../../../assets/images/centralRepo/viaForm.svg";

function AddDataOption({
  setSelectedFile,
  selectedFile,
  setScreen,
  addUser,
  addQuestion,
  setRegion,
}) {
  console.log("addData caption");
  const onChange = (info) => {
    if (info.file)
      setSelectedFile((prevVal) => ({
        ...prevVal,
        file: info.file.originFileObj,
        fileName: info.file.name,
      }));
  };

  // const addViaForm = () => {
  //   return (
  //     <Modal
  //       title="Add User via form"
  //       centered
  //       visible={show}
  //       onOk={() => setShow(false)}
  //       onCancel={() => setShow(false)}
  //     >
  //       hello from add form
  //     </Modal>
  //   );
  // };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={10} className="da-text-center">
          <img src={excelFile} alt="" /> <br />
          <br />
          <Upload onChange={onChange} action="" showUploadList={false}>
            <Button type="secoundry"> Add Via Excel </Button>
          </Upload>
          <br />
          <small>{selectedFile.fileName}</small>
        </Col>
        <Col span={2} className="da-text-center">
          <Divider type="vertical" style={{ height: "180px" }} />
        </Col>
        <Col span={10} className="da-text-center">
          <img src={vaiForm} alt="" />
          <br />
          <br />
          <Button
            type="secoundry"
            onClick={() => {
              if (addUser) {
                console.log("if");
                setScreen(2);
              } else if (addQuestion) {
                console.log("else if");
                setScreen(1);
              } else {
                // console.log("else");

                setScreen(4);
              }
            }}
          >
            Add Via Form
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default AddDataOption;
