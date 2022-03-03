import React from "react";
import fileContainer from "../../../assets/images/alert/sucess_file.svg";
import deleteFile from "../../../assets/images/alert/delete.svg";
import "../../../assets/less/components/SuccessModal/SuccessModal.css";

import { Button, Modal } from "antd";

const SuccessModal = ({
  titleText,
  showModel,
  setShowModel,
  deleteIcon,
  setScreen = () => {},
}) => {
  return (
    <Modal
      centered
      visible={showModel}
      onCancel={() => {
        setShowModel(false);
        setScreen(0);
      }}
      width={600}
      footer={[<div></div>]}
    >
      <div className="container">
        <div className="container2">
          <div className="file-img">
            {deleteIcon ? (
              <img alt="" className="file_manager" src={deleteFile} />
            ) : (
              <img alt="" className="file_manager" src={fileContainer} />
            )}
          </div>
          <div className="titleText">{titleText}</div>

          <div className="btn-container">
            <Button
              key="submit"
              type="secoundry"
              onClick={() => {
                setShowModel(false);
                setScreen(0);
              }}
              // loading={loading}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
