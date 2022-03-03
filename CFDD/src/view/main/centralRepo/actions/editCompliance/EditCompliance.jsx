import React, { useState, useEffect } from "react";
import { Button, Col, Modal, notification, Row } from "antd";
import { SelectInput, TextInput } from "../../../../components/forms";
import FormFilds from "../editCompliance/editFormField";
import SuccessModal from "./SuccessModal";
import { put } from "../../../../../api/HTTPService";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";

export default function EditCompliance({
  formData,
  rule,
  legislation,
  setFormData,
  legislation_rule,
}) {
  const [loading, setloading] = useState();
  const [preData, setPreData] = useState();
  const [formFilds, setFormFilds] = useState([]);

  const SubmitEvent = async () => {
    const dataToUpdate = {
      applicability: formData.applicability,
      frequency: formData.frequency,
      linkage: formData.linkage,
      title: formData.title,
      reference: formData.reference,
      requirement: formData.requirement,
      threshold: formData.threshold,
      threshold_value: formData.threshold_value,
      threshold_unit: formData.threshold_unit,
      authority: formData.authority,
      help_text: formData.help_text,
      daily_fine_amount: formData.daily_fine_amount,
      online_link: formData.online_link,
      severity: formData.severity,
      source_matrix: formData.source_matrix,
      legislation: legislation.find((el) => el.name === formData.legislation_)
        .id,
      rule: rule.find((el) => el.name === formData.rule_).id,
    };
    if (JSON.stringify(preData) === JSON.stringify(dataToUpdate)) {
      notification.open({
        message: "Error ",
        description: "NO change in Data",
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        ),
      });
      return;
    }

    try {
      const uploadFile = await put(
        "/compliances/" + formData.id,
        dataToUpdate
      ).then();
      if (uploadFile && uploadFile.success) {
        notification.open({
          message: "Updated Successfully",
          description: "",
          icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });

        setFormData(null);
      }
      setloading(false);
      // handleModleClose();
    } catch (e) {
      const errorKeys = Object.keys(
        e.response.data.message.errors[0].invalid_data
      );

      notification.open({
        message: "Error in " + errorKeys[0],
        description:
          e.response.data.message.errors[0].invalid_data[errorKeys[0]].message,
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        ),
      });

      setloading(false);
      // handleModleClose();
    }
  };

  useEffect(() => {
    FormFilds[0].options = legislation_rule
      ? legislation_rule.map((el) => el.le.name)
      : [];

    // FormFilds[1].options = rule ? rule.map((el) => el.name) : [];
    if (formData && !formData.legislation_) {
      const formData_ = formData;
      formData_.legislation_ = formData.legislation.name;

      const leg_index = legislation.findIndex(
        (el) => el.name === formData_.legislation_
      );

      FormFilds[1].options = legislation_rule
        ? legislation_rule[leg_index].rule.map((el) => el.name)
        : [];

      formData_.rule_ = formData.rule.name;

      setFormData({ ...formData_ });
      setFormFilds(FormFilds);

      const prevsData = {
        applicability: formData_.applicability,
        authority: formData_.authority,
        frequency: formData_.frequency,
        linkage: formData_.linkage,
        title: formData_.title,
        reference: formData_.reference,
        requirement: formData_.requirement,
        threshold: formData_.threshold,
        threshold_value: formData_.threshold_value,
        threshold_unit: formData_.threshold_unit,
        help_text: formData_.help_text,
        daily_fine_amount: formData_.daily_fine_amount,
        online_link: formData_.online_link,
        severity: formData_.severity,
        source_matrix: formData_.source_matrix,
        legislation: legislation.find(
          (el) => el.name === formData_.legislation_
        ).id,
        // rule: rule.find((el) => el.name === formData_.rule_).id,
      };
      setPreData(prevsData);
    }
  }, [formData, preData]);

  return (
    <>
      {formData ? (
        <Modal
          centered
          visible={true}
          onOk={() => setFormData(null)}
          onCancel={() => setFormData(null)}
          width={900}
          footer={[
            <div>
              <Button onClick={() => setFormData(null)}>Cancel</Button>
              <Button
                loading={loading}
                onClick={() => SubmitEvent()}
                type="secoundry"
              >
                Update
              </Button>
            </div>,
          ]}
        >
          <div className="modal-title">Edit Compliance</div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {formFilds.map((fieldDetail, index) => (
              <Col key={index} className="gutter-row" span={8}>
                {fieldDetail.inputType === "text" ? (
                  <TextInput
                    label={fieldDetail.label}
                    placeholder={fieldDetail.placeholder}
                    value={formData[fieldDetail.fild]}
                    field={fieldDetail.fild}
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, [e.target.name]: e.target.value };
                      });
                    }}
                  />
                ) : (
                  <SelectInput
                    label={fieldDetail.label}
                    placeholder={fieldDetail.placeholder}
                    options={fieldDetail.options}
                    value={formData[fieldDetail.fild]}
                    onChange={(e) => {
                      if (fieldDetail.fild === "legislation_") {
                        const leg_index = legislation.findIndex(
                          (el) => el.name === e
                        );
                        const prev = formFilds;
                        prev[1].options = legislation_rule[leg_index].rule.map(
                          (el) => el.name
                        );
                        setFormFilds([...prev]);
                      }

                      setFormData((prev) => {
                        return { ...prev, [fieldDetail.fild]: e };
                      });
                    }}
                  ></SelectInput>
                )}
              </Col>
            ))}
          </Row>
          <br /> <br />
        </Modal>
      ) : (
        <SuccessModal />
      )}
    </>
  );
}
