import React from "react";
import ConfirmModal from "../../../../../../components/modals/ConfirmModal";

export default function RemoveAdmin({
  showModel,
  setShowModel,
  selectedUser,
  setScreen,
}) {
  const onOk = () => {};
  const onCancel = () => {
    setShowModel(false);
    setScreen(0);
  };
  return (
    <div>
      <ConfirmModal
        show={showModel}
        onOk={onOk}
        onCancel={onCancel}
        message={"Are you sure you want to remove admin?"}
      />
    </div>
  );
}
