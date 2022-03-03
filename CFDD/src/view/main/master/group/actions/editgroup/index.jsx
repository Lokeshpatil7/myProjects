import React from "react";
import EditGroupForm from "./EditGroupForm";

const EditGroup = ({
  showModel,
  setShowModel,
  selected,
  setSelected,
  getGroup,
}) => {
  return (
    <div>
      <EditGroupForm
        getGroup={getGroup}
        selected={selected}
        setSelected={setSelected}
        showModel={showModel}
        setShowModel={setShowModel}
      />
    </div>
  );
};

export default EditGroup;
