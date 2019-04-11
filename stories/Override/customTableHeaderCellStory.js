import React from "react";
import { Paper, TableCell } from "@material-ui/core";
import { Datatable } from "../../src/index";
import { minimumOptionsSample } from "../../data/samples";
import { columnPropType } from "../../src/proptypes";

const buildCustomTableHeaderCell = ({ column }) => {
  return (
    <TableCell>
      <div style={{ color: "blue" }}>{column.label}</div>
    </TableCell>
  );
};

const customTableHeaderCellStory = () => {
  return (
    <Paper>
      <Datatable
        options={minimumOptionsSample}
        CustomTableHeaderCell={buildCustomTableHeaderCell}
      />
    </Paper>
  );
};

buildCustomTableHeaderCell.propTypes = {
  column: columnPropType
};

export default customTableHeaderCellStory;
