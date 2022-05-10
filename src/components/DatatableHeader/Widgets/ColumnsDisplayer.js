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
  columnsOrderPropType,
  columnsPropType,
  setColumnVisibiltyPropType,
  columnsPresetsPropType,
  setMultipleColumnsVisibilityPropType,
  textPropType
} from "../../../proptypes";
import {
  setColumnVisibilty as setColumnVisibiltyAction,
  setMultipleColumnsVisibility as setMultipleColumnsVisibilityAction
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

  createMenuItem = column => {
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

  createPresetsItem = preset => {
    const { setMultipleColumnsVisibility } = this.props;
    /* let allColumns = cloneDeep(preset.columnsToHide);
      allColumns.unshift("o2xpActions");
      const visible = columnsOrder.every(columnOrder => allColumns.includes(columnOrder)); */

    return (
      <MenuItem
        key={preset.presetName}
        onClick={() => setMultipleColumnsVisibility(preset)}
      >
        <Checkbox checked={preset.isActive} color="primary" />
        {preset.presetName}
      </MenuItem>
    );
  };

  render() {
    const { columns, columnsPresetsToDisplay, displayText } = this.props;
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

        {/* ({ TransitionProps, placement }) => (
          <Zoom
          {...TransitionProps}
          style={{
            transformOrigin:
            placement === "bottom" ? "center top" : "center bottom"
          }}
          >
          <ClickAwayListener
          onClickAway={e => {
            this.closeMenu(e);
          }}
          >
          <Paper
          id="menu-list-grow"
          style={{ maxHeight: "50vh", overflow: "auto" }}
          >
          <MenuList>
          {columnsUnlocked.map(column => {
            return this.createMenuItem(column);
          })}
          </MenuList>
          </Paper>
          </ClickAwayListener>
          </Zoom>
        ) */}
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
                {/* TODO: put the plain text into the textReducer.js and then use those variables */ menuOpen &&
                  !columnsDisplay &&
                  !presetsDisplay && (
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
                        return this.createMenuItem(column);
                      })}
                    </MenuList>
                  </Paper>
                )}

                {presetsDisplay && (
                  <Paper
                    id="menu-list-grow-preset"
                    style={{ maxHeight: "50vh", overflow: "auto" }}
                  >
                    <MenuList>
                      {columnsPresetsToDisplay.length > 0
                        ? columnsPresetsToDisplay.map(preset => {
                            return this.createPresetsItem(preset);
                          })
                        : "There are no presets defined."}
                    </MenuList>
                  </Paper>
                )}
              </Paper>
            </ClickAwayListener>
          </Zoom>
          )
        </Popper>
      </Fragment>
    );
  }
}

ColumnsDisplayer.propTypes = {
  columnsOrder: columnsOrderPropType.isRequired,
  columns: columnsPropType.isRequired,
  columnsPresetsToDisplay: columnsPresetsPropType,
  setColumnVisibilty: setColumnVisibiltyPropType,
  setMultipleColumnsVisibility: setMultipleColumnsVisibilityPropType,
  displayText: textPropType
};

const mapDispatchToProps = dispatch => {
  return {
    setColumnVisibilty: column => dispatch(setColumnVisibiltyAction(column)),
    setMultipleColumnsVisibility: columns =>
      dispatch(setMultipleColumnsVisibilityAction(columns))
  };
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    columnsPresetsToDisplay:
      state.datatableReducer.features.columnsPresetsToDisplay,
    displayText: state.textReducer.display
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnsDisplayer);
