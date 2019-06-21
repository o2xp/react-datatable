/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { IconButton, withStyles } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { customVariant } from "./MuiTheme";
import {
  removeSnackbar as removeSnackbarAction,
  closeSnackbar as closeSnackbarAction
} from "../redux/actions/notifierActions";

export class Notifier extends Component {
  displayed = [];

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    if (!newSnacks.length) {
      this.displayed = [];
      return false;
    }

    const {
      notifications: currentSnacks,
      closeSnackbar,
      removeSnackbar
    } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      const newSnack = newSnacks[i];
      if (newSnack.dismissed) {
        closeSnackbar(newSnack.key);
        removeSnackbar(newSnack.key);
      }

      if (!notExists) {
        notExists =
          notExists ||
          !currentSnacks.filter(({ key }) => newSnack.key === key).length;
      }
    }
    return notExists;
  }

  componentDidUpdate() {
    const {
      notifications = [],
      classes,
      enqueueSnackbar,
      closeSnackbarFunc,
      removeSnackbar
    } = this.props;

    notifications.forEach(({ key, message, options = {} }) => {
      if (this.displayed.includes(key)) return;
      enqueueSnackbar(message, {
        ...options,
        action: () => (
          <IconButton
            className="close-snackbar-icon"
            onClick={() => closeSnackbarFunc(key)}
          >
            <CloseIcon className={classes.whiteIcon} />
          </IconButton>
        ),
        onClose: (event, reason) => {
          if (options.onClose) {
            options.onClose(event, reason, key);
          }
          removeSnackbar(key);
        }
      });
      this.storeDisplayed(key);
    });
  }

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeSnackbar: key => dispatch(removeSnackbarAction(key)),
    closeSnackbarFunc: key => dispatch(closeSnackbarAction(key))
  };
};

const mapStateToProps = state => ({
  notifications: state.notifierReducer.notifications
});

export default withSnackbar(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(customVariant)(Notifier))
);
