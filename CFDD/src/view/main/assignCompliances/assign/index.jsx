import { notification } from "antd";
import React, { useState } from "react";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { post } from "../../../../api/HTTPService";
import SelectCompliances from "./selectCompliances";
import VerifySelectedCompliances from "./VerifySelectedCompliances";

const Assign = () => {
  const [verify, setVerify] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [, setLoading] = useState(false);

  const [selectedCompliences, setSelectedCompliences] = useState([]);

  const assingCompliances = async () => {
    setLoading(true);
    const dataToSubmit = {
      compliance_ids: selectedCompliences.map((complience) => complience.id),
      group_id: selectedGroup.id,
      entity_id: selectedEntity.id,
      unit_id: selectedUnit.id,
    };
    try {
      const added = await post(`compliance/assign/`, dataToSubmit);
      if (added && added.success) {
        notification.open({
          message: "Assigned Successfully",
          description: "",
          icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
      setLoading(false);
    } catch (e) {
      notification.open({
        message: "Error",
        description: e?.response?.data?.message,
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        ),
      });
      setLoading(false);
      // handleModleClose();
    }
  };

  return (
    <>
      <SelectCompliances
        setSelectedGroup={setSelectedGroup}
        setSelectedEntity={setSelectedEntity}
        setSelectedUnit={setSelectedUnit}
        selectedUnit={selectedUnit}
        setSelectedCompliences={setSelectedCompliences}
        selectedCompliences={selectedCompliences}
        setVerify={setVerify}
        verify={verify}
        assingCompliances={assingCompliances}
      />

      <VerifySelectedCompliances
        selectedGroup={selectedGroup}
        selectedEntity={selectedEntity}
        selectedUnit={selectedUnit}
        selectedCompliences={selectedCompliences}
        setVerify={setVerify}
        verify={verify}
        assingCompliances={assingCompliances}
      />
    </>
  );
};

export default Assign;
