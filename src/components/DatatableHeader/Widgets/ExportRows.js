import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";
import { exportRowPropType, rowsSelectedPropType } from "../../../proptypes";
import { exportRow as exportRowAction } from "../../../redux/actions/datatableActions";

class ExportRows extends Component {
  render() {
    const { rowsSelected, exportRow } = this.props;
    const disabled = rowsSelected.length === 0;
    return (
      <Tooltip
        TransitionComponent={Zoom}
        title={
          disabled
            ? "0 row selected"
            : `Export ${rowsSelected.length} row${
                rowsSelected.length > 1 ? "s" : ""
              }`
        }
      >
        <span>
          <IconButton
            aria-label="ExportRows"
            className="export-rows"
            onClick={() => exportRow()}
            disabled={disabled}
          >
            <CallSplitIcon color={disabled ? "disabled" : "primary"} />
          </IconButton>
        </span>
      </Tooltip>
    );
  }
}

ExportRows.propTypes = {
  rowsSelected: rowsSelectedPropType.isRequired,
  exportRow: exportRowPropType
};

const mapDispatchToProps = dispatch => {
  return {
    exportRow: () => dispatch(exportRowAction())
  };
};

const mapStateToProps = state => {
  return {
    rowsSelected: state.datatableReducer.rowsSelected
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportRows);
