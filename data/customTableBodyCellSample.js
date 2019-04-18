import React from "react";
import { cellValPropType, columnPropType } from "../src/proptypes";

const customTableBodyCellSample = ({ cellVal, column }) => {
  let val;
  switch (column.dataType) {
    case "boolean":
      if (cellVal) {
        val = <div style={{ color: "green", textAlign: "center" }}>Yes</div>;
      } else {
        val = <div style={{ color: "red", textAlign: "center" }}>No</div>;
      }
      break;
    default:
      val = <div style={{ color: "blue" }}>{cellVal}</div>;
      break;
  }
  return val;
};

customTableBodyCellSample.propTypes = {
  cellVal: cellValPropType,
  column: columnPropType
};

export default customTableBodyCellSample;
