import React, { Component } from "react";
import { connect } from "react-redux";
import { TableRow } from "@material-ui/core";
import {
  columnsPropType,
  columnsOrderPropType
} from "../../proptypes/proptypes";
import HeaderCell from "./HeaderCell";

class HeaderRow extends Component {
  headerCellBuilder = columnId => {
    const { columns, CustomTableHeaderCell } = this.props;
    const column = columns.find(col => col.id === columnId);

    if (CustomTableHeaderCell !== null) {
      return <CustomTableHeaderCell column={column} key={columnId} />;
    }

    return <HeaderCell column={column} key={columnId} />;
  };

  render() {
    const { columnsOrder } = this.props;
    return (
      <TableRow>
        {columnsOrder.map(columnId => {
          return this.headerCellBuilder(columnId);
        })}
      </TableRow>
    );
  }
}

HeaderRow.propTypes = {
  columns: columnsPropType,
  columnsOrder: columnsOrderPropType
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    CustomTableHeaderCell: state.customComponentsReducer.CustomTableHeaderCell
  };
};

export default connect(mapStateToProps)(HeaderRow);
