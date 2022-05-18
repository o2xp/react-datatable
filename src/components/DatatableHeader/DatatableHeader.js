import React, { Component } from "react";
import { connect } from "react-redux";
import {
  widthNumberPropType,
  heightNumberPropType,
  titlePropType,
  additionalIconsPropType,
  selectionIconsPropType,
  canOrderColumnsPropType,
  canDownloadPropType,
  canSearchPropType,
  canCreatePresetPropType,
  canPrintPropType,
  canRefreshRowsPropType,
  canSaveUserConfigurationPropType,
  canGlobalEditPropType
} from "../../proptypes";
import SelectionIcons from "./Widgets/SelectionIcons";
import AdditionalIcons from "./Widgets/AdditionalIcons";
import DownloadData from "./Widgets/DownloadData";
import Search from "./Widgets/Search";
import ColumnsDisplayer from "./Widgets/ColumnsDisplayer";
import Print from "./Widgets/Print";
import UserConfiguration from "./Widgets/UserConfiguration";
import RefreshRows from "./Widgets/RefreshRows";
import GlobalEdit from "./Widgets/GlobalEdit";
import CreatePreset from "./Widgets/CreatePreset";

class DatatableHeader extends Component {
  render() {
    const {
      width,
      height,
      title,
      additionalIcons,
      selectionIcons,
      canOrderColumns,
      canDownload,
      canGlobalEdit,
      canSearch,
      canPrint,
      canRefreshRows,
      canSaveUserConfiguration,
      canCreatePreset
    } = this.props;
    const hasBaseIcons =
      canSearch ||
      canDownload ||
      canGlobalEdit ||
      canOrderColumns ||
      canCreatePreset ||
      canPrint ||
      canRefreshRows ||
      canSaveUserConfiguration;
    const hasSelectionIcons = selectionIcons.length > 0;
    const hasAdditionalIcons = additionalIcons.length > 0;
    return (
      <div className="Header" style={{ width, height }}>
        {console.log(canCreatePreset)}
        <div className="title">{title}</div>
        {canSearch && <Search />}
        {canDownload && <DownloadData />}
        {canOrderColumns && <ColumnsDisplayer />}
        {canCreatePreset && <CreatePreset />}
        {canPrint && <Print />}
        {canRefreshRows && <RefreshRows />}
        {canSaveUserConfiguration && <UserConfiguration />}
        <div
          className="global-edit-icon-separator"
          style={{
            borderRight: "1px solid rgba(0, 0, 0, 0.35)",
            height: canGlobalEdit ? "45%" : "0%"
          }}
        />
        {canGlobalEdit && <GlobalEdit />}
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
  canOrderColumns: canOrderColumnsPropType.isRequired,
  canDownload: canDownloadPropType.isRequired,
  canSearch: canSearchPropType.isRequired,
  canPrint: canPrintPropType.isRequired,
  canRefreshRows: canRefreshRowsPropType.isRequired,
  canSaveUserConfiguration: canSaveUserConfigurationPropType.isRequired,
  canGlobalEdit: canGlobalEditPropType.isRequired,
  canCreatePreset: canCreatePresetPropType.isRequired
};

const mapStateToProps = state => {
  return {
    width: state.datatableReducer.dimensions.datatable.widthNumber,
    height: state.datatableReducer.dimensions.header.heightNumber,
    title: state.datatableReducer.title,
    additionalIcons: state.datatableReducer.features.additionalIcons,
    selectionIcons: state.datatableReducer.features.selectionIcons,
    canOrderColumns: state.datatableReducer.features.canOrderColumns,
    canDownload: state.datatableReducer.features.canDownload,
    canGlobalEdit: state.datatableReducer.features.canGlobalEdit,
    canCreatePreset: state.datatableReducer.features.canCreatePreset,
    canSearch: state.datatableReducer.features.canSearch,
    canPrint: state.datatableReducer.features.canPrint,
    canAdd: state.datatableReducer.features.canAdd,
    canRefreshRows: state.datatableReducer.features.canRefreshRows,
    canSaveUserConfiguration:
      state.datatableReducer.features.canSaveUserConfiguration
  };
};

export default connect(mapStateToProps)(DatatableHeader);
