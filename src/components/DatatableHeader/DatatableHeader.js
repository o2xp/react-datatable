import React, { Component } from "react";
import { connect } from "react-redux";
import {
  widthNumberPropType,
  heightNumberPropType,
  titlePropType
} from "../../proptypes";

class DatatableHeader extends Component {
  render() {
    const { width, height, title } = this.props;
    return (
      <div className="Header" style={{ width, height }}>
        <div className="title">{title}</div>
      </div>
    );
  }
}

DatatableHeader.propTypes = {
  width: widthNumberPropType.isRequired,
  height: heightNumberPropType.isRequired,
  title: titlePropType.isRequired
};

const mapStateToProps = state => {
  return {
    width: state.datatableReducer.dimensions.datatable.widthNumber,
    height: state.datatableReducer.dimensions.header.heightNumber,
    title: state.datatableReducer.title
  };
};

export default connect(mapStateToProps)(DatatableHeader);
