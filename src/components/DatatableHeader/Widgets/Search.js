import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import {
  searchPropType,
  searchTermPropType,
  rowsPropType,
  isRefreshingPropType
} from "../../../proptypes";
import { search as searchAction } from "../../../redux/actions/datatableActions";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSearch: false
    };
    this.searchInput = React.createRef();
  }

  searchUpdate = e => {
    const { search } = this.props;
    const { value } = e.target;
    search(value);
  };

  toggleSearch = () => {
    const { openSearch } = this.state;
    const { searchTerm } = this.props;
    if (!openSearch) {
      this.searchInput.current.focus();
    }
    if (searchTerm.length === 0) {
      this.setState({ openSearch: !openSearch });
    }
  };

  render() {
    const { openSearch } = this.state;
    const { searchTerm, rows, isRefreshing } = this.props;
    const disabled = rows.length === 0 || isRefreshing;

    return (
      <Fragment>
        <TextField
          className={
            !openSearch
              ? "searchAnimationInput search-input"
              : "searchAnimationInputActive search-input"
          }
          inputRef={this.searchInput}
          onChange={this.searchUpdate}
          value={searchTerm}
          disabled={disabled}
          placeholder="Search.."
        />
        <Tooltip
          TransitionComponent={Zoom}
          title={disabled ? "No data to filter" : "Toggle"}
        >
          <span>
            <IconButton
              className={disabled ? "disabled-icon search-icon" : "search-icon"}
              onClick={() => this.toggleSearch()}
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
  isRefreshing: isRefreshingPropType.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    search: term => dispatch(searchAction(term))
  };
};

const mapStateToProps = state => {
  return {
    rowsSelected: state.datatableReducer.rowsSelected,
    isRefreshing: state.datatableReducer.isRefreshing,
    rows: state.datatableReducer.data.rows,
    searchTerm: state.datatableReducer.searchTerm
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
