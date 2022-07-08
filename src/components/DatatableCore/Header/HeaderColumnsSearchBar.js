import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import {
  columnPropType,
  isRefreshingPropType,
  searchInColumnPropType,
  searchTermsPropType
} from "../../../proptypes";
import { searchInColumn as searchInColumnAction } from "../../../redux/actions/datatableActions";

export class HeaderColumnsSearchBar extends Component {
  getSearchBarValueFromStore = () => {
    const { searchTerms, column } = this.props;
    if (searchTerms[column.id]) {
      return searchTerms[column.id];
    }
    return "";
  };

  render() {
    const { column, isRefreshing, searchInColumn } = this.props;
    return (
      <TextField
        placeholder={column.label}
        style={{ width: "100%" }}
        onChange={e => {
          searchInColumn([e.target.value, column.id]);
        }}
        disabled={isRefreshing}
        value={this.getSearchBarValueFromStore()}
      />
    );
  }
}

HeaderColumnsSearchBar.propTypes = {
  column: columnPropType.isRequired,
  isRefreshing: isRefreshingPropType.isRequired,
  searchInColumn: searchInColumnPropType,
  searchTerms: searchTermsPropType.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: Dispatch an action by sending "the search text" and "the column to search in" to the store
    searchInColumn: (searchText, column) =>
      dispatch(searchInColumnAction(searchText, column))
  };
};

const mapStateToProps = state => {
  return {
    searchTerms: state.datatableReducer.searchTerms,
    canOrderColumns: state.datatableReducer.features.canOrderColumns,
    areSearchFieldsDisplayed: state.datatableReducer.areSearchFieldsDisplayed,
    isRefreshing: state.datatableReducer.isRefreshing,
    orderBy: state.datatableReducer.orderBy,
    orderByText: state.textReducer.orderBy,
    dragText: state.textReducer.drag,
    isScrolling: state.datatableReducer.dimensions.isScrolling
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderColumnsSearchBar);
