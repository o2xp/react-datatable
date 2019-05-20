import React, { Component } from "react";
import { connect } from "react-redux";
import { columnPropType, isScrollingPropType } from "../../../proptypes";

export class HeaderActionsCell extends Component {
  render() {
    const { column, isScrolling } = this.props;
    return (
      <div
        className={
          isScrolling
            ? "Table-Header-Cell action scrolling-shadow"
            : "Table-Header-Cell action"
        }
      >
        <div style={{ width: column.colSize }}>Actions</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isScrolling: state.datatableReducer.dimensions.isScrolling
  };
};

HeaderActionsCell.propTypes = {
  column: columnPropType.isRequired,
  isScrolling: isScrollingPropType
};

export default connect(mapStateToProps)(HeaderActionsCell);
