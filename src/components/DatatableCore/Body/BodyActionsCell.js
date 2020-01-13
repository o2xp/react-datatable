import React, { Component, Fragment } from "react";
import {
  Tooltip,
  IconButton,
  Checkbox,
  withStyles,
  Zoom
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Create as CreateIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
  DeleteForever as DeleteForeverIcon,
  Queue as QueueIcon
} from "@material-ui/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  addRowEdited as addRowEditedAction,
  saveRowEdited as saveRowEditedAction,
  revertRowEdited as revertRowEditedAction,
  selectRow as selectRowAction,
  deleteRow as deleteRowAction,
  addToDeleteRow as addToDeleteRowAction,
  duplicateRow as duplicateRowAction
} from "../../../redux/actions/datatableActions";
import {
  columnPropType,
  isScrollingPropType,
  canEditPropType,
  canEditRowPropType,
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
  keyColumnPropType,
  addToDeleteRowPropType,
  additionalActionsPropType,
  canDuplicatePropType,
  duplicateRowPropType,
  textPropType
} from "../../../proptypes";
import { customVariant } from "../../MuiTheme";

export class BodyActionsCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false
    };
  }

  dispatchToDeleteRow = row => {
    const { deleteRow, addToDeleteRow, canGlobalEdit } = this.props;
    if (canGlobalEdit) {
      addToDeleteRow(row);
    } else {
      deleteRow(row);
    }
  };

  buildAdditionalActions = ({ aa, editing, canGlobalEdit }) => {
    const { row } = this.props;
    const { isDisplayed, isDisabled, title } = aa;

    if (isDisplayed == null || isDisplayed(row)) {
      let disabled = !editing && canGlobalEdit;
      if (isDisabled && !disabled) {
        disabled = isDisabled(row);
      }

      return (
        <Tooltip title={title} key={title} TransitionComponent={Zoom}>
          <span>
            <IconButton
              className={
                disabled
                  ? `disabled-icon additional-action-icon-${title.replace(
                      / /g,
                      "-"
                    )}`
                  : `additional-action-icon-${title.replace(/ /g, "-")}`
              }
              onClick={() => aa.onClick(row)}
              disabled={disabled}
            >
              {aa.icon}
            </IconButton>
          </span>
        </Tooltip>
      );
    }
    return <Fragment key={aa.title} />;
  };

  render() {
    const {
      style,
      column,
      isScrolling,
      canEdit,
      canGlobalEdit,
      canDelete,
      canDuplicate,
      canSelectRow,
      row,
      checked,
      editing,
      addRowEdited,
      saveRowEdited,
      revertRowEdited,
      selectRow,
      classes,
      rowsEdited,
      canEditRow,
      keyColumn,
      additionalActions,
      duplicateRow,
      editText,
      saveText,
      clearText,
      duplicateText,
      deleteText,
      confirmDeleteText,
      cancelDeleteText
    } = this.props;

    const { deleting } = this.state;
    const { hasBeenEdited, idOfColumnErr } = row;
    const saveDisabled = !hasBeenEdited || idOfColumnErr.length > 0;

    const canEditDisable =
      rowsEdited.length > 0 && rowsEdited[0][keyColumn] !== row[keyColumn];

    const editableRow = canEditRow ? canEditRow(row) : true;

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

          {additionalActions.map(aa =>
            this.buildAdditionalActions({ aa, editing, canGlobalEdit })
          )}

          {canDuplicate && (
            <Tooltip title={duplicateText}>
              <span>
                <IconButton
                  className={
                    !editing && canGlobalEdit
                      ? `disabled-icon duplicate-icon`
                      : `duplicate-icon`
                  }
                  onClick={() => duplicateRow(row)}
                  disabled={!editing && canGlobalEdit}
                >
                  <QueueIcon color="primary" />
                </IconButton>
              </span>
            </Tooltip>
          )}

          {canDelete && (!editing || canGlobalEdit) && !deleting && (
            <Tooltip title={deleteText}>
              <span>
                <IconButton
                  className={`delete ${classes.defaultIcon}`}
                  onClick={() => this.setState({ deleting: true })}
                  disabled={!editing && canGlobalEdit}
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}

          {deleting && (
            <Fragment>
              <Tooltip title={cancelDeleteText}>
                <IconButton
                  className={`cancel-delete ${classes.defaultIcon}`}
                  onClick={() => this.setState({ deleting: false })}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={confirmDeleteText}>
                <IconButton
                  className={`confirm-delete ${classes.errorIcon}`}
                  onClick={() => {
                    this.setState({ deleting: false });
                    this.dispatchToDeleteRow(row);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </Fragment>
          )}

          {canEdit && editableRow && !editing && !deleting && (
            <Tooltip title={editText}>
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
              <Tooltip title={clearText}>
                <IconButton
                  className={`revert ${classes.errorIcon}`}
                  onClick={() => revertRowEdited(row)}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={saveText}
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
    addToDeleteRow: row => dispatch(addToDeleteRowAction(row)),
    saveRowEdited: row => dispatch(saveRowEditedAction(row)),
    selectRow: row => dispatch(selectRowAction(row)),
    revertRowEdited: row => dispatch(revertRowEditedAction(row)),
    deleteRow: row => dispatch(deleteRowAction(row)),
    duplicateRow: row => dispatch(duplicateRowAction(row))
  };
};

const mapStateToProps = state => {
  return {
    additionalActions: state.datatableReducer.features.additionalActions,
    keyColumn: state.datatableReducer.keyColumn,
    rowsEdited: state.datatableReducer.rowsEdited,
    isScrolling: state.datatableReducer.dimensions.isScrolling,
    canEdit: state.datatableReducer.features.canEdit,
    canEditRow: state.datatableReducer.features.canEditRow,
    canGlobalEdit: state.datatableReducer.features.canGlobalEdit,
    canDelete: state.datatableReducer.features.canDelete,
    canSelectRow: state.datatableReducer.features.canSelectRow,
    canDuplicate: state.datatableReducer.features.canDuplicate,
    editText: state.textReducer.edit,
    saveText: state.textReducer.save,
    clearText: state.textReducer.clear,
    duplicateText: state.textReducer.duplicate,
    deleteText: state.textReducer.delete,
    confirmDeleteText: state.textReducer.confirmDelete,
    cancelDeleteText: state.textReducer.cancelDelete
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
  canEditRow: canEditRowPropType,
  canDelete: canDeletePropType.isRequired,
  canSelectRow: canSelectRowPropType.isRequired,
  checked: checkedPropType.isRequired,
  row: rowPropType.isRequired,
  saveRowEdited: saveRowEditedPropType,
  addRowEdited: addRowEditedPropType,
  selectRow: selectRowPropType,
  revertRowEdited: revertRowEditedPropType,
  deleteRow: deleteRowPropType,
  addToDeleteRow: addToDeleteRowPropType,
  canGlobalEdit: canGlobalEditPropType.isRequired,
  additionalActions: additionalActionsPropType.isRequired,
  canDuplicate: canDuplicatePropType.isRequired,
  duplicateRow: duplicateRowPropType,
  editText: textPropType,
  saveText: textPropType,
  clearText: textPropType,
  duplicateText: textPropType,
  deleteText: textPropType,
  confirmDeleteText: textPropType,
  cancelDeleteText: textPropType
};

export default compose(
  withStyles(customVariant),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BodyActionsCell);
