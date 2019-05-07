import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import { Checkbox, TextField, Select, MenuItem } from "@material-ui/core";
import { DatePicker, TimePicker, DateTimePicker } from "material-ui-pickers";
import createInput from "./InputTypes";

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);
const localeData = moment.localeData();
const dateFormat = localeData.longDateFormat("L");
const timeFormat = localeData.longDateFormat("LT");
const dateTimeFormat = localeData.longDateFormat("lll");
const regMask = new RegExp("[a-zA-Z]");
const dateMask = dateFormat.split("").map(char => {
  if (regMask.test(char)) {
    return /\d/;
  }
  return char;
});

export const NumberWrapper = styled.div`
  text-align: center;
`;

export const NumberType = ({
  cellVal,
  editing,
  inputType = "input",
  values,
  valueVerification,
  rowId,
  columnId,
  setRowEdited
}) => {
  const type = "number";
  if (editing) {
    return createInput({
      cellVal,
      inputType,
      values,
      valueVerification,
      rowId,
      columnId,
      type,
      setRowEdited
    });
  }
  const formatVal = cellVal
    ? cellVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : cellVal;
  return <NumberWrapper>{formatVal}</NumberWrapper>;
};

export const TextWrapper = styled.div`
  text-align: left;
`;

export const TextType = ({
  cellVal,
  editing,
  inputType = "input",
  values,
  valueVerification,
  rowId,
  columnId,
  setRowEdited
}) => {
  const type = "text";
  if (editing) {
    return createInput({
      cellVal,
      inputType,
      values,
      valueVerification,
      rowId,
      columnId,
      type,
      setRowEdited
    });
  }
  return <TextWrapper>{cellVal}</TextWrapper>;
};

export const BooleanWrapper = styled.div`
  text-align: center;
`;

export const BooleanType = ({
  cellVal,
  editing,
  rowId,
  columnId,
  setRowEdited
}) => {
  return (
    <BooleanWrapper>
      <Checkbox
        checked={cellVal}
        color="primary"
        disabled={!editing}
        onChange={(e, checked) =>
          setRowEdited({ rowId, columnId, newValue: checked })
        }
      />
    </BooleanWrapper>
  );
};

export const DateWrapper = styled.div`
  text-align: left;
`;

export const DateType = ({
  cellVal,
  editing,
  inputType = "datePicker",
  values,
  valueVerification,
  rowId,
  columnId,
  setRowEdited
}) => {
  const format = dateFormat;
  if (editing) {
    return createInput({
      cellVal,
      inputType,
      values,
      valueVerification,
      rowId,
      columnId,
      setRowEdited,
      format,
      dateMask
    });
  }

  return (
    <DateWrapper>
      {cellVal !== "" ? moment(cellVal).format(format) : cellVal}
    </DateWrapper>
  );
};

export const TimeWrapper = styled.div`
  text-align: left;
`;

export const TimeType = ({
  cellVal,
  editing,
  inputType = "timePicker",
  values,
  valueVerification,
  rowId,
  columnId,
  setRowEdited
}) => {
  const format = timeFormat;
  if (editing) {
    return createInput({
      cellVal,
      inputType,
      values,
      valueVerification,
      rowId,
      columnId,
      setRowEdited,
      format
    });
  }
  return (
    <TimeWrapper>
      {cellVal ? moment(cellVal).format(format) : cellVal}
    </TimeWrapper>
  );
};

export const DateTimeWrapper = styled.div`
  text-align: left;
`;

export const DateTimeType = ({
  cellVal,
  editing,
  inputType = "dateTimePicker",
  values,
  valueVerification,
  rowId,
  columnId,
  setRowEdited
}) => {
  const format = dateTimeFormat;
  if (editing) {
    return createInput({
      cellVal,
      inputType,
      values,
      valueVerification,
      rowId,
      columnId,
      setRowEdited,
      format
    });
  }
  return (
    <DateTimeWrapper>
      {cellVal ? moment(cellVal).format(format) : cellVal}
    </DateTimeWrapper>
  );
};
