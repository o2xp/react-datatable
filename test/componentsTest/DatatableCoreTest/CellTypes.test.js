import React from "react";
import renderer from "react-test-renderer";
import moment from "moment";
import { Checkbox } from "@material-ui/core";
import {
  NumberWrapper,
  NumberType,
  TextWrapper,
  TextType,
  BooleanWrapper,
  BooleanType,
  DateWrapper,
  DateType,
  TimeWrapper,
  TimeType,
  DateTimeWrapper,
  DateTimeType
} from "../../../src/components/DatatableCore/CellTypes";
import "jest-styled-components";

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);
const localeData = moment.localeData();
const dateFormat = localeData.longDateFormat("L");
const timeFormat = localeData.longDateFormat("LT");
const dateTimeFormat = localeData.longDateFormat("lll");

describe("Cell type", () => {
  describe("wrapper should applies default style to", () => {
    it("number", () => {
      const tree = renderer.create(<NumberWrapper />).toJSON();
      expect(tree).toHaveStyleRule("text-align", "center");
    });

    it("text", () => {
      const tree = renderer.create(<TextWrapper />).toJSON();
      expect(tree).toHaveStyleRule("text-align", "left");
    });

    it("boolean", () => {
      const tree = renderer.create(<BooleanWrapper />).toJSON();
      expect(tree).toHaveStyleRule("text-align", "center");
    });

    it("date", () => {
      const tree = renderer.create(<DateWrapper />).toJSON();
      expect(tree).toHaveStyleRule("text-align", "left");
    });

    it("time", () => {
      const tree = renderer.create(<TimeWrapper />).toJSON();
      expect(tree).toHaveStyleRule("text-align", "left");
    });

    it("dateTime", () => {
      const tree = renderer.create(<DateTimeWrapper />).toJSON();
      expect(tree).toHaveStyleRule("text-align", "left");
    });
  });

  describe("should render", () => {
    it("number", () => {
      const element = NumberType(10000);
      expect(element).toEqual(<NumberWrapper>10 000</NumberWrapper>);
    });

    it("text", () => {
      const element = TextType("This is some text");
      expect(element).toEqual(<TextWrapper>This is some text</TextWrapper>);
    });

    it("boolean", () => {
      const element = BooleanType(false);
      expect(element).toEqual(
        <BooleanWrapper>
          <Checkbox checked={false} color="primary" disabled />
        </BooleanWrapper>
      );
    });

    it("date", () => {
      const element = DateType("1972-09-04T18:09:59");
      expect(element).toEqual(
        <DateWrapper>
          {moment("1972-09-04T18:09:59").format(dateFormat)}
        </DateWrapper>
      );
    });

    it("time", () => {
      const element = TimeType("1972-09-04T18:09:59");
      expect(element).toEqual(
        <TimeWrapper>
          {moment("1972-09-04T18:09:59").format(timeFormat)}
        </TimeWrapper>
      );
    });

    it("dateTime", () => {
      const element = DateTimeType("1972-09-04T18:09:59");
      expect(element).toEqual(
        <DateTimeWrapper>
          {moment("1972-09-04T18:09:59").format(dateTimeFormat)}
        </DateTimeWrapper>
      );
    });
  });
});
