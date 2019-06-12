import React, { Component } from "react";
import { connect } from "react-redux";
import {
  widthNumberPropType,
  heightNumberPropType,
  titlePropType,
  featuresPropType
} from "../../proptypes";
import ExportRows from "./Widgets/ExportRows";

class DatatableHeader extends Component {
  render() {
    const { width, height, title, features } = this.props;
    const { canSelectRow } = features;
    return (
      <div className="Header" style={{ width, height }}>
        <div className="title">{title}</div>
        {canSelectRow && <ExportRows />}
      </div>
    );
  }
}

DatatableHeader.propTypes = {
  width: widthNumberPropType.isRequired,
  height: heightNumberPropType.isRequired,
  title: titlePropType.isRequired,
  features: featuresPropType.isRequired
};

const mapStateToProps = state => {
  return {
    width: state.datatableReducer.dimensions.datatable.widthNumber,
    height: state.datatableReducer.dimensions.header.heightNumber,
    title: state.datatableReducer.title,
    features: state.datatableReducer.features
  };
};

export default connect(mapStateToProps)(DatatableHeader);
