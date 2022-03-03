import React, { useState } from "react";
import Add from "./Add";
import SuccessModal from "../../../../../components/modals/SuccessModal";
import AddDataOption from "../../../../centralRepo/components/addCompliences/AddDataOption";
import { Button, Modal, notification } from "antd";
import { post } from "../../../../../../api/HTTPService";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";

const AddQuestion = ({ modal, setModal, mode, data }) => {
  const [screen, setScreen] = useState(0);
  const [selectedFile, setSelectedFile] = React.useState({
    file: "",
    fileName: "",
  });

  function prepErrorMessage(type, errorObj) {
    let errorMessage_ = { type: "", description: "" };
    switch (type) {
      case "SHEET": {
        errorMessage_.type = type;
        errorMessage_.description = errorObj.message;
        break;
      }
      case "RECORDS": {
        let missing_fields_details;
        let invalid_fields_details;
        errorMessage_.type = type;
        if (errorObj && errorObj.missing_fields) {
          let missing_fields = Object.keys(errorObj.missing_fields);
          missing_fields_details = missing_fields.map((key) => {
            let str = `Column:  ${key}
                        Row Numbers:  ${errorObj.missing_fields[key].row_numbers}
                        Message:  ${errorObj.missing_fields[key].message}
                        `;
            return str;
          });
        }
        if (errorObj && errorObj.invalid_data) {
          let invalid_data = Object.keys(errorObj.invalid_data);
          invalid_fields_details = invalid_data.map((key) => {
            let str = `Column:  ${key}
                        Row Numbers:  ${errorObj.invalid_data[key].row_numbers}
                        Message:  ${errorObj.invalid_data[key].message}
                        `;
            return str;
          });
        }
        errorMessage_.description =
          missing_fields_details + invalid_fields_details;
        break;
      }
      default: {
        errorMessage_.type = "SYSTEM";
        errorMessage_.description =
          "Something went wrong. Please contact administrator!";
      }
    }
    return errorMessage_;
  }

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile.file);

    try {
      const uploadFile = await post("/upload/question", formData);
      if (uploadFile) {
        notification.open({
          message: "Data Added Successfully",
          description: "",
          icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
      setScreen(2);
      setModal(false);
    } catch (e) {
      let errorMessage = prepErrorMessage(
        "Server", //e.response.data.message.errors[0].type,
        "Error while uploading the file" //e.response.data.message.errors[0]
      );

      notification.open({
        duration: 0,
        message: errorMessage.type,
        description: errorMessage.description,
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        ),
      });
      setScreen(1);
      // handleModleClose();
    }
  };

  return (
    <div>
      {screen === 0 ? (
        <Modal
          centered
          visible={modal}
          onCancel={() => {
            setModal(false);
            setScreen(0);
          }}
          width={600}
          footer={[
            <Button key="submit" type="secoundry" onClick={uploadFile}>
              Submit
            </Button>,
          ]}
        >
          <AddDataOption
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            setScreen={setScreen}
            addQuestion={true}
          />
        </Modal>
      ) : screen === 1 ? (
        <Add
          setScreen={setScreen}
          modal={modal}
          setModal={setModal}
          mode={mode}
          data={data}
        />
      ) : (
        <SuccessModal
          setScreen={setScreen}
          showModel={modal}
          setShowModel={setModal}
          titleText={
            "Question " +
            (mode === "ADD" ? "added" : "edited") +
            " successfully"
          }
        />
      )}
    </div>
  );
};

export default AddQuestion;
