import React, { Component } from "react";
import { connect } from "react-redux";
import { throttle } from "lodash";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import theme from "./MuiTheme";
import {
  initializeOptionsPropType,
  initializeCustomComponentsPropType,
  updateComponentSizePropType,
  optionsPropType,
  CustomTableBodyRowPropType,
  CustomTableBodyCellPropType,
  CustomTableHeaderRowPropType,
  CustomTableHeaderCellPropType,
  customDataTypesPropType
} from "../proptypes";
import DatatableContainer from "./DatatableContainer";
import {
  initializeOptions as initializeOptionsAction,
  updateComponentSize as updateComponentSizeAction
} from "../redux/actions/datatableActions";
import initializeCustomComponentsAction from "../redux/actions/customComponentsActions";

export class DatatableInitializer extends Component {
  componentDidMount() {
    const {
      optionsInit,
      CustomTableBodyCell,
      CustomTableBodyRow,
      CustomTableHeaderCell,
      CustomTableHeaderRow,
      customDataTypes,
      updateComponentSize,
      initializeOptions,
      initializeCustomComponents
    } = this.props;

    initializeOptions(optionsInit);
    initializeCustomComponents({
      CustomTableBodyCell,
      CustomTableBodyRow,
      CustomTableHeaderCell,
      CustomTableHeaderRow,
      customDataTypes
    });
    updateComponentSize();

    window.addEventListener(
      "resize",
      throttle(() => updateComponentSize(), 100),
      false
    );
  }

  componentWillUnmount() {
    const { updateComponentSize } = this.props;
    window.removeEventListener("resize", () => updateComponentSize());
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatatableContainer />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeOptions: state => dispatch(initializeOptionsAction(state)),
    updateComponentSize: () => dispatch(updateComponentSizeAction()),
    initializeCustomComponents: state =>
      dispatch(initializeCustomComponentsAction(state))
  };
};

DatatableInitializer.propTypes = {
  initializeOptions: initializeOptionsPropType,
  initializeCustomComponents: initializeCustomComponentsPropType,
  updateComponentSize: updateComponentSizePropType,
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
