import React, { useState } from "react";
import Edit from "./Edit";
import SuccessModal from "../../../../../components/modals/SuccessModal";

const EditQuestion = ({ modal, setModal }) => {
  const [screen, setScreen] = useState(0);

  return (
    <div>
      {screen === 0 ? (
        <Edit setScreen={setScreen} modal={modal} setModal={setModal} />
      ) : screen === 1 ? (
        <SuccessModal
          setScreen={setScreen}
          showModel={modal}
          setShowModel={setModal}
          titleText="Question updated successfully"
        />
      ) : null}
    </div>
  );
};

export default EditQuestion;
