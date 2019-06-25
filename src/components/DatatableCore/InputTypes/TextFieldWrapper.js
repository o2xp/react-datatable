import React, { Component, Fragment } from "react";
import equal from "fast-deep-equal";
import {
  Tooltip,
  Zoom,
  withStyles,
  FormControl,
  Input
} from "@material-ui/core";
import MaskedInput from "react-text-mask";
import { checkValue, setValue } from "./PickersFunction";
import { customVariant } from "../../MuiTheme";
import {
  valueVerificationPropType,
  cellValPropType,
  classesPropType,
  maskPropType,
  typePropType
} from "../../../proptypes";

export class TextFieldWrapper extends Component {
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

  onValueChange = value => {
    const newState = setValue({
      ...this.props,
      value
    });
    if (!equal(this.state, newState)) {
      this.setState(newState);
    }
  };

  toggleTooltip = open => {
    const { error } = this.state;
    if (error) {
      this.setState({ tooltipOpen: open });
    }
  };

  textMaskCustom = properties => {
    const { inputRef, ...other } = properties;
    const { mask } = this.props;
    return (
      <Fragment>
        {(!mask || mask.length === 0) && (
          <input
            {...other}
            ref={ref => {
              inputRef(ref ? ref.inputElement : null);
            }}
          />
        )}
        {mask && mask.length > 0 && (
          <MaskedInput
            {...other}
            ref={ref => {
              inputRef(ref ? ref.inputElement : null);
            }}
            mask={mask}
            showMask
          />
        )}
      </Fragment>
    );
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
        <FormControl>
          <Input
            value={cellVal}
            error={error}
            onFocus={() => this.toggleTooltip(true)}
            onBlur={() => this.setState({ tooltipOpen: false })}
            onChange={e => this.onValueChange(e.target.value)}
            type={type}
            fullWidth
            inputComponent={this.textMaskCustom}
          />
        </FormControl>
      </Tooltip>
    );
  }
}

TextFieldWrapper.propTypes = {
  cellVal: cellValPropType.isRequired,
  classes: classesPropType.isRequired,
  type: typePropType.isRequired,
  mask: maskPropType,
  valueVerification: valueVerificationPropType
};

export default withStyles(customVariant)(TextFieldWrapper);
