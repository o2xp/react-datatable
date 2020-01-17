import React, { Component, Fragment } from "react";
import equal from "fast-deep-equal";
import {
  Tooltip,
  Zoom,
  withStyles,
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";
import MaskedInput from "react-text-mask";
import { checkValue, setValue } from "./PickersFunction";
import { customVariant } from "../../MuiTheme";
import {
  valueVerificationPropType,
  cellValPropType,
  classesPropType,
  maskPropType,
  labelPropType,
  typePropType,
  requiredPropType
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
    const newValue = value.length > 0 ? value : null;
    const newState = setValue({
      ...this.props,
      value: newValue
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
    const { type, cellVal, classes, label, required } = this.props;
    const { tooltipOpen, message, error } = this.state;
    const inputValue =
      type === "number" && !cellVal && cellVal !== 0 ? "" : cellVal;

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
        <FormControl required={required}>
          <InputLabel>{label}</InputLabel>
          <Input
            value={inputValue}
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
  required: requiredPropType,
  label: labelPropType,
  cellVal: cellValPropType,
  classes: classesPropType.isRequired,
  type: typePropType.isRequired,
  mask: maskPropType,
  valueVerification: valueVerificationPropType
};

export default withStyles(customVariant)(TextFieldWrapper);
