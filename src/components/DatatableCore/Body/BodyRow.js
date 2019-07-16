import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import copy from "copy-to-clipboard";
import {
  rowPropType,
  columnsPropType,
  columnsOrderPropType,
  CustomTableBodyCellPropType,
  columnSizeMultiplierPropType,
  keyColumnPropType,
  editingPropType,
  rowsSelectedPropType,
  stylePropType,
  copyToClipboardPropType,
  enqueueSnackbarPropType
} from "../../../proptypes";
import BodyCell from "./BodyCell";
import BodyActionsCell from "./BodyActionsCell";
import { enqueueSnackbar as enqueueSnackbarAction } from "../../../redux/actions/notifierActions";

export class BodyRow extends Component {
  copyToClipboardFunction = val => {
    const { enqueueSnackbar, copyToClipboard } = this.props;
    if (copyToClipboard) {
      copy(val);
      enqueueSnackbar({
        message: "Cell's content has been copied to clipboard.",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "info"
        }
      });
    }
  };

  bodyCellBuilder = (val, columnId, cellIndex, row, editing) => {
    const {
      columns,
      CustomTableBodyCell,
      columnSizeMultiplier,
      rowsSelected,
      keyColumn
    } = this.props;
    const column = columns.find(col => col.id === columnId);
    const rowId = row[keyColumn];
    const key = `row-${row[keyColumn]}-cell-${columnId}`;
    const isEditing = editing && column.editable;

    if (columnId === "o2xpActions") {
      const checked = !!rowsSelected.find(r => r[keyColumn] === row[keyColumn]);
      return (
        <BodyActionsCell
          key={key}
          column={column}
          row={row}
          editing={editing}
          checked={checked}
        />
      );
    }

    const width = `${(
      column.colSize.split("px")[0] * columnSizeMultiplier
    ).toString()}px`;

    if ((val === null || val === undefined || val === "") && !editing) {
      return (
        <div className="Table-Cell" key={key}>
          <div style={{ width }}>
            <div className="no-data" />
          </div>
        </div>
      );
    }

    if (CustomTableBodyCell !== null && !isEditing) {
      return (
        <div className="Table-Cell" key={key}>
          <div style={{ width }}>
            <CustomTableBodyCell
              cellVal={val}
              column={column}
              rowId={rowId}
              onClick={() => this.copyToClipboardFunction(val)}
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
        onClick={() => (isEditing ? null : this.copyToClipboardFunction(val))}
      />
    );
  };

  render() {
    const { style, row, columnsOrder, editing } = this.props;

    return (
      <Fragment>
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
              height: style.height,
              backgroundColor: style.backgroundColor
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
      </Fragment>
    );
  }
}

BodyRow.propTypes = {
  row: rowPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  columns: columnsPropType.isRequired,
  columnSizeMultiplier: columnSizeMultiplierPropType.isRequired,
  style: stylePropType.isRequired,
  keyColumn: keyColumnPropType.isRequired,
  editing: editingPropType.isRequired,
  enqueueSnackbar: enqueueSnackbarPropType,
  rowsSelected: rowsSelectedPropType.isRequired,
  copyToClipboard: copyToClipboardPropType.isRequired,
  CustomTableBodyCell: CustomTableBodyCellPropType
};

const mapDispatchToProps = dispatch => {
  return {
    enqueueSnackbar: ({ message, options }) =>
      dispatch(enqueueSnackbarAction({ message, options }))
  };
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    copyToClipboard:
      state.datatableReducer.features.userConfiguration.copyToClipboard,
    keyColumn: state.datatableReducer.keyColumn,
    rowsSelected: state.datatableReducer.rowsSelected,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    columnSizeMultiplier:
      state.datatableReducer.dimensions.columnSizeMultiplier,
    CustomTableBodyCell: state.customComponentsReducer.CustomTableBodyCell
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyRow);
