import React, { Component, Fragment } from "react";
import {
  IconButton,
  Tooltip,
  Button,
  Zoom,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { connect } from "react-redux";
import { Close as CloseIcon, Refresh as RefreshIcon } from "@material-ui/icons";
import { refreshRows as refreshRowsAction } from "../../../redux/actions/datatableActions";
import {
  refreshRowsPropType,
  refreshRowsUserPropType,
  searchTermPropType,
  rowsSelectedPropType,
  rowsEditedPropType,
  isRefreshingPropType,
  textPropType,
  areFilterFieldsDisplayedPropType
} from "../../../proptypes";
import Transition from "./Transition";

export class RefreshRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpened: false,
      isSearchUsed: false,
      isFilteringOpened: false,
      isARowSelected: false,
      isARowEdited: false
    };
  }

  refresh = (forceRefresh = false) => {
    const {
      refreshRows,
      refreshRowsUser,
      searchTerm,
      rowsSelected,
      rowsEdited,
      areFilterFieldsDisplayed
    } = this.props;
    const isSearchUsed = searchTerm.length > 0;
    const isFilteringOpened = areFilterFieldsDisplayed;
    const isARowSelected = rowsSelected.length > 0;
    const isARowEdited = rowsEdited.length > 0;
    if (
      (isSearchUsed || isARowSelected || isARowEdited || isFilteringOpened) &&
      !forceRefresh
    ) {
      this.setState({
        isARowEdited,
        isARowSelected,
        isSearchUsed,
        isFilteringOpened,
        isDialogOpened: true
      });
    } else {
      this.setState({ isDialogOpened: false });
      refreshRows(refreshRowsUser);
    }
  };

  toggleDialog = bool => {
    this.setState({ isDialogOpened: bool });
  };

  render() {
    const { isRefreshing, refreshText } = this.props;
    const {
      isDialogOpened,
      isSearchUsed,
      isFilteringOpened,
      isARowSelected,
      isARowEdited
    } = this.state;
    return (
      <Fragment>
        <Tooltip arrow TransitionComponent={Zoom} title={refreshText}>
          <span>
            <IconButton
              disabled={isRefreshing}
              className={
                isRefreshing ? "disabled-icon refresh-icon" : "refresh-icon"
              }
              onClick={() => this.refresh()}
            >
              <RefreshIcon color="primary" />
            </IconButton>
          </span>
        </Tooltip>
        <Dialog
          open={isDialogOpened}
          onClose={() => this.toggleDialog(false)}
          TransitionComponent={Transition}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Refresh warning
            <IconButton
              aria-label="Close"
              className="close-icon"
              onClick={() => this.toggleDialog(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            Attention, you are trying to refresh data while:
            <span>
              <ul>
                {isSearchUsed && (
                  <li className="error-search">You are searching</li>
                )}
                {isFilteringOpened && (
                  <li className="error-filter">
                    The filtering option is opened
                  </li>
                )}
                {isARowSelected && (
                  <li className="error-rows-selected">
                    You have row(s) selected
                  </li>
                )}
                {isARowEdited && (
                  <li className="error-rows-edited">You are editing row(s)</li>
                )}
              </ul>
            </span>
            Refreshing will reset all these action(s). Do you want to continue ?
          </DialogContent>
          <DialogActions>
            <Button
              className="cancel-refresh"
              onClick={() => this.toggleDialog(false)}
              size="small"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              className="force-refresh"
              onClick={() => this.refresh(true)}
              variant="contained"
              size="small"
              color="primary"
            >
              Refresh
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

RefreshRows.propTypes = {
  refreshRows: refreshRowsPropType,
  refreshRowsUser: refreshRowsUserPropType,
  searchTerm: searchTermPropType.isRequired,
  rowsSelected: rowsSelectedPropType.isRequired,
  rowsEdited: rowsEditedPropType.isRequired,
  isRefreshing: isRefreshingPropType.isRequired,
  areFilterFieldsDisplayed: areFilterFieldsDisplayedPropType.isRequired,
  refreshText: textPropType
};

const mapDispatchToProps = dispatch => {
  return {
    refreshRows: refreshRowsUser => dispatch(refreshRowsAction(refreshRowsUser))
  };
};

const mapStateToProps = state => {
  return {
    refreshRowsUser: state.datatableReducer.refreshRows,
    rowsSelected: state.datatableReducer.rowsSelected,
    rowsEdited: state.datatableReducer.rowsEdited,
    isRefreshing: state.datatableReducer.isRefreshing,
    searchTerm: state.datatableReducer.searchTerm,
    areFilterFieldsDisplayed: state.datatableReducer.areFilterFieldsDisplayed,
    refreshText: state.textReducer.refresh
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshRows);
