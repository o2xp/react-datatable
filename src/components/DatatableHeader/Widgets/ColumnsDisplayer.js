import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  IconButton,
  Tooltip,
  Zoom,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  Button,
  Checkbox,
  MenuItem
} from "@material-ui/core";
import { ViewColumn as ViewColumnIcon } from "@material-ui/icons";
import {
  columnsPropType,
  setColumnVisibiltyPropType,
  columnsPresetsPropType,
  handlePresetDisplayPropType,
  textPropType,
  columnsOrderPropType,
  currentScreenPropType
} from "../../../proptypes";
import {
  setColumnVisibilty as setColumnVisibiltyAction,
  handlePresetDisplay as handlePresetDisplayAction
} from "../../../redux/actions/datatableActions";

export class ColumnsDisplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      columnsDisplay: false,
      presetsDisplay: false
    };
    this.buttonRef = React.createRef();
  }

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({
      menuOpen: !menuOpen,
      columnsDisplay: false,
      presetsDisplay: false
    });
  };

  toggleColumnsToDisplay = () => {
    const { columnsDisplay } = this.state;
    this.setState({ columnsDisplay: !columnsDisplay });
  };

  togglePresetsToDisplay = () => {
    const { presetsDisplay } = this.state;
    this.setState({ presetsDisplay: !presetsDisplay });
  };

  closeMenu = e => {
    if (!this.buttonRef.current || !this.buttonRef.current.contains(e.target)) {
      this.setState({
        menuOpen: false,
        columnsDisplay: false,
        presetsDisplay: false
      });
    }
  };

  createPresetMenuItems = () => {
    const {
      handlePresetDisplay,
      columnsPresetsToDisplay,
      currentScreen
    } = this.props;

    const parsedPresetList = JSON.parse(localStorage.getItem("presetList"));
    const localPresets = parsedPresetList.filter(
      preset => preset.screen === currentScreen
    );

    const allPresets = columnsPresetsToDisplay.concat(localPresets);

    return allPresets.map(preset => {
      return (
        <MenuItem
          key={preset.presetName}
          onClick={() => handlePresetDisplay(preset)}
        >
          <Checkbox checked={preset.isActive} color="primary" />
          {preset.presetName}
        </MenuItem>
      );
    });
  };

  createColumnsMenuItem = column => {
    const { columnsOrder } = this.props;
    const { setColumnVisibilty } = this.props;
    const visible = columnsOrder.includes(column.id);
    if (column.id !== "o2xpActions") {
      return (
        <MenuItem key={column.id} onClick={() => setColumnVisibilty(column)}>
          <Checkbox checked={visible} color="primary" />
          {column.label}
        </MenuItem>
      );
    }
    return null;
  };

  render() {
    const { columns, displayText } = this.props;
    const { menuOpen, columnsDisplay, presetsDisplay } = this.state;
    const columnsUnlocked = columns.filter(col => !col.locked);
    return (
      <Fragment>
        <Tooltip
          arrow
          TransitionComponent={Zoom}
          title={menuOpen ? "" : displayText}
        >
          <span>
            <IconButton
              buttonRef={this.buttonRef}
              onClick={() => this.toggleMenu()}
              className="display-columns-icon"
            >
              <ViewColumnIcon color="primary" />
            </IconButton>
          </span>
        </Tooltip>

        <Popper
          open={menuOpen}
          anchorEl={this.buttonRef.current}
          style={{ zIndex: 999 }}
          transition
          disablePortal
        >
          <Zoom>
            <ClickAwayListener
              onClickAway={e => {
                this.closeMenu(e);
              }}
            >
              <Paper
                style={{
                  padding: "10px 10px 10px",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "space-evenly"
                }}
              >
                {menuOpen && !columnsDisplay && !presetsDisplay && (
                  <div>
                    <Button
                      className="display-column"
                      onClick={() => this.toggleColumnsToDisplay()}
                      size="small"
                      variant="outlined"
                    >
                      Display by columns
                    </Button>
                    <span style={{ padding: "0 5px", color: "gray" }}>|</span>
                    <Button
                      className="display-column-preset"
                      onClick={() => this.togglePresetsToDisplay()}
                      size="small"
                      variant="outlined"
                    >
                      Display by presets
                    </Button>
                  </div>
                )}

                {columnsDisplay && (
                  <Paper
                    id="menu-list-grow"
                    style={{ maxHeight: "50vh", overflow: "auto" }}
                  >
                    <MenuList>
                      {columnsUnlocked.map(column => {
                        return this.createColumnsMenuItem(column);
                      })}
                    </MenuList>
                  </Paper>
                )}

                {presetsDisplay && (
                  <Paper
                    id="menu-list-grow-preset"
                    style={{ maxHeight: "50vh", overflow: "auto" }}
                  >
                    <MenuList>{this.createPresetMenuItems()}</MenuList>
                  </Paper>
                )}
              </Paper>
            </ClickAwayListener>
          </Zoom>
        </Popper>
      </Fragment>
    );
  }
}

ColumnsDisplayer.propTypes = {
  columns: columnsPropType.isRequired,
  columnsPresetsToDisplay: columnsPresetsPropType,
  columnsOrder: columnsOrderPropType,
  setColumnVisibilty: setColumnVisibiltyPropType,
  handlePresetDisplay: handlePresetDisplayPropType,
  displayText: textPropType,
  currentScreen: currentScreenPropType
};

const mapDispatchToProps = dispatch => {
  return {
    setColumnVisibilty: column => dispatch(setColumnVisibiltyAction(column)),
    handlePresetDisplay: preset => dispatch(handlePresetDisplayAction(preset))
  };
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    columnsPresetsToDisplay:
      state.datatableReducer.features.columnsPresetsToDisplay,
    displayText: state.textReducer.display,
    currentScreen: state.datatableReducer.currentScreen
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnsDisplayer);
