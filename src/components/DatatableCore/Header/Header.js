import React, { Component } from "react";
import { connect } from "react-redux";
import { TableHead } from "@material-ui/core";
import {
  columnsOrderPropType,
  CustomTableHeaderRowPropType
} from "../../../proptypes";
import HeaderRow from "./HeaderRow";

class Header extends Component {
  headerRowBuilder = () => {
    const { columnsOrder, CustomTableHeaderRow } = this.props;

    if (CustomTableHeaderRow !== null) {
      return <CustomTableHeaderRow columnsOrder={columnsOrder} />;
    }
    return <HeaderRow />;
  };

  render() {
    return <TableHead>{this.headerRowBuilder()}</TableHead>;
  }
}

Header.propTypes = {
  columnsOrder: columnsOrderPropType.isRequired,
  CustomTableHeaderRow: CustomTableHeaderRowPropType
};

const mapStateToProps = state => {
  return {
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    CustomTableHeaderRow: state.customComponentsReducer.CustomTableHeaderRow
  };
};

export default connect(mapStateToProps)(Header);
