import React from "react";
import { TableCell } from "@material-ui/core";
import { cellValPropType, columnPropType } from "../src/proptypes";

const customTableBodyCellSample = ({ cellVal, column }) => {
  let val;
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
        val = <div style={{ color: "red", textAlign: "center" }}>No</div>;
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
  if (val) {
    return <TableCell>{val}</TableCell>;
  }
  return <TableCell className="no-data" />;
};

customTableBodyCellSample.propTypes = {
  cellVal: cellValPropType,
  column: columnPropType
};

export default customTableBodyCellSample;
