import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import {
  rowsPropType,
  isRefreshingPropType,
  textPropType,
  toggleSearchFieldsDisplayPropType
} from "../../../proptypes";
import { toggleSearchFieldsDisplay as toggleSearchFieldsDisplayAction } from "../../../redux/actions/datatableActions";

// TODO: rename
export class Search extends Component {
  render() {
    const { rows, isRefreshing, searchText } = this.props;
    const disabled = rows.length === 0 || isRefreshing;

    return (
      <Fragment>
        <Tooltip
          arrow
          TransitionComponent={Zoom}
          title={disabled ? "" : searchText}
        >
          <span>
            <IconButton
              className={disabled ? "disabled-icon search-icon" : "search-icon"}
              onClick={() => {
                const { toggleSearchFieldsDisplay } = this.props;
                toggleSearchFieldsDisplay();
              }}
              disabled={disabled}
            >
              <SearchIcon color="primary" />
            </IconButton>
          </span>
        </Tooltip>
      </Fragment>
    );
  }
}

Search.propTypes = {
  rows: rowsPropType.isRequired,
  isRefreshing: isRefreshingPropType.isRequired,
  searchText: textPropType,
  toggleSearchFieldsDisplay: toggleSearchFieldsDisplayPropType.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSearchFieldsDisplay: () => dispatch(toggleSearchFieldsDisplayAction())
  };
};

const mapStateToProps = state => {
  return {
    rowsSelected: state.datatableReducer.rowsSelected,
    isRefreshing: state.datatableReducer.isRefreshing,
    areSearchFieldsDisplayed: state.datatableReducer.areSearchFieldsDisplayed,
    rows: state.datatableReducer.data.rows,
    searchTerm: state.datatableReducer.searchTerm,
    searchText: state.textReducer.search,
    searchPlaceholderText: state.textReducer.searchPlaceholder
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
