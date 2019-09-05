import React, { Component } from "react";
import equal from "fast-deep-equal";
import {
  ClickAwayListener,
  Tooltip,
  Zoom,
  IconButton,
  InputAdornment,
  withStyles
} from "@material-ui/core";
import { AccessTime as TimeIcon } from "@material-ui/icons";
import { TimePicker } from "material-ui-pickers";
import { checkValue, setValue } from "./PickersFunction";
import { customVariant } from "../../MuiTheme";
import { timeFormatUser } from "../../../moment.config";
import {
  valueVerificationPropType,
  cellValPropType,
  labelPropType,
  classesPropType,
  requiredPropType
} from "../../../proptypes";

export class TimePickerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      tooltipOpen: false,
      message: ""
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

  onDateChange = date => {
    const newState = setValue({
      ...this.props,
      date
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

  render() {
    const { cellVal, classes, label, required } = this.props;
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
        <ClickAwayListener onClickAway={() => this.toggleTooltip(false)}>
          <TimePicker
            required={required}
            label={label}
            clearable
            error={error}
            ampm={timeFormatUser[timeFormatUser.length - 1] === "A"}
            onOpen={() => this.setState({ tooltipOpen: false })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <TimeIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            helperText={null}
            value={cellVal === "" ? null : cellVal}
            onChange={this.onDateChange}
          />
        </ClickAwayListener>
      </Tooltip>
    );
  }
}

TimePickerWrapper.propTypes = {
  required: requiredPropType,
  label: labelPropType,
  classes: classesPropType.isRequired,
  cellVal: cellValPropType.isRequired,
  valueVerification: valueVerificationPropType
};

export default withStyles(customVariant)(TimePickerWrapper);
