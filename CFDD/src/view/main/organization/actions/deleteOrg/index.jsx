import React from "react";
import ConfirmModal from "../../../../components/modals/ConfirmModal";

export default function DeleteOrg({ showModel, setShowModel, selectedEntity }) {
  const onOk = () => {};
  const onCancel = () => {
    setShowModel(false);
  };
  return (
    <div>
      <ConfirmModal
        show={showModel}
        onOk={onOk}
        onCancel={onCancel}
        message={"Are you sure you want to delete this?"}
      />
    </div>
  );
}
