import React from "react";
import { TableCell } from "@material-ui/core";
import { columnPropType } from "../src/proptypes";

const customTableHeaderCellSample = ({ column }) => {
  return (
    <TableCell>
      <div style={{ color: "blue" }}>{column.label}</div>
    </TableCell>
  );
};

customTableHeaderCellSample.propTypes = {
  column: columnPropType
};

export default customTableHeaderCellSample;
