import React from "react";
import { shallow } from "enzyme";
import HeaderCell from "../../../../src/components/DatatableCore/Header/HeaderCell";
import {
  NumberWrapper,
  TextWrapper,
  BooleanWrapper,
  DateWrapper,
  TimeWrapper,
  DateTimeWrapper
} from "../../../../src/components/DatatableCore/CellTypes";

const columnNumber = { dataType: "number", id: "number", label: "number" };
const columnText = { dataType: "text", id: "text", label: "text" };
const columnBoolean = {
  dataType: "boolean",
  id: "boolean",
  label: "boolean"
};
const columnDate = { dataType: "date", id: "date", label: "date" };
const columnTime = { dataType: "time", id: "time", label: "time" };
const columnDateTime = {
  dataType: "dateTime",
  id: "dateTime",
  label: "dateTime"
};
const columnDefault = {
  dataType: "default",
  id: "default",
  label: "default"
};

describe("BodyCell component should create a cell of type", () => {
  it("number", () => {
    const wrapper = shallow(<HeaderCell column={columnNumber} />);
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <NumberWrapper>{columnNumber.label}</NumberWrapper>
    );
  });

  it("text", () => {
    const wrapper = shallow(<HeaderCell column={columnText} />);
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <TextWrapper>{columnText.label}</TextWrapper>
    );
  });

  it("boolean", () => {
    const wrapper = shallow(<HeaderCell column={columnBoolean} />);
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <BooleanWrapper>{columnBoolean.label}</BooleanWrapper>
    );
  });

  it("date", () => {
    const wrapper = shallow(<HeaderCell column={columnDate} />);
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <DateWrapper>{columnDate.label}</DateWrapper>
    );
  });

  it("time", () => {
    const wrapper = shallow(<HeaderCell column={columnTime} />);
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <TimeWrapper>{columnTime.label}</TimeWrapper>
    );
  });

  it("dateTime", () => {
    const wrapper = shallow(<HeaderCell column={columnDateTime} />);
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <DateTimeWrapper>{columnDateTime.label}</DateTimeWrapper>
    );
  });

  it("default", () => {
    const wrapper = shallow(<HeaderCell column={columnDefault} />);
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <TextWrapper>{columnDefault.label}</TextWrapper>
    );
  });
});
