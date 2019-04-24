import React from "react";
import { columnPropType } from "../src/proptypes";

const customTableHeaderCellSample = ({ column }) => {
  switch (column.dataType) {
    case "number":
      return <div className="number">{column.label}</div>;
    case "text":
      return <div className="text">{column.label}</div>;
    case "boolean":
      return <div className="boolean">{column.label}</div>;
    case "date":
      return <div className="date">{column.label}</div>;
    default:
      return <div className="default">{column.label}</div>;
  }
};

customTableHeaderCellSample.propTypes = {
  column: columnPropType
};

export default customTableHeaderCellSample;
