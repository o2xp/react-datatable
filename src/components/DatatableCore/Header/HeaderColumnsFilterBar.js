import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import {
  columnPropType,
  isRefreshingPropType,
  filterInColumnPropType,
  filterTermsPropType
} from "../../../proptypes";
import { filterInColumn as filterInColumnAction } from "../../../redux/actions/datatableActions";

export class HeaderColumnsFilterBar extends Component {
  getFilterBarValueFromStore = () => {
    const { filterTerms, column } = this.props;
    if (filterTerms[column.id]) {
      return filterTerms[column.id];
    }
    return "";
  };

  render() {
    const { column, isRefreshing, filterInColumn } = this.props;
    return (
      <TextField
        placeholder={column.label}
        style={{ width: "100%" }}
        onChange={e => {
          filterInColumn([e.target.value, column.id]);
        }}
        disabled={isRefreshing}
        value={this.getFilterBarValueFromStore()}
      />
    );
  }
}

HeaderColumnsFilterBar.propTypes = {
  column: columnPropType.isRequired,
  isRefreshing: isRefreshingPropType.isRequired,
  filterInColumn: filterInColumnPropType,
  filterTerms: filterTermsPropType.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: Dispatch an action by sending "the search text" and "the column to search in" to the store
    filterInColumn: (searchText, column) =>
      dispatch(filterInColumnAction(searchText, column))
  };
};

const mapStateToProps = state => {
  return {
    filterTerms: state.datatableReducer.filterTerms,
    canOrderColumns: state.datatableReducer.features.canOrderColumns,
    areFilterFieldsDisplayed: state.datatableReducer.areFilterFieldsDisplayed,
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
)(HeaderColumnsFilterBar);
