import React from "react";
import { columnPropType } from "../src/proptypes";

const customTableHeaderCellSample = ({ column }) => {
  switch (column.dataType) {
    case "number":
      return (
        <div style={{ color: "blue" }} className="number">
          {column.label}
        </div>
      );
    case "text":
      return (
        <div style={{ color: "green" }} className="text">
          {column.label}
        </div>
      );
    case "boolean":
      return (
        <div className="boolean" style={{ color: "black" }}>
          {column.label}
        </div>
      );
    case "dateTime":
      return <div className="dateTime">{column.label}</div>;
    default:
      return (
        <div style={{ color: "red" }} className="default">
          {column.label}
        </div>
      );
  }
};

customTableHeaderCellSample.propTypes = {
  column: columnPropType
};

export default customTableHeaderCellSample;
