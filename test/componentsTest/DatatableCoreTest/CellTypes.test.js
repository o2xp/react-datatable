import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
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
const setRowEdited = jest.fn();
const properties = {
  editing: true,
  rowId: "5cd9307025f4f0572995990f",
  columnId: "name",
  values: ["John Doe", "Jahn Dae", "Jyhn Dye"],
  type: "text",
  setRowEdited: ({ rowId, columnId, newValue }) =>
    setRowEdited({ rowId, columnId, newValue })
};

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

  describe("without editing should render", () => {
    it("number", () => {
      const element = NumberType({ cellVal: 10000 });
      expect(element).toEqual(<NumberWrapper>10 000</NumberWrapper>);
    });

    it("text", () => {
      const element = TextType({ cellVal: "This is some text" });
      expect(element).toEqual(<TextWrapper>This is some text</TextWrapper>);
    });

    it("boolean", () => {
      const element = BooleanType({ cellVal: false });
      expect(element).toEqual(
        <BooleanWrapper>
          <Checkbox checked={false} color="primary" disabled />
        </BooleanWrapper>
      );
    });

    it("date", () => {
      const element = DateType({ cellVal: "1972-09-04T18:09:59" });
      expect(element).toEqual(
        <DateWrapper>
          {moment("1972-09-04T18:09:59").format(dateFormat)}
        </DateWrapper>
      );
    });

    it("time", () => {
      const element = TimeType({ cellVal: "1972-09-04T18:09:59" });
      expect(element).toEqual(
        <TimeWrapper>
          {moment("1972-09-04T18:09:59").format(timeFormat)}
        </TimeWrapper>
      );
    });

    it("dateTime", () => {
      const element = DateTimeType({ cellVal: "1972-09-04T18:09:59" });
      expect(element).toEqual(
        <DateTimeWrapper>
          {moment("1972-09-04T18:09:59").format(dateTimeFormat)}
        </DateTimeWrapper>
      );
    });
  });

  describe("with editing should return", () => {
    it("TextFieldWrapper on NumberType", () => {
      const wrapper = shallow(NumberType({ ...properties, cellVal: 50 }));
      expect(wrapper.find("TextFieldWrapper")).toHaveLength(1);
    });

    it("TextFieldWrapper on TextType", () => {
      const wrapper = shallow(
        TextType({ ...properties, cellVal: "This is some text" })
      );
      expect(wrapper.find("TextFieldWrapper")).toHaveLength(1);
    });

    it("Checkbox on BooleanType", () => {
      const wrapper = shallow(BooleanType({ ...properties, cellVal: true }));
      expect(wrapper.find("Checkbox")).toHaveLength(1);
    });

    it("DatePickerWrapper on DateType", () => {
      const wrapper = shallow(
        DateType({
          ...properties,
          cellVal: "1972-09-04T18:09:59"
        })
      );
      expect(wrapper.find("DatePickerWrapper")).toHaveLength(1);
    });

    it("TimePickerWrapper on TimeType", () => {
      const wrapper = shallow(
        TimeType({
          ...properties,
          cellVal: "1972-09-04T18:09:59"
        })
      );
      expect(wrapper.find("TimePickerWrapper")).toHaveLength(1);
    });

    it("DateTimePickerWrapper on DateTimeType", () => {
      const wrapper = shallow(
        DateTimeType({
          ...properties,
          cellVal: "1972-09-04T18:09:59"
        })
      );
      expect(wrapper.find("DateTimePickerWrapper")).toHaveLength(1);
    });
  });
});
