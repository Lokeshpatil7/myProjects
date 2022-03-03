import React, { useState } from "react";
import SuccessModal from "../../../../components/modals/SuccessModal";
import AddAdminModal from "./AddAdminModal/";
import GroupAdminModal from "./GroupAdminModal";
import RemoveAdmin from "./RemoveAdmin";

function ViewGroupAdminOrg({ showModel, setShowModel }) {
  const [screen, setScreen] = useState(0);
  const [userToRemove, setUserToRemove] = useState(null);

  return (
    <div>
      {screen === 0 ? (
        <GroupAdminModal
          setScreen={setScreen}
          showModel={showModel}
          setShowModel={setShowModel}
          setUserToRemove={setUserToRemove}
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
      ) : screen === 3 ? (
        <RemoveAdmin
          setScreen={setScreen}
          showModel={showModel}
          setShowModel={setShowModel}
          selectedUser={userToRemove}
          setUserToRemove={setUserToRemove}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ViewGroupAdminOrg;
