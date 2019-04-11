import React from "react";
import { TableCell } from "@material-ui/core";

const customDataTypesSample = [
  {
    dataType: "number",
    component: cellVal => (
      <TableCell>
        <div style={{ color: "orange" }}>{cellVal}</div>
      </TableCell>
    )
  },
  {
    dataType: "text",
    component: cellVal => (
      <TableCell>
        <div style={{ color: "purple" }}>{cellVal}</div>
      </TableCell>
    )
  },
  {
    dataType: "iban",
    component: cellVal => (
      <TableCell>
        <div style={{ color: "red" }}>{cellVal}</div>
      </TableCell>
    )
  }
];

export default customDataTypesSample;
