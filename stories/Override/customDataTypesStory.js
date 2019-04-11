import React from "react";
import { Paper, TableCell } from "@material-ui/core";
import { Datatable } from "../../src/index";
import { minimumOptionsSample } from "../../data/samples";

const customDataTypes = [
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

const customDataTypesStory = () => {
  return (
    <Paper>
      <Datatable
        options={minimumOptionsSample}
        customDataTypes={customDataTypes}
      />
    </Paper>
  );
};

export default customDataTypesStory;
