import React, { Component } from "react";
import { connect } from "react-redux";
import {
  rowPropType,
  columnsPropType,
  columnsOrderPropType,
  CustomTableBodyCellPropType,
  indexPropType,
  columnSizeMultiplierPropType,
  keyColumnPropType,
  editingPropType,
  stylePropType
} from "../../../proptypes";
import BodyCell from "./BodyCell";
import BodyActionsCell from "./BodyActionsCell";

class BodyRow extends Component {
  bodyCellBuilder = (val, columnId, cellIndex, row, editing) => {
    const {
      columns,
      CustomTableBodyCell,
      rowIndex,
      columnSizeMultiplier,
      keyColumn
    } = this.props;
    const column = columns.find(col => col.id === columnId);
    const key = `row-${rowIndex}-cell-${cellIndex}`;
    const rowId = row[keyColumn];
    const isEditing = editing && column.editable;

    if (columnId === "actions") {
      return <BodyActionsCell key={key} column={column} row={row} />;
    }

    const width = `${(
      column.colSize.split("px")[0] * columnSizeMultiplier
    ).toString()}px`;

    if (val === null || val === undefined || val === "") {
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
            <CustomTableBodyCell
              cellVal={val}
              column={column}
              editing={isEditing}
              rowId={rowId}
            />
          </div>
        </div>
      );
    }

    return (
      <BodyCell
        cellVal={val}
        editing={isEditing}
        width={width}
        column={column}
        rowId={rowId}
        key={key}
      />
    );
  };

  render() {
    const { style, row, columnsOrder, editing } = this.props;
    return (
      <div
        style={{
          top: style.top,
          height: style.height,
          position: style.position
        }}
      >
        <div
          className="Table-Row"
          style={{
            height: style.height
          }}
        >
          {columnsOrder.map((columnId, cellIndex) => {
            return this.bodyCellBuilder(
              row[columnId],
              columnId,
              cellIndex,
              row,
              editing
            );
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
  keyColumn: keyColumnPropType.isRequired,
  editing: editingPropType.isRequired,
  CustomTableBodyCell: CustomTableBodyCellPropType
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    keyColumn: state.datatableReducer.keyColumn,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    columnSizeMultiplier:
      state.datatableReducer.dimensions.columnSizeMultiplier,

    CustomTableBodyCell: state.customComponentsReducer.CustomTableBodyCell
  };
};

export default connect(mapStateToProps)(BodyRow);
