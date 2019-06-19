import React, { Component, Fragment } from "react";
import equal from "fast-deep-equal";
import { connect } from "react-redux";
import {
  IconButton,
  Tooltip,
  Zoom,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
  Switch
} from "@material-ui/core";
import {
  Settings as SettingsIcon,
  Close as CloseIcon
} from "@material-ui/icons";
import {
  columnsOrderPropType,
  copyToClipboardPropType,
  setUserConfigurationPropType
} from "../../../proptypes";
import { setUserConfiguration as setUserConfigurationAction } from "../../../redux/actions/datatableActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class UserConfiguration extends Component {
  constructor(props) {
    super(props);
    const { columnsOrder, copyToClipboard } = props;
    this.state = {
      columnsOrderState: [...columnsOrder],
      copyToClipboardState: copyToClipboard,
      dialogOpen: false
    };
  }

  toggleDialog = bool => {
    this.setState({ dialogOpen: bool });
  };

  userConfiguration = ({ copyToClipboard, columnsOrder, action }) => {
    const { setUserConfiguration } = this.props;
    this.setState({
      copyToClipboardState: copyToClipboard,
      columnsOrderState: [...columnsOrder],
      dialogOpen: false
    });
    setUserConfiguration({
      copyToClipboard,
      columnsOrder,
      action
    });
  };

  render() {
    const { columnsOrderState, copyToClipboardState, dialogOpen } = this.state;
    const { columnsOrder, copyToClipboard } = this.props;
    const disabled =
      copyToClipboardState === copyToClipboard &&
      equal(columnsOrderState, columnsOrder);

    return (
      <Fragment>
        <Tooltip TransitionComponent={Zoom} title="Configuration">
          <span>
            <IconButton
              className="user-configuration-icon"
              onClick={() => this.toggleDialog(true)}
            >
              <SettingsIcon color="primary" />
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
            User configuration
            <IconButton
              aria-label="Close"
              className="close-icon"
              onClick={() => this.toggleDialog(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            Save cell's content to clipboard on click
            <Switch
              className="switch-copy-icon"
              checked={copyToClipboardState}
              onChange={() =>
                this.setState({ copyToClipboardState: !copyToClipboardState })
              }
              color="primary"
            />
            <hr />
            Do you want to save the configuration of the columns and copy to
            clipboard feature ?
          </DialogContent>
          <DialogActions>
            <Button
              disabled={disabled}
              className="reset-configuration"
              onClick={() =>
                this.userConfiguration({
                  copyToClipboard,
                  columnsOrder: columnsOrderState,
                  action: "reset"
                })
              }
              variant="contained"
              size="small"
              color="secondary"
            >
              Reset
            </Button>
            <Button
              disabled={disabled}
              className="save-configuration"
              onClick={() =>
                this.userConfiguration({
                  copyToClipboard: copyToClipboardState,
                  columnsOrder,
                  action: "save"
                })
              }
              variant="contained"
              size="small"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

UserConfiguration.propTypes = {
  columnsOrder: columnsOrderPropType.isRequired,
  copyToClipboard: copyToClipboardPropType.isRequired,
  setUserConfiguration: setUserConfigurationPropType
};

const mapDispatchToProps = dispatch => {
  return {
    setUserConfiguration: ({ columnsOrder, copyToClipboard, action }) =>
      dispatch(
        setUserConfigurationAction({ columnsOrder, copyToClipboard, action })
      )
  };
};

const mapStateToProps = state => {
  return {
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    copyToClipboard:
      state.datatableReducer.features.userConfiguration.copyToClipboard
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserConfiguration);
