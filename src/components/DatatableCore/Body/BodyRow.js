import React, { Component } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { connect } from "react-redux";
import {
  rowPropType,
  columnsPropType,
  columnsOrderPropType,
  CustomTableBodyCellPropType,
  indexPropType
} from "../../../proptypes";
import BodyCell from "./BodyCell";

class BodyRow extends Component {
  bodyCellBuilder = (val, columnId, cellIndex) => {
    const { columns, CustomTableBodyCell, rowIndex } = this.props;
    const column = columns.find(col => col.id === columnId);
    const key = `row-${rowIndex}-cell-${cellIndex}`;

    if (val === null || val === undefined) {
      return <TableCell className="no-data" key={key} />;
    }
    if (CustomTableBodyCell !== null) {
      return <CustomTableBodyCell cellVal={val} column={column} key={key} />;
    }
    return <BodyCell cellVal={val} column={column} key={key} />;
  };

  render() {
    const { row, columnsOrder } = this.props;
    return (
      <TableRow>
        {columnsOrder.map((columnId, cellIndex) => {
          return this.bodyCellBuilder(row[columnId], columnId, cellIndex);
        })}
      </TableRow>
    );
  }
}

BodyRow.propTypes = {
  row: rowPropType.isRequired,
  rowIndex: indexPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  columns: columnsPropType.isRequired,
  CustomTableBodyCell: CustomTableBodyCellPropType
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    CustomTableBodyCell: state.customComponentsReducer.CustomTableBodyCell
  };
};

export default connect(mapStateToProps)(BodyRow);
