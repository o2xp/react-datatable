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
import {
  initializeOptions,
  updateComponentSize
} from "../redux/actions/datatableActions";
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

  componentDidMount() {
    let timeout;
    const { props } = this;

    window.addEventListener(
      "resize",
      () => {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            props.updateComponentSize();
          }, 50);
        }
      },
      false
    );
  }

  componentWillUnmount() {
    const { props } = this;
    window.addEventListener("resize", () => props.updateComponentSize());
  }

  render() {
    return <DatatableContainer />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeOptions: state => dispatch(initializeOptions(state)),
    updateComponentSize: () => dispatch(updateComponentSize()),
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
