import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import {
  rowPropType,
  columnsOrderPropType,
  indexPropType
} from "../src/proptypes";

const customTableBodyRowSample = ({ row, columnsOrder, rowIndex }) => {
  return (
    <TableRow
      className={rowIndex % 2 === 0 ? "stripped" : "not-stripped"}
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

customTableBodyRowSample.propTypes = {
  row: rowPropType,
  columnsOrder: columnsOrderPropType,
  rowIndex: indexPropType
};

export default customTableBodyRowSample;
