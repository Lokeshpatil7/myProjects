import React, { useState } from "react";
import { Modal, Button, Table, Input, Row, Col } from "antd";
import { Colors } from "../../assets/Colors";
import MoreOptions from "../components/MoreOptions";
import SuccessModal from "./SuccessModal";
import { SelectInput, TextInput } from "../components/forms";

// const AddEntityForm = ({ labelName, number }) => {
//   const cls = {
//     container: {
//       //   display: "flex",
//       justifyContent: "center",
//       marginBottom: "4%",
//     },
//     container2: {
//       //   display: "flex",
//       flexDirection: "column",
//       //   width: "50%",
//       // backgroundColor : 'gray'
//     },
//     title: {
//       textAlign: "center",
//     },
//     label: {
//       fontWeight: "bold",
//       fontSize: "16px",
//       margin: "4% 0",
//     },
//     container3: {
//       marginTop: "10%",
//     },
//     myinput: {
//       border: 0,
//       outline: 0,
//       background: "transparent",
//       borderBottom: "1px solid black",
//       width: "100%",
//     },
//   };
//   return (
//     <div style={cls.container}>
//       <div style={cls.container2}>
//         <label className="label" style={cls.label}>
//           {labelName}
//         </label>
//         <input
//           style={cls.myinput}
//           maxlength={number ? "10" : "60"}
//           // type='tel'
//           type={number ? "number" : "text"}
//           placeholder="Type here"
//         />
//       </div>
//     </div>
//   );
// };

function ViewEntitiesModal({ show, setShow }) {
  const [screen, setScreen] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const myarray = ["Edit entity", "Add entity", "Delete Entity"];
  const dataSource = [
    {
      key: "1",
      sr_no: 1,
      name: "4562",
      email: "The Code on Wages, 2019",
      actions: <MoreOptions actionsList={myarray} />,
    },
  ];

  const onsubmit = () => {
    if (screen === 0) {
      setScreen(1);
    } else if (screen === 1) {
      setScreen(2);
      // setShow(false)
      setConfirm(true);
    } else if (screen === 2) {
      setShow(false);
    }
  };

  const columns = [
    {
      title: "SR NO",
      dataIndex: "sr_no",
      key: "sr_no",
    },
    {
      title: "UID",
      dataIndex: "sr_no",
      key: "uid",
    },
    {
      title: "ENTITY NAME",
      dataIndex: "sr_no",
      key: "entity_name",
    },
    {
      title: "UNIT",
      dataIndex: "name",
      key: "unit",
    },
    {
      title: "GST NUMBER",
      dataIndex: "name",
      key: "gst_number",
    },
    {
      title: "PAN",
      dataIndex: "name",
      key: "pan",
    },
    {
      title: "UNIT LOCATIONS",
      dataIndex: "name",
      key: "unit_location",
    },
    {
      title: "ENTITY ADMIN",
      dataIndex: "name",
      key: "entity_admin",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const formFeilds = [
    {
      label: "UID",
      placeholder: "Enter UID",
      field: "uid",
      inputType: "text",
    },
    {
      label: "Entity name",
      placeholder: "Enter",
      field: "Entityname",
      inputType: "text",
    },
    {
      label: "City",
      placeholder: "Enter",
      field: "applicability",
      inputType: "text",
    },
    {
      label: "GST Number",
      placeholder: "Enter",
      field: "UIDTitle",
      inputType: "text",
    },
    {
      label: "Pan",
      placeholder: "Enter",
      field: "UIDTitle",
      inputType: "text",
    },
    {
      label: "Unit locations",
      placeholder: "Enter",
      field: "UIDTitle",
      inputType: "text",
    },
    {
      label: "Entity Admin",
      placeholder: "Enter",
      field: "UIDTitle",
      inputType: "text",
    },
  ];

  return (
    <Modal
      centered
      visible={show}
      onOk={() => setShow("")}
      onCancel={() => setShow("")}
      width={confirm ? 500 : 1200}
      footer={[
        <div style={cls.submitDiv}>
          <Button
            style={cls.submitBtn}
            key="submit"
            onClick={() => onsubmit()}
            // loading={loading}
          >
            {screen === 2 ? "DONE" : "ADD  ENTITY"}
          </Button>
        </div>,
      ]}
    >
      {confirm ? null : (
        <div style={cls.titleDiv}>
          <label style={cls.title}>
            ABC Group - {screen === 1 && "Add"} Entities
          </label>
        </div>
      )}
      {screen === 0 ? (
        <Table pagination={false} dataSource={dataSource} columns={columns} />
      ) : screen === 1 ? (
        <>
          <Row gutter={15}>
            {formFeilds.map((fieldDetail, index) => (
              <Col key={index} className="gutter-row" span={8}>
                {fieldDetail.inputType === "text" ? (
                  <TextInput
                    label={fieldDetail.lable}
                    placeholder={fieldDetail.placeholder}
                  />
                ) : (
                  <SelectInput
                    label={fieldDetail.lable}
                    placeholder={fieldDetail.placeholder}
                    options={fieldDetail.options}
                  ></SelectInput>
                )}
              </Col>
            ))}
          </Row>
          {/* <AddEntityForm labelName="PHONE NUMBER" number /> */}
        </>
      ) : confirm ? (
        <div>
          <SuccessModal titleText="Admin added Successfully" />
        </div>
      ) : null}
    </Modal>
  );
}

export default ViewEntitiesModal;

const cls = {
  submitDiv: {
    display: "flex",
    justifyContent: "center",
  },
  submitBtn: {
    backgroundColor: Colors.green,
    color: "white",
    padding: "1% 10%",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "2% 0",
  },
};
