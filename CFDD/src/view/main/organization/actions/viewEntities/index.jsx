import React, { useState } from "react";
import SuccessModal from "../../../../components/modals/SuccessModal";
import AddEntity from "./AddEntityModal";
import EntitiesModal from "./EntitiesModal";

function ViewGroupAdminOrg({ showModel, setShowModel, selected, setSelected, getOrg }) {
  const [screen, setScreen] = useState(0);

  return (
    <div>
      {screen === 0 ? (
        <EntitiesModal
          setScreen={setScreen}
          showModel={showModel}
          setShowModel={setShowModel}
        />
      ) : screen === 1 ? (
        <AddEntity
          getOrg={getOrg}
          selected={selected}
          setSelected={setSelected}
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

export default ViewGroupAdminOrg;
