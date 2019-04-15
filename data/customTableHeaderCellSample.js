import React from "react";
import { TableCell } from "@material-ui/core";
import { columnPropType } from "../src/proptypes";

const customTableHeaderCellSample = ({ column }) => {
  switch (column.dataType) {
    case "number":
      return (
        <TableCell>
          <div className="number">{column.label}</div>
        </TableCell>
      );
    case "text":
      return (
        <TableCell>
          <div className="text">{column.label}</div>
        </TableCell>
      );
    case "boolean":
      return (
        <TableCell>
          <div className="boolean">{column.label}</div>
        </TableCell>
      );
    case "date":
      return (
        <TableCell>
          <div className="date">{column.label}</div>
        </TableCell>
      );
    default:
      return (
        <TableCell>
          <div className="default">{column.label}</div>
        </TableCell>
      );
  }
};

customTableHeaderCellSample.propTypes = {
  column: columnPropType
};

export default customTableHeaderCellSample;
