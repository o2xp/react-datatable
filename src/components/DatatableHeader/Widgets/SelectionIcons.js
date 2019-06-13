import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import {
  selectionIconsPropType,
  rowsSelectedPropType,
  setRowsSelectedPropType
} from "../../../proptypes";
import { setRowsSelected as setRowsSelectedAction } from "../../../redux/actions/datatableActions";

class SelectionIcons extends Component {
  render() {
    const { rowsSelected, selectionIcons, setRowsSelected } = this.props;
    const disabled = rowsSelected.length === 0;
    return (
      <Fragment>
        {selectionIcons.map((icon, i) => (
          <Tooltip
            key={icon.title}
            TransitionComponent={Zoom}
            title={disabled ? "0 row selected" : icon.title}
          >
            <span>
              <IconButton
                className={
                  disabled
                    ? `disabled-icon selection-icon-${i}`
                    : `selection-icon-${i}`
                }
                onClick={() => {
                  icon.onClick(rowsSelected);
                  setRowsSelected();
                }}
                disabled={disabled}
              >
                {icon.icon}
              </IconButton>
            </span>
          </Tooltip>
        ))}
      </Fragment>
    );
  }
}

SelectionIcons.propTypes = {
  rowsSelected: rowsSelectedPropType.isRequired,
  selectionIcons: selectionIconsPropType.isRequired,
  setRowsSelected: setRowsSelectedPropType
};

const mapDispatchToProps = dispatch => {
  return {
    setRowsSelected: () => dispatch(setRowsSelectedAction([]))
  };
};

const mapStateToProps = state => {
  return {
    rowsSelected: state.datatableReducer.rowsSelected,
    selectionIcons: state.datatableReducer.features.selectionIcons
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionIcons);
