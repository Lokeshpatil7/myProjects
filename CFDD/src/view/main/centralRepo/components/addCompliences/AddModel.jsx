import React, { useState } from "react";
import { Modal, Button, notification } from "antd";
import { post } from "../../../../../api/HTTPService";
import ZoneForm from "./ZoneForm";
import AddDataOption from "./AddDataOption";
import AddComplianceForm from "./form";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { useEffect } from "react";

function AddModel({ visible, setVisible, setScreen, screen, getRepo }) {
  const [region, setregion] = useState("Asia");
  const [zone, setzone] = useState("North Zone");
  const [country, setCountry] = useState("India");
  const [loading, setloading] = useState();
  const [finalScreen, setFinalScreen] = useState(false);
  const [name, setName] = useState("");
  // const [singlefile, setsingleFile] = React.useState("");
  console.log("region", region);
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
    setloading(true);
    const formData = new FormData();
    formData.append("file", selectedFile.file);
    formData.append("region", region);
    formData.append("country", country);
    formData.append("zone", zone);

    try {
      const uploadFile = await post("/upload/compliance", formData);
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

      getRepo();
      setScreen(1);
      setVisible(false);
      setloading(false);
      // handleModleClose();
    } catch (e) {
      setloading(false);
      let errorMessage = prepErrorMessage(
        e.response.data.message.errors[0].type,
        e.response.data.message.errors[0]
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
      setVisible(false);
      // handleModleClose();
    }
  };

  const onSubmit = () => {
    if (screen === 1) {
      console.log("1", region);
      setScreen(2);
    } else if (screen === 2) {
      console.log("2", region);
      uploadFile();
    } else {
      console.log("3", region);
      // submit form
    }
  };

  console.log("333", region, zone, country);
  console.log("screen", screen);
  console.log("finalScreen", finalScreen);
  return (
    <div>
      <Modal
        title="Add Compliance"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={screen === 3 ? 900 : 500}
        footer={[
          <Button
            key="submit"
            type="secoundry"
            loading={loading}
            onClick={onSubmit}
          >
            next
          </Button>,
        ]}
      >
        <div>
          {screen === 1 ? (
            <ZoneForm
              region={region}
              setregion={setregion}
              zone={zone}
              setzone={setzone}
              country={country}
              setCountry={setCountry}
            />
          ) : screen === 2 ? (
            <AddDataOption
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              setScreen={setScreen}
              setFinalScreen={setFinalScreen}
            />
          ) : screen === 4 ? (
            <AddComplianceForm
              region={region}
              zone={zone}
              country={country}
            ></AddComplianceForm>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </div>
  );
}

export default AddModel;
