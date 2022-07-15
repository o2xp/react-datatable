import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
  AddCircle as CreatePresetIcon,
  Create as CreatePresetNamingIcon,
  Close as CloseIcon
} from "@material-ui/icons";

import {
  Tooltip,
  Zoom,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";

import Transition from "./Transition";

import {
  textPropType,
  columnsPropType,
  currentScreenPropType
} from "../../../proptypes";

export class CreatePreset extends Component {
  constructor(props) {
    const { currentScreen } = props;
    super(props);
    this.state = {
      dialogOpen: false,
      isNamingInputFocused: false,
      newPreset: {
        presetName: "",
        columnsToShow: [],
        isActive: false,
        screen: currentScreen,
        type: "localStoragePreset"
      }
    };
  }

  toggleDialog = bool => {
    const { newPreset } = this.state;
    this.setState({
      dialogOpen: bool,
      newPreset: {
        ...newPreset,
        presetName: "",
        columnsToShow: [],
        isActive: false
      }
    });
  };

  nameInputFocusHandler = () => {
    const { isNamingInputFocused } = this.state;
    this.setState({ isNamingInputFocused: !isNamingInputFocused });
  };

  createColumnsCheckboxes = column => {
    if (column.id !== "o2xpActions") {
      return (
        <FormControlLabel
          label={column.label}
          key={column.id}
          control={
            <Checkbox
              id={column.id}
              color="primary"
              onChange={this.handleCheckboxChange}
            />
          }
        />
      );
    }
    return null;
  };

  handleCheckboxChange = e => {
    const { newPreset } = this.state;

    const columnsList = newPreset.columnsToShow; // eslint-disable-line no-undef

    const currentCheckbox = e.target;
    const currentColId = e.target.id;
    if (currentCheckbox.checked && !columnsList.includes(currentColId)) {
      this.setState({
        newPreset: {
          ...newPreset,
          columnsToShow: [...columnsList, currentColId]
        }
      });
    } else if (!currentCheckbox.checked && columnsList.includes(currentColId)) {
      this.setState({
        newPreset: {
          ...newPreset,
          columnsToShow: columnsList.filter(col => col !== currentColId)
        }
      });
    }
  };

  storePresetsInLocalStorage = localPresetList => {
    const { newPreset } = this.state;
    if (localPresetList == null) {
      localStorage.setItem("presetList", JSON.stringify([newPreset]));
    } else {
      const parsedPresetList = JSON.parse(localPresetList);
      const updatedPresetList = [...parsedPresetList, newPreset];
      localStorage.setItem("presetList", JSON.stringify(updatedPresetList));
    }
  };

  setPresetName = e => {
    const { newPreset } = this.state;
    this.setState({
      newPreset: {
        ...newPreset,
        presetName: e.target.value
      }
    });
  };

  // TODO: Add an ID to the preset or make presetNames unique
  handleCreatePreset = () => {
    const { newPreset } = this.state;
    const { presetName, columnsToShow } = newPreset;

    const localPresetList = localStorage.getItem("presetList");

    if (presetName.length > 0 && columnsToShow.length > 0) {
      this.storePresetsInLocalStorage(localPresetList);
      this.setState({ newPreset: { presetName: "", columnsToShow: [] } });
      this.toggleDialog(false);
      // TODO: Add a success pop up
    } else if (presetName.length <= 0) {
      // TODO: Add pop up "Please enter a preset name"
    } else if (columnsToShow.length <= 0) {
      // TODO: Add pop up "Please select at least one column"
    }
  };

  render() {
    const { dialogOpen, isNamingInputFocused } = this.state;

    const {
      createPresetTooltipText,
      createPresetTitle,
      createPresetNamingPlaceholder,
      createPresetDescription,
      createPresetCancelBtn,
      createPresetCreateBtn,
      columns
    } = this.props;

    const columnsUnlocked = columns.filter(col => !col.locked);

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
          fullWidth
          maxWidth="sm"
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
            <span
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Input
                style={{ fontSize: "1rem", lineHeight: "1.1875em" }}
                label={createPresetNamingPlaceholder}
                placeholder={createPresetNamingPlaceholder}
                onFocus={this.nameInputFocusHandler}
                onBlur={this.nameInputFocusHandler}
                onChange={this.setPresetName}
              />
              <CreatePresetNamingIcon
                color={isNamingInputFocused ? "primary" : "disabled"}
              />
            </span>

            <DialogContentText
              id="alert-dialog-slide-description"
              style={{ marginTop: "1rem" }}
            >
              {createPresetDescription}
            </DialogContentText>

            <FormGroup
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))"
              }}
            >
              {columnsUnlocked.map(column => {
                return this.createColumnsCheckboxes(column);
              })}
            </FormGroup>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.toggleDialog(false)}
              >
                {createPresetCancelBtn}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleCreatePreset}
              >
                {createPresetCreateBtn}
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CreatePreset.propTypes = {
  createPresetTooltipText: textPropType,
  createPresetTitle: textPropType,
  createPresetNamingPlaceholder: textPropType,
  createPresetDescription: textPropType,
  createPresetCancelBtn: textPropType,
  createPresetCreateBtn: textPropType,
  columns: columnsPropType.isRequired,
  currentScreen: currentScreenPropType.isRequired
};

const mapStateToProps = state => {
  return {
    createPresetTooltipText: state.textReducer.createPresetTooltipText,
    createPresetTitle: state.textReducer.createPresetTitle,
    createPresetNamingPlaceholder:
      state.textReducer.createPresetNamingPlaceholder,
    createPresetDescription: state.textReducer.createPresetDescription,
    createPresetCancelBtn: state.textReducer.createPresetCancelBtn,
    createPresetCreateBtn: state.textReducer.createPresetCreateBtn,
    columns: state.datatableReducer.data.columns,
    currentScreen: state.datatableReducer.currentScreen
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePreset);
