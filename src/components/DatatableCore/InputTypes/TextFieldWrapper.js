import React, { Component, Fragment } from "react";
import equal from "fast-deep-equal";
import { TextField, Tooltip, Zoom, withStyles } from "@material-ui/core";
import { checkValue, setValue } from "./PickersFunction";
import { customVariant } from "../../MuiTheme";
import {
  valueVerificationPropType,
  cellValPropType,
  classesPropType,
  typePropType
} from "../../../proptypes";

class TextFieldWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
      message: "",
      error: false
    };
  }

  componentDidMount() {
    const { valueVerification } = this.props;
    if (valueVerification) {
      const newState = checkValue({
        ...this.props,
        mounting: true
      });
      if (!equal(this.state, newState)) {
        this.setState(newState);
      }
    }
  }

  onValueChange = e => {
    const { value } = e.target;
    const newState = setValue({
      ...this.props,
      value
    });
    if (!equal(this.state, newState)) {
      this.setState(newState);
    }
  };

  toggleCloseTooltip = open => {
    const { error } = this.state;
    if (error) {
      this.setState({ tooltipOpen: open });
    }
  };

  render() {
    const { type, cellVal, classes } = this.props;
    const { tooltipOpen, message, error } = this.state;

    return (
      <Tooltip
        open={tooltipOpen}
        classes={{
          tooltip: classes.errorTooltip
        }}
        title={message}
        TransitionComponent={Zoom}
        interactive
      >
        <Fragment>
          <TextField
            value={cellVal}
            error={error}
            onFocus={() => this.toggleCloseTooltip(true)}
            onBlur={() => this.setState({ tooltipOpen: false })}
            onChange={this.onValueChange}
            type={type}
            fullWidth
          />
        </Fragment>
      </Tooltip>
    );
  }
}

TextFieldWrapper.propTypes = {
  cellVal: cellValPropType.isRequired,
  classes: classesPropType.isRequired,
  type: typePropType.isRequired,
  valueVerification: valueVerificationPropType
};

export default withStyles(customVariant)(TextFieldWrapper);
