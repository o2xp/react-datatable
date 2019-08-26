import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollSyncPane } from "react-scroll-sync";
import {
  columnsOrderPropType,
  columnSizeMultiplierPropType,
  widthNumberPropType,
  CustomTableHeaderRowPropType,
  customPropsPropType
} from "../../../proptypes";
import HeaderRow from "./HeaderRow";

class Header extends Component {
  headerRowBuilder = () => {
    const {
      columnsOrder,
      CustomTableHeaderRow,
      columnSizeMultiplier,
      widthDatatable,
      customProps
    } = this.props;

    if (CustomTableHeaderRow !== null) {
      return (
        <div
          style={{
            width: widthDatatable - 17,
            overflow: "hidden",
            borderBottom: "1px solid #7e7e7e"
          }}
        >
          <CustomTableHeaderRow
            customProps={customProps}
            columnsOrder={columnsOrder}
            columnSizeMultiplier={columnSizeMultiplier}
          />
        </div>
      );
    }
    return <HeaderRow />;
  };

  render() {
    return <ScrollSyncPane>{this.headerRowBuilder()}</ScrollSyncPane>;
  }
}

Header.propTypes = {
  customProps: customPropsPropType,
  columnsOrder: columnsOrderPropType.isRequired,
  columnSizeMultiplier: columnSizeMultiplierPropType.isRequired,
  widthDatatable: widthNumberPropType.isRequired,
  CustomTableHeaderRow: CustomTableHeaderRowPropType
};

const mapStateToProps = state => {
  return {
    customProps: state.customComponentsReducer.customProps,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    widthDatatable: state.datatableReducer.dimensions.datatable.widthNumber,
    columnSizeMultiplier:
      state.datatableReducer.dimensions.columnSizeMultiplier,
    CustomTableHeaderRow: state.customComponentsReducer.CustomTableHeaderRow
  };
};

export default connect(mapStateToProps)(Header);
