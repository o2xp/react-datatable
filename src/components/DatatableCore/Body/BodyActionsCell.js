import React, { Component } from "react";
import { Tooltip, IconButton, Checkbox } from "@material-ui/core";
import { Delete as DeleteIcon, Create as CreateIcon } from "@material-ui/icons";
import { connect } from "react-redux";
import { addRowEdited as addRowEditedAction } from "../../../redux/actions/datatableActions";
import {
  columnPropType,
  isScrollingPropType,
  canEditPropType,
  canDeletePropType,
  rowsSelectablePropType,
  rowPropType,
  addRowEditedPropType
} from "../../../proptypes";

export class BodyActionsCell extends Component {
  render() {
    const {
      column,
      isScrolling,
      canEdit,
      canDelete,
      rowsSelectable,
      row,
      addRowEdited
    } = this.props;
    return (
      <div
        className={
          isScrolling
            ? "Table-Cell action scrolling-shadow"
            : "Table-Cell action"
        }
      >
        <div style={{ width: column.colSize }}>
          {rowsSelectable && <Checkbox className="select" checked={false} />}
          {canDelete && (
            <Tooltip title="Confirm delete">
              <IconButton className="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title="Edit row">
              <IconButton className="edit" onClick={() => addRowEdited(row)}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRowEdited: row => dispatch(addRowEditedAction(row))
  };
};

const mapStateToProps = state => {
  return {
    keyColumn: state.datatableReducer.keyColumn,
    isScrolling: state.datatableReducer.dimensions.isScrolling,
    canEdit: state.datatableReducer.features.canEdit,
    canDelete: state.datatableReducer.features.canDelete,
    rowsSelectable: state.datatableReducer.features.selection.rowsSelectable
  };
};

BodyActionsCell.propTypes = {
  column: columnPropType.isRequired,
  isScrolling: isScrollingPropType.isRequired,
  canEdit: canEditPropType.isRequired,
  canDelete: canDeletePropType.isRequired,
  rowsSelectable: rowsSelectablePropType.isRequired,
  row: rowPropType.isRequired,
  addRowEdited: addRowEditedPropType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyActionsCell);
