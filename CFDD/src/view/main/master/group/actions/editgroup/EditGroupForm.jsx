import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, notification } from "antd";
import { Colors } from "../../../../../../assets/Colors";
import { put } from "../../../../../../api/HTTPService";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import GenerateForm from "../../../../../components/forms/GenerateForm";

function EditGroupForm({
  showModel,
  setShowModel,
  selected,
  setSelected,
  getGroup,
}) {
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({ ...selected });

  useEffect(() => {
    setFormData({ ...selected });
  }, [selected]);

  const onSubmit = async () => {
    if (formData.groupName !== "" && formData.entityName !== "") {
      setLoading(true);
      try {
        const addedUser = await put(`/groups/${selected.id}/`, {
          description: formData.description,
          name: formData.name,
        }).then();
        if (addedUser && addedUser.success) {
          notification.open({
            message: "Data Updated Successfully",
            description: "",
            icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
            closeIcon: (
              <RiCloseFill
                className="remix-icon da-text-color-black-80"
                size={24}
              />
            ),
          });
          setLoading(false);

          setSelected(null);
          getGroup();
          setShowModel(false)
        }

        getGroup();

        setSelected(null);
        setLoading(false);
      } catch (e) {
        notification.open({
          message: "Error",
          description: e.response.message
            ? e.response.message
            : "something went wrong.",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
        setLoading(false);
        // handleModleClose();
      }
    }
  };
  return (
    <Modal
      title='EDIT GROUP'
      centered
      visible={showModel}
      onOk={() => setShowModel(false)}
      onCancel={() => setShowModel(false)}
      width={500}
      footer={[
        <div style={cls.submitDiv}>
          <Button
            style={cls.submitBtn}
            key="submit"
            onClick={onSubmit}
            loading={loading}
          >
            Update
          </Button>
        </div>,
      ]}
    >

      <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24}>
          <GenerateForm
            formField={formField}
            formData={formData}
            setFormData={setFormData}
            colSpan={24}
          />
        </Col>
      </Row>
    </Modal>
  );
}

export default EditGroupForm;

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

const formField = [
  {
    label: "GROUP NAME",
    placeholder: "Enter group",
    field: "name",
    inputType: "text",
    //   options : ['hello', 'hii']
  },
  {
    label: "DESCRIPTION",
    placeholder: "Enter group",
    field: "description",
    inputType: "text",
  },
];
