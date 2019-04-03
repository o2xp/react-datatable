import React, { Component } from "react";
import { connect } from "react-redux";
import {
  initializeOptionsPropType,
  optionsPropType
} from "./proptypes/proptypes";
import DatatableBuilder from "./DatatableBuilder";
import { initializeOptions } from "../redux/actions/datatableActions";

class DatatableInitializer extends Component {
  constructor(props) {
    super(props);
    props.initializeOptions(props.optionsInit);
  }

  render() {
    return <DatatableBuilder />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeOptions: state => dispatch(initializeOptions(state))
  };
};

DatatableInitializer.propTypes = {
  initializeOptions: initializeOptionsPropType,
  optionsInit: optionsPropType
};

export default connect(
  null,
  mapDispatchToProps
)(DatatableInitializer);
