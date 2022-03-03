import React, { useState } from "react";
import { Modal, Button, notification, Select } from "antd";
import { post } from "../../api/HTTPService";
import AddDataOption from "../main/centralRepo/components/AddDataOption";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
const { Option } = Select;

function AddModel({ visible, setVisible, setScreen, screen }) {
  const [region, setregion] = useState("Asia");
  const [zone, setzone] = useState("North Zone");
  const [country, setCountry] = useState("India");

  const [loading, setloading] = useState();
  // const [singlefile, setsingleFile] = React.useState("");

  const [selectedFile, setSelectedFile] = React.useState({
    file: "",
    fileName: "",
  });

  const handleModleClose = () => {
    setVisible(false);
    setSelectedFile({
      file: null,
      fileName: "",
    });
  };

  const uploadFile = async () => {
    setloading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile.file);
      formData.append("region", region);
      formData.append("country", country);
      formData.append("zone", zone);

      //for multiple files
      // for (let i = 0; i < selectedFile.file.length; i++) {
      // filesData.append(`file[${i}]`, selectedFile.file[i]);
      // }
      // filesData.append("formData", JSON.stringify(formData));
      const uploadFile = await post("/compliances/bulk_create/", formData);
      if (uploadFile && uploadFile.data.success) {
        setloading(false);
        // addToast("Successfully uploaded", {
        //   appearance: "success",
        //   autoDismissTimeout: 1000,
        // });
      }
      handleModleClose();
    } catch (e) {
      try {
        notification.open({
          message: "Error",
          description:
            e.response.data.message.errors[0].invalid_data.compliance.message,
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      } catch {
        notification.open({
          message: "Error",
          description:
            "Compliance with title 'Discrimination on wage on the grounds of gender' or requirement 'Ensure not to discriminate in wage matters based on the gender of an employee for the same or similar work and working conditions' already exist",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }

      // message.error(
      //   "Compliance with title 'Discrimination on wage on the grounds of gender' or requirement 'Ensure not to discriminate in wage matters based on the gender of an employee for the same or similar work and working conditions' already exist"
      // );
      setloading(false);
    }
  };

  const onSubmit = () => {
    if (screen === 1) {
      setScreen(2);
    }
    // else if (screen === 2) {
    //   uploadFile();
    // }
    else {
      return null;
    }
  };

  const AddUser = ({ dropDown, input, labelName }) => {
    const cls = {
      container: {
        padding: "0 10% 0 10%",
      },
      container2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItem: "center",
      },
      title: {
        textAlign: "center",
      },
      label: {
        fontWeight: "bold",
        fontSize: "16px",
        margin: "4% 0",
      },
      container3: {
        marginTop: "10%",
      },
    };
    return (
      <div style={cls.container}>
        {/* <h3 style={title}>Add User</h3> */}
        {input ? (
          <div style={cls.container2}>
            <label style={cls.label}>{labelName}</label>
            <input placeholder="type here" />
          </div>
        ) : dropDown ? (
          <div style={cls.container3}>
            <label style={cls.label}>{labelName}</label> <br />
            <Select
              defaultValue="type here"
              // value={region}
              // onChange={(value) => {
              //   setregion(value);
              // }}
            >
              <Option value={1}>Dummy</Option>
            </Select>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <Modal
        title="Add User"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={screen === 3 ? 500 : 500}
        footer={[
          screen === 2 ? null : (
            <Button
              key="submit"
              type="primary"
              loading={loading}
              // onClick={onSubmit}
            >
              next
            </Button>
          ),
        ]}
      >
        <div>
          {screen === 1 ? (
            <AddDataOption
              addUser
              setVisible={setVisible}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              setScreen={setScreen}
            />
          ) : screen === 2 ? (
            <>
              <AddUser dropDown labelName="USER NAME" />
              <AddUser dropDown labelName="USER DEPARTMENT" />
              <AddUser dropDown labelName="USER LEVEL" />
              <div style={cls.addUserBtnDiv}>
                <button style={cls.addUserBtn}>ADD USER</button>
              </div>
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}

export default AddModel;

const cls = {
  addUserBtnDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addUserBtn: {
    marginTop: "5%",
    backgroundColor: "#00ba75",
    color: "white",
    padding: "1% 10%",
    borderRadius: "8px",
    outline: "none",
    borderColor: "transparent",
    cursor: "pointer",
  },
};
