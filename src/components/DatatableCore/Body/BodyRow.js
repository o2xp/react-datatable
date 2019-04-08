import React, { Component } from "react";
import { TableRow } from "@material-ui/core";
import { connect } from "react-redux";
import {
  rowPropType,
  columnsPropType,
  columnsOrderPropType
} from "../../proptypes/proptypes";
import BodyCell from "./BodyCell";

class BodyRow extends Component {
  bodyCellBuilder = (val, columnId) => {
    const { columns, CustomTableBodyCell } = this.props;
    const column = columns.find(col => col.id === columnId);
    if (CustomTableBodyCell !== null) {
      return <CustomTableBodyCell cellVal={val} column={column} key={val} />;
    }
    return <BodyCell cellVal={val} column={column} key={val} />;
  };

  render() {
    const { row, columnsOrder } = this.props;
    return (
      <TableRow>
        {columnsOrder.map(columnId => {
          return this.bodyCellBuilder(row[columnId], columnId);
        })}
      </TableRow>
    );
  }
}

BodyRow.propTypes = {
  row: rowPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  columns: columnsPropType
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
