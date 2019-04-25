import React, { Component } from "react";
import { connect } from "react-redux";
import {
  rowPropType,
  columnsPropType,
  columnsOrderPropType,
  CustomTableBodyCellPropType,
  indexPropType,
  columnSizeMultiplierPropType,
  stylePropType
} from "../../../proptypes";
import BodyCell from "./BodyCell";

class BodyRow extends Component {
  bodyCellBuilder = (val, columnId, cellIndex) => {
    const {
      columns,
      CustomTableBodyCell,
      rowIndex,
      columnSizeMultiplier
    } = this.props;
    const column = columns.find(col => col.id === columnId);
    const key = `row-${rowIndex}-cell-${cellIndex}`;
    const width = `${(
      column.colSize.split("px")[0] * columnSizeMultiplier
    ).toString()}px`;

    if (val === null || val === undefined) {
      return (
        <div className="Table-Cell" key={key}>
          <div style={{ width }}>
            <div className="no-data" />
          </div>
        </div>
      );
    }

    if (CustomTableBodyCell !== null) {
      return (
        <div className="Table-Cell" key={key}>
          <div style={{ width }}>
            <CustomTableBodyCell cellVal={val} column={column} />
          </div>
        </div>
      );
    }
    return <BodyCell cellVal={val} width={width} column={column} key={key} />;
  };

  render() {
    const { style, row, columnsOrder } = this.props;
    return (
      <div
        style={{
          top: style.top,
          height: style.height,
          position: style.position,
          borderBottom: "1px solid rgba(224, 224, 244, 1)"
        }}
      >
        <div
          className="Table-Row"
          style={{
            height: style.height
          }}
        >
          {columnsOrder.map((columnId, cellIndex) => {
            return this.bodyCellBuilder(row[columnId], columnId, cellIndex);
          })}
        </div>
      </div>
    );
  }
}

BodyRow.propTypes = {
  row: rowPropType.isRequired,
  rowIndex: indexPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  columns: columnsPropType.isRequired,
  columnSizeMultiplier: columnSizeMultiplierPropType.isRequired,
  style: stylePropType.isRequired,
  CustomTableBodyCell: CustomTableBodyCellPropType
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    columnSizeMultiplier:
      state.datatableReducer.dimensions.columnSizeMultiplier,
    CustomTableBodyCell: state.customComponentsReducer.CustomTableBodyCell
  };
};

export default connect(mapStateToProps)(BodyRow);
