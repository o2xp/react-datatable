import React from "react";
import { cellValPropType, columnPropType } from "../src/proptypes";

const customTableBodyCellSample = ({ cellVal, column }) => {
  let val;
  if (cellVal === null || cellVal === undefined) {
    val = <div className="no-data" />;
  } else {
    switch (column.dataType) {
      case "boolean":
        if (cellVal) {
          val = (
            <div
              className="data-boolean"
              style={{ color: "green", textAlign: "center" }}
            >
              Yes
            </div>
          );
        } else {
          val = (
            <div
              className="data-boolean"
              style={{ color: "red", textAlign: "center" }}
            >
              No
            </div>
          );
        }
        break;
      default:
        val = (
          <div className="data" style={{ color: "blue" }}>
            {cellVal}
          </div>
        );
        break;
    }
  }

  return val;
};

customTableBodyCellSample.propTypes = {
  cellVal: cellValPropType,
  column: columnPropType
};

export default customTableBodyCellSample;
