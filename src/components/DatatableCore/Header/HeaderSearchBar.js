import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { columnPropType, isRefreshingPropType } from "../../../proptypes";

export class HeaderSearchBar extends Component {
  render() {
    const { column, isRefreshing } = this.props;
    const searchInColumn = () => {
      console.log(column.id);
    };
    return (
      <TextField
        placeholder="Search"
        style={{ width: "100%" }}
        onChange={searchInColumn()}
        disabled={isRefreshing}
      />
    );
  }
}

HeaderSearchBar.propTypes = {
  column: columnPropType.isRequired,
  isRefreshing: isRefreshingPropType.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: Dispatch an action by sending "the search text" and "the column to search in" to the store
    searchInColumn: (searchText, column) =>
      dispatch({ type: "SEARCH_IN_COLUMN", searchText, column })
  };
};

const mapStateToProps = state => {
  return {
    canOrderColumns: state.datatableReducer.features.canOrderColumns,
    areSearchFieldsDisplayed: state.datatableReducer.areSearchFieldsDisplayed,
    isRefreshing: state.datatableReducer.isRefreshing,
    orderBy: state.datatableReducer.orderBy,
    orderByText: state.textReducer.orderBy,
    dragText: state.textReducer.drag,
    isScrolling: state.datatableReducer.dimensions.isScrolling
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchBar);
