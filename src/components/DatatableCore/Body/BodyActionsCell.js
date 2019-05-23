import React, { Component, Fragment } from "react";
import { Tooltip, IconButton, Checkbox, withStyles } from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Create as CreateIcon,
  Save as SaveIcon,
  Clear as ClearIcon
} from "@material-ui/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  addRowEdited as addRowEditedAction,
  saveRowEdited as saveRowEditedAction,
  revertRowEdited as revertRowEditedAction
} from "../../../redux/actions/datatableActions";
import {
  columnPropType,
  isScrollingPropType,
  canEditPropType,
  canDeletePropType,
  rowsSelectablePropType,
  rowPropType,
  classesPropType,
  saveRowEditedPropType,
  editingPropType,
  addRowEditedPropType,
  revertRowEditedPropType
} from "../../../proptypes";
import { customVariant } from "../../MuiTheme";

export class BodyActionsCell extends Component {
  render() {
    const {
      column,
      isScrolling,
      canEdit,
      canDelete,
      rowsSelectable,
      row,
      editing,
      addRowEdited,
      saveRowEdited,
      revertRowEdited,
      classes
    } = this.props;
    const { hasBeenEdited, idOfColumnErr } = row;
    const saveDisabled = !hasBeenEdited || idOfColumnErr.length > 0;
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
          {canDelete && !editing && (
            <Tooltip title="Confirm delete">
              <IconButton className="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          {canEdit && !editing && (
            <Tooltip title="Edit row">
              <IconButton
                className="edit"
                color="primary"
                onClick={() => addRowEdited(row)}
              >
                <CreateIcon />
              </IconButton>
            </Tooltip>
          )}

          {editing && (
            <Fragment>
              <Tooltip title="Clear row">
                <IconButton
                  className={`revert ${classes.errorIcon}`}
                  onClick={() => revertRowEdited(row)}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Save row"
                classes={{
                  popper: saveDisabled
                    ? classes.disabledButtonPopper
                    : classes.enabledButtonPopper
                }}
              >
                <span>
                  <IconButton
                    className={`save ${classes.validIcon}`}
                    onClick={() => saveRowEdited(row)}
                    disabled={saveDisabled}
                  >
                    <SaveIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRowEdited: row => dispatch(addRowEditedAction(row)),
    saveRowEdited: row => dispatch(saveRowEditedAction(row)),
    revertRowEdited: row => dispatch(revertRowEditedAction(row))
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
  editing: editingPropType.isRequired,
  classes: classesPropType.isRequired,
  isScrolling: isScrollingPropType.isRequired,
  canEdit: canEditPropType.isRequired,
  canDelete: canDeletePropType.isRequired,
  rowsSelectable: rowsSelectablePropType.isRequired,
  row: rowPropType.isRequired,
  saveRowEdited: saveRowEditedPropType,
  addRowEdited: addRowEditedPropType,
  revertRowEdited: revertRowEditedPropType
};

export default compose(
  withStyles(customVariant),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BodyActionsCell);
