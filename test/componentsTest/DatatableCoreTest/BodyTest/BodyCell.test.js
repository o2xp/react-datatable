import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import { TableCell } from "@material-ui/core";
import BodyCell, {
  BodyCell as BodyCellPureComponent
} from "../../../../src/components/DatatableCore/Body/BodyCell";
import { storeSample } from "../../../../data/samples";
import {
  NumberType,
  TextType,
  BooleanType,
  DateType,
  TimeType,
  DateTimeType
} from "../../../../src/components/DatatableCore/CellTypes";

const mockStore = configureStore();
const store = mockStore(storeSample);

const cellValNumber = 50;
const cellValText = "This is some text.";
const cellValBoolean = true;
const cellValDateTime = "1972-09-04T18:09:59";
const cellValDefault = "By default this is text";
const cellValCustomIban = "LU020106768919913391";
const cellValCustomOverrideText = "This is some text cell has been overrided";

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
const columnCustomIban = { dataType: "iban", id: "iban", label: "iban" };
const columnCustomOverrideText = {
  dataType: "text",
  id: "overrideText",
  label: "overrideText"
};

const customDataTypes = [
  {
    dataType: "text",
    component: cellVal => (
      <TableCell>
        <div style={{ color: "purple" }}>{cellVal}</div>
      </TableCell>
    )
  },
  {
    dataType: "iban",
    component: cellVal => (
      <TableCell>
        <div style={{ color: "red" }}>{cellVal}</div>
      </TableCell>
    )
  }
];

describe("BodyCell component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <BodyCell column={columnText} cellVal={cellValText} />
      </Provider>
    );
    expect(wrapper.find("Connect(BodyCell)")).toHaveLength(1);
  });

  describe("should create a cell of type", () => {
    it("number", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValNumber}
          column={columnNumber}
          customDataTypes={[]}
        />
      );
      expect(wrapper.instance().buildCell()).toEqual(
        <TableCell>{NumberType(cellValNumber)}</TableCell>
      );
    });

    it("text", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValText}
          column={columnText}
          customDataTypes={[]}
        />
      );
      expect(wrapper.instance().buildCell()).toEqual(
        <TableCell>{TextType(cellValText)}</TableCell>
      );
    });

    it("boolean", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValBoolean}
          column={columnBoolean}
          customDataTypes={[]}
        />
      );
      expect(wrapper.instance().buildCell()).toEqual(
        <TableCell>{BooleanType(cellValBoolean)}</TableCell>
      );
    });

    it("date", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValDateTime}
          column={columnDate}
          customDataTypes={[]}
        />
      );
      expect(wrapper.instance().buildCell()).toEqual(
        <TableCell>{DateType(cellValDateTime)}</TableCell>
      );
    });

    it("time", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValDateTime}
          column={columnTime}
          customDataTypes={[]}
        />
      );
      expect(wrapper.instance().buildCell()).toEqual(
        <TableCell>{TimeType(cellValDateTime)}</TableCell>
      );
    });

    it("dateTime", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValDateTime}
          column={columnDateTime}
          customDataTypes={[]}
        />
      );
      expect(wrapper.instance().buildCell()).toEqual(
        <TableCell>{DateTimeType(cellValDateTime)}</TableCell>
      );
    });

    it("default", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValDefault}
          column={columnDefault}
          customDataTypes={[]}
        />
      );
      expect(wrapper.instance().buildCell()).toEqual(
        <TableCell>{TextType(cellValDefault)}</TableCell>
      );
    });

    it("custom iban", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValCustomIban}
          column={columnCustomIban}
          customDataTypes={customDataTypes}
        />
      );
      expect(wrapper.instance().buildCell()).toEqual(
        <TableCell>
          <div style={{ color: "red" }}>{cellValCustomIban}</div>
        </TableCell>
      );
    });

    it("custom override text", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValCustomOverrideText}
          column={columnCustomOverrideText}
          customDataTypes={customDataTypes}
        />
      );
      expect(wrapper.instance().buildCell()).toEqual(
        <TableCell>
          <div style={{ color: "purple" }}>{cellValCustomOverrideText}</div>
        </TableCell>
      );
    });
  });
});
