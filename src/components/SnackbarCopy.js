import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Snackbar,
  SnackbarContent,
  IconButton,
  withStyles
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import {
  classesPropType,
  snackbarOpenPropType,
  toggleSnackbarPropType
} from "../proptypes";
import { toggleSnackbar as toggleSnackbarAction } from "../redux/actions/datatableActions";
import { customVariant } from "./MuiTheme";

export class SnackbarCopy extends Component {
  render() {
    const { snackbarOpen, toggleSnackbar, classes } = this.props;

    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => toggleSnackbar(false)}
      >
        <SnackbarContent
          className={classes.infoSnackbar}
          message={<span>Cell's content has been copied to clipboard.</span>}
          action={
            <IconButton
              className="close-snackbar-icon"
              onClick={() => toggleSnackbar(false)}
            >
              <CloseIcon className={classes.whiteIcon} />
            </IconButton>
          }
        />
      </Snackbar>
    );
  }
}

SnackbarCopy.propTypes = {
  classes: classesPropType.isRequired,
  snackbarOpen: snackbarOpenPropType.isRequired,
  toggleSnackbar: toggleSnackbarPropType
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSnackbar: bool => dispatch(toggleSnackbarAction(bool))
  };
};

const mapStateToProps = state => {
  return {
    snackbarOpen: state.datatableReducer.snackbarOpen
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(customVariant)(SnackbarCopy));
