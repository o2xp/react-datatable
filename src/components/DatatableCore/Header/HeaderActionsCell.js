import React, { Component } from "react";
import { Tooltip, ListItemIcon, IconButton, Checkbox } from "@material-ui/core";
import { Clear as ClearIcon, Create as CreateIcon } from "@material-ui/icons";
import { connect } from "react-redux";

class HeaderActionsCell extends Component {
  render() {
    const { column, isScrolling } = this.props;
    return (
      <div
        className={
          isScrolling
            ? "Table-Header-Cell action scrolling-shadow"
            : "Table-Header-Cell action"
        }
      >
        <div style={{ width: column.colSize }}>Actions</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isScrolling: state.datatableReducer.dimensions.isScrolling
  };
};

export default connect(mapStateToProps)(HeaderActionsCell);
