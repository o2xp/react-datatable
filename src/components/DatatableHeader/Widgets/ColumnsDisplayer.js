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
  Checkbox,
  MenuItem
} from "@material-ui/core";
import { ViewColumn as ViewColumnIcon } from "@material-ui/icons";
import {
  columnsOrderPropType,
  columnsPropType,
  setColumnVisibiltyPropType,
  textPropType
} from "../../../proptypes";
import { setColumnVisibilty as setColumnVisibiltyAction } from "../../../redux/actions/datatableActions";

export class ColumnsDisplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.buttonRef = React.createRef();
  }

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  closeMenu = e => {
    if (!this.buttonRef.current || !this.buttonRef.current.contains(e.target)) {
      this.setState({ menuOpen: false });
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

  render() {
    const { columns, displayText } = this.props;
    const { menuOpen } = this.state;
    return (
      <Fragment>
        <Tooltip TransitionComponent={Zoom} title={menuOpen ? "" : displayText}>
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
          {({ TransitionProps, placement }) => (
            <Zoom
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper
                id="menu-list-grow"
                style={{ maxHeight: "50vh", overflow: "auto" }}
              >
                <ClickAwayListener
                  onClickAway={e => {
                    this.closeMenu(e);
                  }}
                >
                  <MenuList>
                    {columns.map(column => {
                      return this.createMenuItem(column);
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Zoom>
          )}
        </Popper>
      </Fragment>
    );
  }
}

ColumnsDisplayer.propTypes = {
  columnsOrder: columnsOrderPropType.isRequired,
  columns: columnsPropType.isRequired,
  setColumnVisibilty: setColumnVisibiltyPropType,
  displayText: textPropType
};

const mapDispatchToProps = dispatch => {
  return {
    setColumnVisibilty: column => dispatch(setColumnVisibiltyAction(column))
  };
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    displayText: state.textReducer.display
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnsDisplayer);
