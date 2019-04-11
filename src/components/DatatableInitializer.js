import React, { Component } from "react";
import { connect } from "react-redux";
import {
  initializeOptionsPropType,
  initializeCustomComponentsPropType,
  optionsPropType,
  CustomTableBodyRowPropType,
  CustomTableBodyCellPropType,
  CustomTableHeaderRowPropType,
  CustomTableHeaderCellPropType,
  customDataTypesPropType
} from "../proptypes";
import DatatableContainer from "./DatatableContainer";
import { initializeOptions } from "../redux/actions/datatableActions";
import initializeCustomComponents from "../redux/actions/customComponentsActions";

class DatatableInitializer extends Component {
  constructor(props) {
    super(props);
    const {
      optionsInit,
      CustomTableBodyCell,
      CustomTableBodyRow,
      CustomTableHeaderCell,
      CustomTableHeaderRow,
      customDataTypes
    } = props;
    props.initializeOptions(optionsInit);
    props.initializeCustomComponents({
      CustomTableBodyCell,
      CustomTableBodyRow,
      CustomTableHeaderCell,
      CustomTableHeaderRow,
      customDataTypes
    });
  }

  render() {
    return <DatatableContainer />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeOptions: state => dispatch(initializeOptions(state)),
    initializeCustomComponents: state =>
      dispatch(initializeCustomComponents(state))
  };
};

DatatableInitializer.propTypes = {
  initializeOptions: initializeOptionsPropType,
  initializeCustomComponents: initializeCustomComponentsPropType,
  optionsInit: optionsPropType.isRequired,
  CustomTableBodyCell: CustomTableBodyCellPropType,
  CustomTableBodyRow: CustomTableBodyRowPropType,
  CustomTableHeaderCell: CustomTableHeaderCellPropType,
  CustomTableHeaderRow: CustomTableHeaderRowPropType,
  customDataTypes: customDataTypesPropType
};

export default connect(
  null,
  mapDispatchToProps
)(DatatableInitializer);
