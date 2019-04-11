import React from "react";
import { Paper, TableRow, TableCell } from "@material-ui/core";
import { Datatable } from "../../src/index";
import { minimumOptionsSample } from "../../data/samples";
import {
  rowPropType,
  columnsOrderPropType,
  indexPropType
} from "../../src/proptypes";

const buildCustomTableBodyRow = ({ row, columnsOrder, rowIndex }) => {
  return (
    <TableRow
      style={{ background: rowIndex % 2 === 0 ? "#3f3f3f" : "#5f5f5f" }}
    >
      {columnsOrder.map(columnId => {
        return (
          <TableCell key={columnId}>
            <div style={{ color: "pink" }}>{row[columnId]}</div>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const customTableBodyRowStory = () => {
  return (
    <Paper>
      <Datatable
        options={minimumOptionsSample}
        CustomTableBodyRow={buildCustomTableBodyRow}
      />
    </Paper>
  );
};

buildCustomTableBodyRow.propTypes = {
  row: rowPropType,
  columnsOrder: columnsOrderPropType,
  rowIndex: indexPropType
};

export default customTableBodyRowStory;
