import React, { Component } from "react";
import { connect } from "react-redux";
import {
  widthNumberPropType,
  heightNumberPropType,
  titlePropType,
  additionalIconsPropType,
  selectionIconsPropType,
  canFilterColumnsPropType,
  canDownloadPropType,
  canSearchPropType,
  canPrintPropType
} from "../../proptypes";
import SelectionIcons from "./Widgets/SelectionIcons";
import AdditionalIcons from "./Widgets/AdditionalIcons";
import DownloadData from "./Widgets/DownloadData";
import Search from "./Widgets/Search";
import ColumnsDisplayer from "./Widgets/ColumnsDisplayer";
import Print from "./Widgets/Print";

class DatatableHeader extends Component {
  render() {
    const {
      width,
      height,
      title,
      additionalIcons,
      selectionIcons,
      canFilterColumns,
      canDownload,
      canSearch,
      canPrint
    } = this.props;
    const hasBaseIcons =
      canSearch || canDownload || canFilterColumns || canPrint;
    const hasSelectionIcons = selectionIcons.length > 0;
    const hasAdditionalIcons = additionalIcons.length > 0;
    return (
      <div className="Header" style={{ width, height }}>
        <div className="title">{title}</div>
        {canSearch && <Search />}
        {canDownload && <DownloadData />}
        {canFilterColumns && <ColumnsDisplayer />}
        {canPrint && <Print />}
        <div
          className="selection-icons-separator"
          style={{
            borderRight: "1px solid rgba(0, 0, 0, 0.35)",
            height: hasBaseIcons && hasSelectionIcons ? "45%" : "0%"
          }}
        />
        <SelectionIcons />
        <div
          className="additional-icons-separator"
          style={{
            borderRight: "1px solid rgba(0, 0, 0, 0.35)",
            height:
              (hasSelectionIcons && hasAdditionalIcons) ||
              (hasBaseIcons && hasAdditionalIcons)
                ? "45%"
                : "0%"
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
  additionalIcons: additionalIconsPropType.isRequired,
  selectionIcons: selectionIconsPropType.isRequired,
  canFilterColumns: canFilterColumnsPropType.isRequired,
  canDownload: canDownloadPropType.isRequired,
  canSearch: canSearchPropType.isRequired,
  canPrint: canPrintPropType.isRequired
};

const mapStateToProps = state => {
  return {
    width: state.datatableReducer.dimensions.datatable.widthNumber,
    height: state.datatableReducer.dimensions.header.heightNumber,
    title: state.datatableReducer.title,
    additionalIcons: state.datatableReducer.features.additionalIcons,
    selectionIcons: state.datatableReducer.features.selectionIcons,
    canFilterColumns: state.datatableReducer.features.canFilterColumns,
    canDownload: state.datatableReducer.features.canDownload,
    canSearch: state.datatableReducer.features.canSearch,
    canPrint: state.datatableReducer.features.canPrint
  };
};

export default connect(mapStateToProps)(DatatableHeader);
