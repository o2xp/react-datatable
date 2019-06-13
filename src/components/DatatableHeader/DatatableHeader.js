import React, { Component } from "react";
import { connect } from "react-redux";
import {
  widthNumberPropType,
  heightNumberPropType,
  titlePropType,
  additionalIconsPropType
} from "../../proptypes";
import SelectionIcons from "./Widgets/SelectionIcons";
import AdditionalIcons from "./Widgets/AdditionalIcons";

class DatatableHeader extends Component {
  render() {
    const { width, height, title, additionalIcons } = this.props;
    return (
      <div className="Header" style={{ width, height }}>
        <div className="title">{title}</div>
        <SelectionIcons />
        <div
          style={{
            borderRight: "1px solid rgba(0, 0, 0, 0.35)",
            height: additionalIcons.length > 0 ? "45%" : "0%"
          }}
        />
        <AdditionalIcons />
      </div>
    );
  }
}

DatatableHeader.propTypes = {
  width: widthNumberPropType.isRequired,
  height: heightNumberPropType.isRequired,
  title: titlePropType.isRequired,
  additionalIcons: additionalIconsPropType.isRequired
};

const mapStateToProps = state => {
  return {
    width: state.datatableReducer.dimensions.datatable.widthNumber,
    height: state.datatableReducer.dimensions.header.heightNumber,
    title: state.datatableReducer.title,
    additionalIcons: state.datatableReducer.features.additionalIcons
  };
};

export default connect(mapStateToProps)(DatatableHeader);
