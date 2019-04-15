import React from "react";
import styled from "styled-components";
import { Checkbox } from "@material-ui/core";
import moment from "moment";

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);
const localeData = moment.localeData();
const dateFormat = localeData.longDateFormat("L");
const timeFormat = localeData.longDateFormat("LT");
const dateTimeFormat = localeData.longDateFormat("lll");

export const NumberWrapper = styled.div`
  text-align: center;
`;

export const NumberType = val => {
  const formatVal = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return <NumberWrapper>{formatVal}</NumberWrapper>;
};

export const TextWrapper = styled.div`
  text-align: left;
`;

export const TextType = val => {
  return <TextWrapper>{val}</TextWrapper>;
};

export const BooleanWrapper = styled.div`
  text-align: center;
`;

export const BooleanType = val => {
  return (
    <BooleanWrapper>
      <Checkbox checked={val} color="primary" disabled />
    </BooleanWrapper>
  );
};

export const DateWrapper = styled.div`
  text-align: left;
`;

export const DateType = val => {
  return <DateWrapper>{moment(val).format(dateFormat)}</DateWrapper>;
};

export const TimeWrapper = styled.div`
  text-align: left;
`;

export const TimeType = val => {
  return <TimeWrapper>{moment(val).format(timeFormat)}</TimeWrapper>;
};

export const DateTimeWrapper = styled.div`
  text-align: left;
`;

export const DateTimeType = val => {
  return (
    <DateTimeWrapper>{moment(val).format(dateTimeFormat)}</DateTimeWrapper>
  );
};
