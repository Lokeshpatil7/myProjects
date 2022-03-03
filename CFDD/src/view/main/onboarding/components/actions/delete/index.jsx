import React, { useState } from "react";
import { httpDelete } from "../../../../../../api/HTTPService";
import ConfirmModal from "../../../../../components/modals/ConfirmModal";
import SuccessModal from "../../../../../components/modals/SuccessModal";

const DeleteQuestion = ({ modal, setModal, selectedRowId }) => {
  const [screen, setScreen] = useState(0);
  return (
    <div>
      {screen === 0 ? (
        <ConfirmModal
          message="Are you sure you want to delete this?"
          show={modal}
          onCancel={() => {
            setModal(false);
          }}
          okText="Delete"
          onOk={async () => {
            console.log(selectedRowId);
            await httpDelete("/questions/" + selectedRowId);
            setScreen(1);
          }}
        />
      ) : screen === 1 ? (
        <SuccessModal
          deleteIcon
          titleText="Question deleted successfully"
          setScreen={setScreen}
          showModel={modal}
          setShowModel={setModal}
        />
      ) : null}
    </div>
  );
};

export default DeleteQuestion;
