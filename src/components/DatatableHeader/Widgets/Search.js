import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import {
  searchPropType,
  searchTermPropType,
  rowsPropType,
  isRefreshingPropType,
  textPropType,
  isSearchFieldDisplayedPropType,
  toggleSearchFieldDisplayPropType
} from "../../../proptypes";
import {
  search as searchAction,
  toggleSearchFieldDisplay as toggleSearchFieldDisplayAction
} from "../../../redux/actions/datatableActions";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
  }

  searchUpdate = e => {
    const { search } = this.props;
    const { value } = e.target;
    search(value);
  };

  toggleSearch = () => {
    const { toggleSearchFieldDisplay, isSearchFieldDisplayed } = this.props;
    if (!isSearchFieldDisplayed) {
      this.searchInput.current.focus();
    }
    toggleSearchFieldDisplay();
  };

  render() {
    const {
      searchTerm,
      rows,
      isRefreshing,
      searchText,
      searchPlaceholderText,
      isSearchFieldDisplayed
    } = this.props;
    const disabled = rows.length === 0 || isRefreshing;

    return (
      <Fragment>
        <TextField
          className={
            !isSearchFieldDisplayed
              ? "searchAnimationInput search-input"
              : "searchAnimationInputActive search-input"
          }
          inputRef={this.searchInput}
          onChange={this.searchUpdate}
          value={searchTerm}
          disabled={disabled}
          placeholder={searchPlaceholderText}
        />
        <Tooltip
          arrow
          TransitionComponent={Zoom}
          title={disabled ? "" : searchText}
        >
          <span>
            <IconButton
              className={disabled ? "disabled-icon search-icon" : "search-icon"}
              onClick={this.toggleSearch}
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
  search: searchPropType,
  searchTerm: searchTermPropType.isRequired,
  rows: rowsPropType.isRequired,
  isRefreshing: isRefreshingPropType.isRequired,
  searchText: textPropType,
  searchPlaceholderText: textPropType,
  isSearchFieldDisplayed: isSearchFieldDisplayedPropType.isRequired,
  toggleSearchFieldDisplay: toggleSearchFieldDisplayPropType
};

const mapDispatchToProps = dispatch => {
  return {
    search: term => dispatch(searchAction(term)),
    toggleSearchFieldDisplay: () => dispatch(toggleSearchFieldDisplayAction())
  };
};

const mapStateToProps = state => {
  return {
    rowsSelected: state.datatableReducer.rowsSelected,
    isRefreshing: state.datatableReducer.isRefreshing,
    rows: state.datatableReducer.data.rows,
    searchTerm: state.datatableReducer.searchTerm,
    searchText: state.textReducer.search,
    searchPlaceholderText: state.textReducer.searchPlaceholder,
    isSearchFieldDisplayed: state.datatableReducer.isSearchFieldDisplayed
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
