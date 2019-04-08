import React, { Component } from "react";
import { connect } from "react-redux";
import { TableBody } from "@material-ui/core";
import BodyRow from "./BodyRow";
import { rowsPropType } from "../../proptypes/proptypes";

class Body extends Component {
  rowBuilder = row => {
    const { CustomTableBodyRow, columnsOrder, keyColumn } = this.props;
    if (CustomTableBodyRow !== null) {
      return (
        <CustomTableBodyRow
          row={row}
          columnsOrder={columnsOrder}
          key={row[keyColumn]}
        />
      );
    }
    return <BodyRow row={row} key={row[keyColumn]} />;
  };

  render() {
    const { rows } = this.props;
    return <TableBody>{rows.map(row => this.rowBuilder(row))}</TableBody>;
  }
}

Body.propTypes = {
  rows: rowsPropType
};

const mapStateToProps = state => {
  return {
    rows: state.datatableReducer.data.rows,
    keyColumn: state.datatableReducer.keyColumn,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    CustomTableBodyRow: state.customComponentsReducer.CustomTableBodyRow
  };
};

export default connect(mapStateToProps)(Body);
