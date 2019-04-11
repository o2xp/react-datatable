import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { columnsOrderPropType } from "../src/proptypes";
import { simpleOptionsSample } from "./samples";

const customTableHeaderRowSample = ({ columnsOrder }) => {
  const { columns } = simpleOptionsSample.data;
  return (
    <TableRow>
      {columnsOrder.map(columnId => {
        const column = columns.find(col => col.id === columnId);

        return (
          <TableCell key={column.id}>
            <div style={{ color: "green" }}>{column.label}</div>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

customTableHeaderRowSample.propTypes = {
  columnsOrder: columnsOrderPropType
};

export default customTableHeaderRowSample;
