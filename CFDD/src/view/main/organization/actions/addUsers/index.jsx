import React, { useState } from "react";
import ExcelFormModal from "../../../../components/modals/ExcelFormModal";
import SuccessModal from "../../../../components/modals/SuccessModal";
import AddAdminModal from "./AddUserForm";

function AddUsers({ showModel, setShowModel }) {
  const [screen, setScreen] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div>
      {screen === 0 ? (
        <ExcelFormModal
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setScreen={setScreen}
          showModel={showModel}
          setShowModel={setShowModel}
        />
      ) : screen === 1 ? (
        <AddAdminModal
          setScreen={setScreen}
          showModel={showModel}
          setShowModel={setShowModel}
        />
      ) : screen === 2 ? (
        <SuccessModal
          titleText="some string"
          setScreen={setScreen}
          showModel={showModel}
          setShowModel={setShowModel}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default AddUsers;
