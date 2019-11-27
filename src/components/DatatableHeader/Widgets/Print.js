import React, { Component } from "react";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import { Print as PrintIcon } from "@material-ui/icons";
import { connect } from "react-redux";
import { textPropType } from "../../../proptypes";

export class Print extends Component {
  print = () => {
    window.print();
  };

  render() {
    const { printText } = this.props;

    return (
      <Tooltip TransitionComponent={Zoom} title={printText}>
        <span>
          <IconButton className="print-icon" onClick={() => this.print()}>
            <PrintIcon color="primary" />
          </IconButton>
        </span>
      </Tooltip>
    );
  }
}

Print.propTypes = {
  printText: textPropType
};

const mapStateToProps = state => {
  return {
    printText: state.textReducer.print
  };
};

export default connect(mapStateToProps)(Print);
