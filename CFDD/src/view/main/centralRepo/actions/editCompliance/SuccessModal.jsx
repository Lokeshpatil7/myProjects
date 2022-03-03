import React from "react";
import fileContainer from "../../../../../assets/images/alert/sucess_file.svg";
import "../../../../../assets/less/components/SuccessModal/SuccessModal.css";
// import '../../../../../assets'

import { Button, Modal } from "antd";

const SuccessModal = ({
  titleText,
  showModel,
  setShowModel,
  No,
  setScreen = () => {},
}) => {
  return (
    <Modal centered visible={showModel} width={600} footer={[<div></div>]}>
      <div className="container">
        <div className="container2">
          <div className="file-img">
            <img alt='' className="file_manager" src={fileContainer} />
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
