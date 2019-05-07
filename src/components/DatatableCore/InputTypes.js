import React, { Component, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import {
  Checkbox,
  ClickAwayListener,
  TextField,
  Select,
  MenuItem,
  Tooltip,
  Zoom,
  withStyles
} from "@material-ui/core";
import { DatePicker, TimePicker, DateTimePicker } from "material-ui-pickers";

const createSelect = ({
  type,
  cellVal,
  valueVerification,
  rowId,
  columnId,
  setRowEdited,
  values,
  format
}) => {
  return (
    <Select
      fullWidth
      value={cellVal}
      onChange={e =>
        setRowEdited({ rowId, columnId, newValue: e.target.value })
      }
    >
      {values.map((cellVal, i) => {
        return (
          <MenuItem key={`${i}-${cellVal}`} value={cellVal}>
            {format ? moment(cellVal).format(format) : cellVal}
          </MenuItem>
        );
      })}
    </Select>
  );
};

class CreateTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
      message: "",
      error: false
    };
  }

  change = e => {
    const {
      type,
      cellVal,
      valueVerification,
      rowId,
      columnId,
      setRowEdited,
      values,
      format
    } = this.props;
    const res = valueVerification
      ? valueVerification(e.target.value)
      : { error: false, message: "" };
    this.setState({
      message: res.message,
      error: res.error,
      tooltipOpen: res.error
    });
    setRowEdited({ rowId, columnId, newValue: e.target.value });
  };

  checkForError = () => {
    const { error } = this.state;
    if (error) {
      this.setState({ tooltipOpen: true });
    }
  };

  render() {
    const {
      type,
      cellVal,
      valueVerification,
      rowId,
      columnId,
      setRowEdited,
      values,
      format
    } = this.props;

    const { tooltipOpen, message, error, classes } = this.state;
    return (
      <Tooltip
        open={tooltipOpen}
        classes={{
          tooltip: classes.lightTooltip
        }}
        title={message}
        TransitionComponent={Zoom}
        interactive
      >
        <TextField
          value={cellVal}
          error={error}
          onFocus={this.checkForError}
          onBlur={() => this.setState({ tooltipOpen: false })}
          onChange={this.change}
          type={type}
          fullWidth
        />
      </Tooltip>
    );
  }
}

const styles = theme => ({
  lightTooltip: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11
  }
});

const T = withStyles(styles)(CreateTextField);

const createInput = ({
  cellVal,
  valueVerification,
  rowId,
  columnId,
  setRowEdited,
  values,
  format,
  type = "text",
  dateMask,
  inputType
}) => {
  switch (inputType) {
    case "input":
      return (
        <T
          cellVal={cellVal}
          inputType={inputType}
          type={type}
          values={values}
          valueVerification={valueVerification}
          rowId={rowId}
          columnId={columnId}
          setRowEdited={setRowEdited}
        />
      );

    case "select":
      return createSelect({
        cellVal,
        inputType,
        values,
        valueVerification,
        rowId,
        columnId,
        setRowEdited
      });
    case "datePicker":
      return (
        <DatePicker
          showTodayButton
          clearable
          keyboard
          autoOk
          helperText={null}
          format={format}
          value={cellVal === "" ? null : cellVal}
          onChange={date =>
            setDate({
              rowId,
              columnId,
              date,
              setRowEdited
            })
          }
        />
      );
    case "timePicker":
      return (
        <TimePicker
          keyboard
          clearable
          format={format}
          value={cellVal}
          onChange={e => console.log(e.target.value)}
        />
      );
    case "dateTimePicker":
      return (
        <DateTimePicker
          keyboard
          clearable
          format={format}
          value={cellVal}
          onChange={e => console.log(e.target.value)}
        />
      );
    default:
      return createTextField({
        cellVal,
        inputType,
        values,
        type,
        valueVerification,
        rowId,
        columnId,
        setRowEdited
      });
  }
};

const setDate = ({ date, format, rowId, columnId, setRowEdited }) => {
  setRowEdited({
    rowId,
    columnId,
    newValue: date ? date.format("YYYY-MM-DDTHH:MM:ss") : ""
  });
};

export default createInput;
