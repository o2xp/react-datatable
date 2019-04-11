import React, { Component } from "react";
import { connect } from "react-redux";
import { TableBody } from "@material-ui/core";
import BodyRow from "./BodyRow";
import {
  rowsPropType,
  CustomTableBodyRowPropType,
  columnsOrderPropType
} from "../../../proptypes";

class Body extends Component {
  rowBuilder = (row, rowIndex) => {
    const { CustomTableBodyRow, columnsOrder } = this.props;
    const key = `row-${rowIndex}`;

    if (CustomTableBodyRow !== null) {
      return (
        <CustomTableBodyRow
          row={row}
          columnsOrder={columnsOrder}
          rowIndex={rowIndex}
          key={key}
        />
      );
    }
    return <BodyRow row={row} rowIndex={rowIndex} key={key} />;
  };

  render() {
    const { rows } = this.props;
    return (
      <TableBody>
        {rows.map((row, rowIndex) => this.rowBuilder(row, rowIndex))}
      </TableBody>
    );
  }
}

Body.propTypes = {
  rows: rowsPropType.isRequired,
  CustomTableBodyRow: CustomTableBodyRowPropType,
  columnsOrder: columnsOrderPropType.isRequired
};

const mapStateToProps = state => {
  return {
    rows: state.datatableReducer.data.rows,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    CustomTableBodyRow: state.customComponentsReducer.CustomTableBodyRow
  };
};

export default connect(mapStateToProps)(Body);
