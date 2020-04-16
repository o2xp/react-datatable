/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React, { Component } from "react";
import { connect } from "react-redux";
import { difference } from "lodash";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { setRowsGlobalSelected as setRowsGlobalSelectedAction } from "../../../redux/actions/datatableActions";
import {
  columnPropType,
  isScrollingPropType,
  canSelectRowPropType,
  rowsPropType,
  rowsSelectedPropType,
  keyColumnPropType,
  setRowsSelectedPropType
} from "../../../proptypes";

export class HeaderActionsCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  // eslint-disable-next-line react/sort-comp
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { rowsToUse, rowsSelected, keyColumn } = nextProps;

    const checked =
      difference(
        rowsToUse.map(r => r[keyColumn]),
        rowsSelected.map(r => r[keyColumn])
      ).length === 0;

    this.setState({ checked });
  }

  handleChange = () => {
    const { setRowsGlobalSelected, rowsToUse } = this.props;
    const { checked } = this.state;
    setRowsGlobalSelected({
      rows: rowsToUse,
      checked: !checked
    });
  };

  render() {
    const { canSelect, column, isScrolling } = this.props;
    const { checked } = this.state;

    return (
      <div
        className={
          isScrolling
            ? "Table-Header-Cell action scrolling-shadow"
            : "Table-Header-Cell action"
        }
      >
        <Grid container style={{ width: column.colSize }}>
          {canSelect && (
            <Grid item>
              <Checkbox
                checked={checked}
                onChange={this.handleChange}
                value="primary"
                color="primary"
                className="select-all"
              />
            </Grid>
          )}
          {!canSelect && (
            <Grid item container alignItems="center" style={{ width: "auto" }}>
              Actions
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRowsGlobalSelected: payload =>
      dispatch(setRowsGlobalSelectedAction(payload))
  };
};
const mapStateToProps = state => {
  return {
    isScrolling: state.datatableReducer.dimensions.isScrolling,
    canSelect: state.datatableReducer.features.canSelectRow,
    rowsToUse: state.datatableReducer.pagination.rowsToUse,
    rowsSelected: state.datatableReducer.rowsSelected,
    keyColumn: state.datatableReducer.keyColumn
  };
};

HeaderActionsCell.propTypes = {
  column: columnPropType.isRequired,
  isScrolling: isScrollingPropType,
  canSelect: canSelectRowPropType,
  rowsToUse: rowsPropType,
  rowsSelected: rowsSelectedPropType,
  keyColumn: keyColumnPropType,
  setRowsGlobalSelected: setRowsSelectedPropType
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderActionsCell);
