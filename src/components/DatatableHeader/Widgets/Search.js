import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { canSearchPropType, searchPropType } from "../../../proptypes";
import { search as searchAction } from "../../../redux/actions/datatableActions";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSearch: false,
      searchValue: ""
    };
  }

  searchUpdate = e => {
    const { search } = this.props;
    const { value } = e.target;
    search(value);
    this.setState({ searchValue: value });
  };

  toggleSearch = () => {
    const { searchValue, openSearch } = this.state;
    if (searchValue.length === 0) {
      this.setState({ openSearch: !openSearch });
    }
  };

  render() {
    const { canSearch } = this.props;
    const { searchValue, openSearch } = this.state;
    return (
      <Fragment>
        {canSearch && (
          <Fragment>
            <TextField
              className={
                !openSearch
                  ? "searchAnimationInput"
                  : "searchAnimationInputActive"
              }
              onChange={this.searchUpdate}
              value={searchValue}
              placeholder="Search.."
            />
            <Tooltip
              TransitionComponent={Zoom}
              title={openSearch ? "Close" : "Open"}
            >
              <IconButton onClick={() => this.toggleSearch()}>
                <SearchIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Search.propTypes = {
  canSearch: canSearchPropType.isRequired,
  search: searchPropType
};

const mapDispatchToProps = dispatch => {
  return {
    search: term => dispatch(searchAction(term))
  };
};

const mapStateToProps = state => {
  return {
    rowsSelected: state.datatableReducer.rowsSelected,
    canSearch: state.datatableReducer.features.canSearch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
