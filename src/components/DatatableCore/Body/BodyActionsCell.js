import React, { Component } from "react";
import { Tooltip, ListItemIcon, IconButton, Checkbox } from "@material-ui/core";
import { Delete as DeleteIcon, Create as CreateIcon } from "@material-ui/icons";
import { connect } from "react-redux";
import BodyCell from "./BodyCell";
import { addRowEdited as addRowEditedAction } from "../../../redux/actions/datatableActions";

class BodyActionsCell extends Component {
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
          {rowsSelectable && <Checkbox checked={false} />}
          {canDelete && (
            <Tooltip title="Confirm delete">
              <IconButton
                className="icon-red"
                onClick={() => console.log("delete")}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title="Edit row">
              <IconButton
                className="icon-blue"
                onClick={() => addRowEdited(row)}
              >
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyActionsCell);
