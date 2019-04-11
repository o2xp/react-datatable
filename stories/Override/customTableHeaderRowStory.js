import React from "react";
import { Paper, TableRow, TableCell } from "@material-ui/core";
import { Datatable } from "../../src/index";
import { minimumOptionsSample } from "../../data/samples";
import { columnsOrderPropType } from "../../src/proptypes";

const buildCustomTableHeaderRow = ({ columnsOrder }) => {
  const { columns } = minimumOptionsSample.data;
  return (
    <TableRow>
      {columnsOrder.map(columnId => {
        const column = columns.find(col => col.id === columnId);

        return (
          <TableCell style={{ background: "#3f3f3f" }} key={column.id}>
            <div style={{ color: "orange", textAlign: "center" }}>
              {column.label}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const customTableHeaderRowStory = () => {
  return (
    <Paper>
      <Datatable
        options={minimumOptionsSample}
        CustomTableHeaderRow={buildCustomTableHeaderRow}
      />
    </Paper>
  );
};

buildCustomTableHeaderRow.propTypes = {
  columnsOrder: columnsOrderPropType
};

export default customTableHeaderRowStory;
