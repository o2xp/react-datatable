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

const columnNumber = {
  dataType: "number",
  id: "number",
  label: "number",
  colSize: "70px"
};
const columnText = {
  dataType: "text",
  id: "text",
  label: "text",
  colSize: "250px"
};
const columnBoolean = {
  dataType: "boolean",
  id: "boolean",
  label: "boolean",
  colSize: "100px"
};
const columnDate = {
  dataType: "date",
  id: "date",
  label: "date",
  colSize: "120px"
};
const columnTime = {
  dataType: "time",
  id: "time",
  label: "time",
  colSize: "110px"
};
const columnDateTime = {
  dataType: "dateTime",
  id: "dateTime",
  label: "dateTime",
  colSize: "165px"
};
const columnDefault = {
  dataType: "default",
  id: "default",
  label: "default",
  colSize: "250px"
};

describe("BodyCell component should create a cell of type", () => {
  it("number", () => {
    const wrapper = shallow(
      <HeaderCell
        column={columnNumber}
        width={columnNumber.colSize}
        index={0}
      />
    );
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <NumberWrapper style={{ width: columnNumber.colSize }}>
        {columnNumber.label}
      </NumberWrapper>
    );
  });

  it("text", () => {
    const wrapper = shallow(
      <HeaderCell column={columnText} width={columnText.colSize} index={0} />
    );
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <TextWrapper style={{ width: columnText.colSize }}>
        {columnText.label}
      </TextWrapper>
    );
  });

  it("boolean", () => {
    const wrapper = shallow(
      <HeaderCell
        column={columnBoolean}
        width={columnBoolean.colSize}
        index={0}
      />
    );
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <BooleanWrapper style={{ width: columnBoolean.colSize }}>
        {columnBoolean.label}
      </BooleanWrapper>
    );
  });

  it("date", () => {
    const wrapper = shallow(
      <HeaderCell column={columnDate} width={columnDate.colSize} index={0} />
    );
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <DateWrapper style={{ width: columnDate.colSize }}>
        {columnDate.label}
      </DateWrapper>
    );
  });

  it("time", () => {
    const wrapper = shallow(
      <HeaderCell column={columnTime} width={columnTime.colSize} index={0} />
    );
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <TimeWrapper style={{ width: columnTime.colSize }}>
        {columnTime.label}
      </TimeWrapper>
    );
  });

  it("dateTime", () => {
    const wrapper = shallow(
      <HeaderCell
        column={columnDateTime}
        width={columnDateTime.colSize}
        index={0}
      />
    );
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <DateTimeWrapper style={{ width: columnDateTime.colSize }}>
        {columnDateTime.label}
      </DateTimeWrapper>
    );
  });

  it("default", () => {
    const wrapper = shallow(
      <HeaderCell
        column={columnDefault}
        width={columnDefault.colSize}
        index={0}
      />
    );
    expect(wrapper.instance().buildHeaderCell()).toEqual(
      <TextWrapper style={{ width: columnDefault.colSize }}>
        {columnDefault.label}
      </TextWrapper>
    );
  });
});
