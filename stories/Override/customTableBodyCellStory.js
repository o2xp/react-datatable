import React from "react";
import { Paper, TableCell } from "@material-ui/core";
import { Datatable } from "../../src/index";
import { minimumOptionsSample } from "../../data/samples";
import { cellValPropType, columnPropType } from "../../src/proptypes";

const buildCustomTableBodyCell = ({ cellVal, column }) => {
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
  return <TableCell>{val}</TableCell>;
};

const customTableBodyCellStory = () => {
  return (
    <Paper>
      <Datatable
        options={minimumOptionsSample}
        CustomTableBodyCell={buildCustomTableBodyCell}
      />
    </Paper>
  );
};

buildCustomTableBodyCell.propTypes = {
  cellVal: cellValPropType,
  column: columnPropType
};

export default customTableBodyCellStory;
