import React from "react";
import EditOrg from "../../EditOrg";

export default function EditOrgIndex({ showModel, setShowModel, selected, setSelected, getOrg }) {
  return (
    <div>
      <EditOrg
        getOrg={getOrg}
        selected={selected}
        setSelected={setSelected}
        showModel={showModel}
        setShowModel={setShowModel}></EditOrg>
    </div>
  );
}
