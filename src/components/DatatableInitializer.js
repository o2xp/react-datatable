import React, { Component } from "react";
import { connect } from "react-redux";
import { throttle } from "lodash";
import equal from "fast-deep-equal";
import elementResizeEvent from "element-resize-event";
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
  strippedPropType,
  refreshRowsPropType,
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
      refreshRows,
      stripped,
      CustomTableBodyCell,
      CustomTableBodyRow,
      CustomTableHeaderCell,
      CustomTableHeaderRow,
      customDataTypes,
      updateComponentSize,
      initializeOptions,
      initializeCustomComponents
    } = this.props;

    initializeOptions({
      optionsInit,
      forceRerender,
      actions,
      refreshRows,
      stripped
    });
    initializeCustomComponents({
      CustomTableBodyCell,
      CustomTableBodyRow,
      CustomTableHeaderCell,
      CustomTableHeaderRow,
      customDataTypes
    });
    updateComponentSize();

    const callBack = () => throttle(() => updateComponentSize(), 100);
    const element = document.getElementById("o2xp").parentElement;

    elementResizeEvent(element, callBack());
  }

  shouldComponentUpdate(nextProps) {
    const {
      optionsInit,
      forceRerender,
      actions,
      refreshRows,
      stripped,
      initializeOptions
    } = nextProps;
    const { optionsInit: optionsInitProps } = this.props;
    const update = equal(optionsInit, optionsInitProps);

    if (!update) {
      initializeOptions({
        optionsInit,
        forceRerender,
        actions,
        refreshRows,
        stripped
      });
    }
    return !update;
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
  stripped: strippedPropType,
  refreshRows: refreshRowsPropType,
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
