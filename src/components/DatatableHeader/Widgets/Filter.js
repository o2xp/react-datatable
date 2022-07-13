import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import { FilterList as FilterIcon } from "@material-ui/icons";
import {
  rowsPropType,
  isRefreshingPropType,
  textPropType,
  toggleFilterFieldsDisplayPropType
} from "../../../proptypes";
import { toggleFilterFieldsDisplay as toggleFilterFieldsDisplayAction } from "../../../redux/actions/datatableActions";

// TODO: rename
export class Filter extends Component {
  render() {
    const { rows, isRefreshing, filterText } = this.props;
    const disabled = rows.length === 0 || isRefreshing;
    return (
      <Fragment>
        <Tooltip
          arrow
          TransitionComponent={Zoom}
          title={disabled ? "" : filterText}
        >
          <span>
            <IconButton
              className={disabled ? "disabled-icon filter-icon" : "filter-icon"}
              onClick={() => {
                const { toggleFilterFieldsDisplay } = this.props;
                toggleFilterFieldsDisplay();
              }}
              disabled={disabled}
            >
              <FilterIcon color="primary" />
            </IconButton>
          </span>
        </Tooltip>
      </Fragment>
    );
  }
}

Filter.propTypes = {
  rows: rowsPropType.isRequired,
  isRefreshing: isRefreshingPropType.isRequired,
  filterText: textPropType,
  toggleFilterFieldsDisplay: toggleFilterFieldsDisplayPropType.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    toggleFilterFieldsDisplay: () => dispatch(toggleFilterFieldsDisplayAction())
  };
};

const mapStateToProps = state => {
  return {
    isRefreshing: state.datatableReducer.isRefreshing,
    rows: state.datatableReducer.data.rows,
    filterText: state.textReducer.filter
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
