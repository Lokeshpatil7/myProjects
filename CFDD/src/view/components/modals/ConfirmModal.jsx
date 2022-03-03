import React from "react";
import { Button, Modal } from "antd";

function ConfirmModal({
  show = false,
  onCancel = () => {},
  cancelText = "cancle",
  onOk = () => {},
  okText = "ok",
  message,
}) {
  return (
    <Modal
      centered
      visible={show}
      onCancel={onCancel}
      onOk={onOk}
      width={500}
      footer={[
        <div>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button type="secoundry" onClick={onOk}>
            {okText}
          </Button>
        </div>,
      ]}
    >
      <h4 style={{ textAlign: "center", marginTop: "40px" }}>{message}</h4>
    </Modal>
  );
}

export default ConfirmModal;
