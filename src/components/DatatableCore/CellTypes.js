import React from "react";
import styled from "styled-components";
import { Checkbox } from "@material-ui/core";
import moment from "moment";
import CreateInput from "./InputTypes/CreateInput";

export const NumberWrapper = styled.div`
  text-align: center;
`;

export const NumberType = properties => {
  const { cellVal, editing } = properties;
  const type = "number";
  if (editing) {
    return CreateInput({ ...properties, type });
  }

  return <NumberWrapper>{cellVal.toString()}</NumberWrapper>;
};

export const TextWrapper = styled.div`
  text-align: center;
`;

export const TextType = properties => {
  const { cellVal, editing } = properties;
  const type = "text";
  if (editing) {
    return CreateInput({ ...properties, type });
  }
  return <TextWrapper>{cellVal}</TextWrapper>;
};

export const BooleanWrapper = styled.div`
  text-align: center;
`;

export const BooleanType = properties => {
  const { editing, cellVal, inputType = "boolean" } = properties;
  if (editing) {
    return CreateInput({ ...properties, inputType });
  }
  return (
    <BooleanWrapper>
      <Checkbox checked={cellVal} color="primary" disabled />
    </BooleanWrapper>
  );
};

export const DateWrapper = styled.div`
  text-align: left;
`;

export const DateType = properties => {
  const {
    cellVal,
    editing,
    inputType = "datePicker",
    dateFormatIn,
    dateFormatOut
  } = properties;
  if (editing) {
    return CreateInput({
      ...properties,
      inputType
    });
  }

  return (
    <DateWrapper>
      {moment(cellVal, dateFormatIn).format(dateFormatOut)}
    </DateWrapper>
  );
};

export const TimeWrapper = styled.div`
  text-align: left;
`;

export const TimeType = properties => {
  const {
    cellVal,
    editing,
    inputType = "timePicker",
    dateFormatIn,
    dateFormatOut
  } = properties;
  if (editing) {
    return CreateInput({
      ...properties,
      inputType
    });
  }
  return (
    <TimeWrapper>
      {moment(cellVal, dateFormatIn).format(dateFormatOut)}
    </TimeWrapper>
  );
};

export const DateTimeWrapper = styled.div`
  text-align: left;
`;

export const DateTimeType = properties => {
  const {
    cellVal,
    editing,
    inputType = "dateTimePicker",
    dateFormatIn,
    dateFormatOut
  } = properties;
  if (editing) {
    return CreateInput({
      ...properties,
      inputType
    });
  }
  return (
    <DateTimeWrapper>
      {moment(cellVal, dateFormatIn).format(dateFormatOut)}
    </DateTimeWrapper>
  );
};
