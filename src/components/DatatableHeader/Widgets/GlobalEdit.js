import React, { Component, Fragment } from "react";
import { IconButton, Tooltip, Zoom, withStyles } from "@material-ui/core";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Clear as ClearIcon
} from "@material-ui/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  addAllRowsToEdited as addAllRowsToEditedAction,
  saveAllRowsEdited as saveAllRowsEditedAction,
  revertAllRowsToEdited as revertAllRowsToEditedAction
} from "../../../redux/actions/datatableActions";
import { customVariant } from "../../MuiTheme";

import {
  addAllRowsToEditedPropType,
  saveAllRowsEditedPropType,
  revertAllRowsToEditedPropType,
  rowsGlobalEditedPropType,
  classesPropType
} from "../../../proptypes";

class GlobalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  edit = () => {
    const { addAllRowsToEdited } = this.props;
    this.setState({ editing: true });
    addAllRowsToEdited();
  };

  revert = () => {
    const { revertAllRowsToEdited } = this.props;
    this.setState({ editing: false });
    revertAllRowsToEdited();
  };

  save = () => {
    const { saveAllRowsEdited } = this.props;
    this.setState({ editing: false });
    saveAllRowsEdited();
  };

  render() {
    const { rowsGlobalEdited, classes } = this.props;
    const { editing } = this.state;
    let error = false;
    rowsGlobalEdited.forEach(row => {
      if (row.idOfColumnErr.length) {
        error = true;
      }
    });
    const save = !!rowsGlobalEdited.length;
    const saveDisabled = error || !save;

    return (
      <Fragment>
        {!editing && (
          <Tooltip TransitionComponent={Zoom} title="Edit">
            <span>
              <IconButton className="edit-icon" onClick={() => this.edit()}>
                <EditIcon color="primary" />
              </IconButton>
            </span>
          </Tooltip>
        )}
        {editing && (
          <Fragment>
            <Tooltip title="Clear row">
              <IconButton
                className={`revert ${classes.errorIcon}`}
                onClick={() => this.revert()}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Save row"
              classes={{
                popper: saveDisabled
                  ? classes.disabledButtonPopper
                  : classes.enabledButtonPopper
              }}
            >
              <span>
                <IconButton
                  className={`save ${classes.validIcon}`}
                  onClick={() => this.save()}
                  disabled={saveDisabled}
                >
                  <SaveIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

GlobalEdit.propTypes = {
  addAllRowsToEdited: addAllRowsToEditedPropType,
  saveAllRowsEdited: saveAllRowsEditedPropType,
  revertAllRowsToEdited: revertAllRowsToEditedPropType,
  rowsGlobalEdited: rowsGlobalEditedPropType.isRequired,
  classes: classesPropType.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    addAllRowsToEdited: () => dispatch(addAllRowsToEditedAction()),
    saveAllRowsEdited: () => dispatch(saveAllRowsEditedAction()),
    revertAllRowsToEdited: () => dispatch(revertAllRowsToEditedAction())
  };
};

const mapStateToProps = state => {
  return {
    rowsGlobalEdited: state.datatableReducer.rowsGlobalEdited
  };
};

export default compose(
  withStyles(customVariant),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GlobalEdit);
