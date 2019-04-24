import React from "react";

const customDataTypesSample = [
  {
    dataType: "number",
    component: cellVal => (
      <div style={{ color: "orange", textAlign: "center" }}>{cellVal}</div>
    )
  },
  {
    dataType: "text",
    component: cellVal => <div style={{ color: "purple" }}>{cellVal}</div>
  },
  {
    dataType: "iban",
    component: cellVal => <div style={{ color: "red" }}>{cellVal}</div>
  }
];

export default customDataTypesSample;
