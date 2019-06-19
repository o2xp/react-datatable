import React, { Component } from "react";
import { connect } from "react-redux";
import { throttle } from "lodash";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { moment, locale } from "../moment.config";
import { mainTheme } from "./MuiTheme";
import {
  initializeOptionsPropType,
  initializeCustomComponentsPropType,
  updateComponentSizePropType,
  optionsPropType,
  forceRerenderPropType,
  actionsPropType,
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
      forceRerender,
      actions,
      CustomTableBodyCell,
      CustomTableBodyRow,
      CustomTableHeaderCell,
      CustomTableHeaderRow,
      customDataTypes,
      updateComponentSize,
      initializeOptions,
      initializeCustomComponents
    } = this.props;

    initializeOptions({ optionsInit, forceRerender, actions });
    initializeCustomComponents({
      CustomTableBodyCell,
      CustomTableBodyRow,
      CustomTableHeaderCell,
      CustomTableHeaderRow,
      customDataTypes
    });
    updateComponentSize();

    const callBack = () => throttle(() => updateComponentSize(), 100);
    window.addEventListener("resize", callBack());
  }

  componentWillUnmount() {
    const { updateComponentSize } = this.props;
    window.removeEventListener("resize", () => updateComponentSize());
  }

  render() {
    return (
      <MuiThemeProvider theme={mainTheme}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
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
  forceRerender: forceRerenderPropType,
  actions: actionsPropType,
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
