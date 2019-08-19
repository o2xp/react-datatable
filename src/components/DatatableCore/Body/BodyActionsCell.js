import React, { Component, Fragment } from "react";
import { Tooltip, IconButton, Checkbox, withStyles } from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Create as CreateIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
  DeleteForever as DeleteForeverIcon
} from "@material-ui/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  addRowEdited as addRowEditedAction,
  saveRowEdited as saveRowEditedAction,
  revertRowEdited as revertRowEditedAction,
  selectRow as selectRowAction,
  deleteRow as deleteRowAction
} from "../../../redux/actions/datatableActions";
import {
  columnPropType,
  isScrollingPropType,
  canEditPropType,
  canDeletePropType,
  canSelectRowPropType,
  rowPropType,
  classesPropType,
  saveRowEditedPropType,
  editingPropType,
  addRowEditedPropType,
  revertRowEditedPropType,
  selectRowPropType,
  checkedPropType,
  stylePropType,
  deleteRowPropType,
  canGlobalEditPropType,
  rowsEditedPropType,
  keyColumnPropType
} from "../../../proptypes";
import { customVariant } from "../../MuiTheme";

export class BodyActionsCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false
    };
  }

  render() {
    const {
      style,
      column,
      isScrolling,
      canEdit,
      canGlobalEdit,
      canDelete,
      canSelectRow,
      row,
      checked,
      editing,
      addRowEdited,
      saveRowEdited,
      revertRowEdited,
      deleteRow,
      selectRow,
      classes,
      rowsEdited,
      keyColumn
    } = this.props;

    const { deleting } = this.state;
    const { hasBeenEdited, idOfColumnErr } = row;
    const saveDisabled = !hasBeenEdited || idOfColumnErr.length > 0;

    const canEditDisable =
      rowsEdited.length > 0 && rowsEdited[0][keyColumn] !== row[keyColumn];

    return (
      <div
        className={
          isScrolling
            ? "Table-Cell action scrolling-shadow"
            : "Table-Cell action"
        }
        style={{
          backgroundColor: style.backgroundColor
        }}
      >
        <div style={{ width: column.colSize }}>
          {canSelectRow && (
            <Checkbox
              className="select"
              color="primary"
              onChange={e => selectRow({ checked: e.target.checked, row })}
              checked={checked}
            />
          )}
          {canDelete && (!editing || canGlobalEdit) && !deleting && (
            <Tooltip title="Confirm delete">
              <IconButton
                className={`delete ${classes.defaultIcon}`}
                onClick={() => this.setState({ deleting: true })}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}

          {deleting && (
            <Fragment>
              <Tooltip title="Cancel delete">
                <IconButton
                  className={`cancel-delete ${classes.defaultIcon}`}
                  onClick={() => this.setState({ deleting: false })}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Confirm delete">
                <IconButton
                  className={`confirm-delete ${classes.errorIcon}`}
                  onClick={() => {
                    this.setState({ deleting: false });
                    deleteRow(row);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </Fragment>
          )}

          {canEdit && !editing && !deleting && (
            <Tooltip title="Edit row">
              <IconButton
                className="edit"
                color="primary"
                onClick={() => addRowEdited(row)}
                disabled={canEditDisable}
              >
                <CreateIcon />
              </IconButton>
            </Tooltip>
          )}

          {editing && !deleting && !canGlobalEdit && (
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
    selectRow: row => dispatch(selectRowAction(row)),
    revertRowEdited: row => dispatch(revertRowEditedAction(row)),
    deleteRow: row => dispatch(deleteRowAction(row))
  };
};

const mapStateToProps = state => {
  return {
    keyColumn: state.datatableReducer.keyColumn,
    rowsEdited: state.datatableReducer.rowsEdited,
    isScrolling: state.datatableReducer.dimensions.isScrolling,
    canEdit: state.datatableReducer.features.canEdit,
    canGlobalEdit: state.datatableReducer.features.canGlobalEdit,
    canDelete: state.datatableReducer.features.canDelete,
    canSelectRow: state.datatableReducer.features.canSelectRow
  };
};

BodyActionsCell.propTypes = {
  column: columnPropType.isRequired,
  rowsEdited: rowsEditedPropType.isRequired,
  keyColumn: keyColumnPropType.isRequired,
  editing: editingPropType.isRequired,
  classes: classesPropType.isRequired,
  isScrolling: isScrollingPropType.isRequired,
  style: stylePropType.isRequired,
  canEdit: canEditPropType.isRequired,
  canDelete: canDeletePropType.isRequired,
  canSelectRow: canSelectRowPropType.isRequired,
  checked: checkedPropType.isRequired,
  row: rowPropType.isRequired,
  saveRowEdited: saveRowEditedPropType,
  addRowEdited: addRowEditedPropType,
  selectRow: selectRowPropType,
  revertRowEdited: revertRowEditedPropType,
  deleteRow: deleteRowPropType,
  canGlobalEdit: canGlobalEditPropType.isRequired
};

export default compose(
  withStyles(customVariant),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BodyActionsCell);
