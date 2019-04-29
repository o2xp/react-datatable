import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollSyncPane } from "react-scroll-sync";
import { FixedSizeList } from "react-window";
import BodyRow from "./BodyRow";
import {
  rowsPropType,
  CustomTableBodyRowPropType,
  columnsOrderPropType,
  dimensionsPropType
} from "../../../proptypes";

export const tableRef = React.createRef();

class Body extends Component {
  rowBuilder = ({ index, style }) => {
    const { CustomTableBodyRow, rows, dimensions, columnsOrder } = this.props;
    const row = rows[index];
    const key = `row-${index}`;
    const { columnSizeMultiplier } = dimensions;

    if (CustomTableBodyRow !== null) {
      return (
        <div
          style={{
            top: style.top,
            height: style.height,
            position: style.position,
            borderBottom: "1px solid rgba(224, 224, 244, 1)"
          }}
        >
          <CustomTableBodyRow
            row={row}
            columnsOrder={columnsOrder}
            rowIndex={index}
            height={style.height}
            columnSizeMultiplier={columnSizeMultiplier}
            key={key}
          />
        </div>
      );
    }
    return <BodyRow row={row} style={style} rowIndex={index} key={key} />;
  };

  render() {
    const { rows, dimensions, columnsOrder } = this.props;

    return (
      <div className="Table-Body">
        <ScrollSyncPane>
          <FixedSizeList
            ref={tableRef}
            height={dimensions.body.heightNumber}
            itemCount={rows.length}
            itemSize={dimensions.row.heightNumber}
            width={dimensions.datatable.widthNumber}
            columnsOrder={columnsOrder}
            rows={rows}
          >
            {this.rowBuilder}
          </FixedSizeList>
        </ScrollSyncPane>
      </div>
    );
  }
}

Body.propTypes = {
  rows: rowsPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  dimensions: dimensionsPropType.isRequired,
  CustomTableBodyRow: CustomTableBodyRowPropType
};

const mapStateToProps = state => {
  return {
    rows: state.datatableReducer.pagination.rowsCurrentPage,
    dimensions: state.datatableReducer.dimensions,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    CustomTableBodyRow: state.customComponentsReducer.CustomTableBodyRow
  };
};

export default connect(mapStateToProps)(Body);
