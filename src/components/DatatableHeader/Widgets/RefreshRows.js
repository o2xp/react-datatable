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
  textPropType
} from "../../../proptypes";
import Transition from "./Transition";

export class RefreshRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      searchTermMessage: false,
      rowsSelectedMessage: false,
      rowsEditedMessage: false
    };
  }

  refresh = (forceRefresh = false) => {
    const {
      refreshRows,
      refreshRowsUser,
      searchTerm,
      rowsSelected,
      rowsEdited
    } = this.props;
    const searchTermMessage = searchTerm.length > 0;
    const rowsSelectedMessage = rowsSelected.length > 0;
    const rowsEditedMessage = rowsEdited.length > 0;
    if (
      (searchTermMessage || rowsSelectedMessage || rowsEditedMessage) &&
      !forceRefresh
    ) {
      this.setState({
        rowsEditedMessage,
        rowsSelectedMessage,
        searchTermMessage,
        dialogOpen: true
      });
    } else {
      this.setState({ dialogOpen: false });
      refreshRows(refreshRowsUser);
    }
  };

  toggleDialog = bool => {
    this.setState({ dialogOpen: bool });
  };

  render() {
    const { isRefreshing, refreshText } = this.props;
    const {
      dialogOpen,
      searchTermMessage,
      rowsSelectedMessage,
      rowsEditedMessage
    } = this.state;
    return (
      <Fragment>
        <Tooltip TransitionComponent={Zoom} title={refreshText}>
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
          open={dialogOpen}
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
                {searchTermMessage && (
                  <li className="error-search">You did a search</li>
                )}
                {rowsSelectedMessage && (
                  <li className="error-rows-selected">
                    You have selected row(s)
                  </li>
                )}
                {rowsEditedMessage && (
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
    refreshText: state.textReducer.refresh
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefreshRows);
