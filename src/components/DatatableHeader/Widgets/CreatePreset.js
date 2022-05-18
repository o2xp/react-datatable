import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
  AddCircle as CreatePresetIcon,
  Close as CloseIcon
} from "@material-ui/icons";

import {
  IconButton,
  Tooltip,
  Zoom,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input
} from "@material-ui/core";
import Transition from "./Transition";

import { textPropType } from "../../../proptypes";

export class CreatePreset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    };
  }

  toggleDialog = bool => {
    this.setState({ dialogOpen: bool });
  };

  render() {
    const { dialogOpen } = this.state;
    const {
      createPresetTooltipText,
      createPresetTitle,
      createPresetNamingPlaceholder,
      createPresetDescription
    } = this.props;
    return (
      <Fragment>
        <Tooltip
          arrow
          TransitionComponent={Zoom}
          title={createPresetTooltipText}
        >
          <span>
            <IconButton
              className="create-preset-icon"
              onClick={() => this.toggleDialog(true)}
            >
              <CreatePresetIcon color="primary" />
            </IconButton>
          </span>
        </Tooltip>

        <Dialog
          open={dialogOpen}
          onClose={() => this.toggleDialog(false)}
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {createPresetTitle}
            <IconButton
              aria-label="Close"
              className="close-icon"
              onClick={() => this.toggleDialog(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Input
              style={{ fontSize: "1rem", lineHeight: "1.1875em" }}
              label={createPresetNamingPlaceholder}
              placeholder={createPresetNamingPlaceholder}
            />
            <DialogContentText id="alert-dialog-slide-description">
              {createPresetDescription}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CreatePreset.propTypes = {
  createPresetTooltipText: textPropType.isRequired,
  createPresetTitle: textPropType.isRequired,
  createPresetNamingPlaceholder: textPropType.isRequired,
  createPresetDescription: textPropType.isRequired
};

const mapStateToProps = state => {
  return {
    createPresetTooltipText: state.textReducer.createPresetTooltipText,
    createPresetTitle: state.textReducer.createPresetTitle,
    createPresetNamingPlaceholder:
      state.textReducer.createPresetNamingPlaceholder,
    createPresetDescription: state.textReducer.createPresetDescription
  };
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePreset);
