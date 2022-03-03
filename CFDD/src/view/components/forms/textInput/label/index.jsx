import React from "react";

const CustomLabel = ({ label, data }) => {
  return (
    <div style={{ marginTop: "12%" }}>
      <label style={{fontSize : '15px', fontWeight : 'bold', opacity : 0.5}}> {label} </label> <br />
      <label> {data} </label>
    </div>
  );
};

export default CustomLabel;