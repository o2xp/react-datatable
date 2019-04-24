import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import twidth from "text-width";
import { Tooltip, Zoom } from "@material-ui/core";
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
const columnCustomIban = {
  dataType: "iban",
  id: "iban",
  label: "iban",
  colSize: "350px"
};
const columnCustomOverrideText = {
  dataType: "text",
  id: "overrideText",
  label: "overrideText",
  colSize: "150px"
};

const customDataTypes = [
  {
    dataType: "text",
    component: cellVal => <div style={{ color: "purple" }}>{cellVal}</div>
  },
  {
    dataType: "iban",
    component: cellVal => <div style={{ color: "red" }}>{cellVal}</div>
  }
];

describe("BodyCell component", () => {
  it("connected should render without errors", () => {
    const cell = shallow(
      <Provider store={store}>
        <BodyCell column={columnText} cellVal={cellValText} />
      </Provider>
    );
    expect(cell.find("Connect(BodyCell)")).toHaveLength(1);
  });

  describe("should create a cell of type", () => {
    it("number", () => {
      const cell = shallow(
        <BodyCellPureComponent
          cellVal={cellValNumber}
          column={columnNumber}
          width={columnNumber.colSize}
          customDataTypes={[]}
        />
      );

      const textWidth = twidth(cellValNumber, {
        family: "Arial",
        size: 15
      });
      const overlap =
        textWidth - 5 > Number(columnNumber.colSize.split("px")[0]);

      expect(cell.instance().buildCell()).toEqual(
        <Tooltip
          title={overlap ? cellValNumber : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width: columnNumber.colSize }}>
            {NumberType(cellValNumber)}
          </div>
        </Tooltip>
      );
    });

    it("text", () => {
      const cell = shallow(
        <BodyCellPureComponent
          cellVal={cellValText}
          column={columnText}
          width={columnText.colSize}
          customDataTypes={[]}
        />
      );

      const textWidth = twidth(cellValText, {
        family: "Arial",
        size: 15
      });
      const overlap = textWidth - 5 > Number(columnText.colSize.split("px")[0]);

      expect(cell.instance().buildCell()).toEqual(
        <Tooltip
          title={overlap ? cellValText : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width: columnText.colSize }}>
            {TextType(cellValText)}
          </div>
        </Tooltip>
      );
    });

    it("boolean", () => {
      const cell = shallow(
        <BodyCellPureComponent
          cellVal={cellValBoolean}
          column={columnBoolean}
          width={columnBoolean.colSize}
          customDataTypes={[]}
        />
      );

      const textWidth = twidth(cellValBoolean, {
        family: "Arial",
        size: 15
      });
      const overlap =
        textWidth - 5 > Number(columnBoolean.colSize.split("px")[0]);

      expect(cell.instance().buildCell()).toEqual(
        <Tooltip
          title={overlap ? cellValBoolean : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width: columnBoolean.colSize }}>
            {BooleanType(cellValBoolean)}
          </div>
        </Tooltip>
      );
    });

    it("date", () => {
      const cell = shallow(
        <BodyCellPureComponent
          cellVal={cellValDateTime}
          column={columnDate}
          width={columnDate.colSize}
          customDataTypes={[]}
        />
      );

      const textWidth = twidth(cellValDateTime, {
        family: "Arial",
        size: 15
      });
      const overlap = textWidth - 5 > Number(columnDate.colSize.split("px")[0]);

      expect(cell.instance().buildCell()).toEqual(
        <Tooltip
          title={overlap ? cellValDateTime : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width: columnDate.colSize }}>
            {DateType(cellValDateTime)}
          </div>
        </Tooltip>
      );
    });

    it("time", () => {
      const cell = shallow(
        <BodyCellPureComponent
          cellVal={cellValDateTime}
          column={columnTime}
          width={columnTime.colSize}
          customDataTypes={[]}
        />
      );

      const textWidth = twidth(cellValDateTime, {
        family: "Arial",
        size: 15
      });
      const overlap = textWidth - 5 > Number(columnTime.colSize.split("px")[0]);

      expect(cell.instance().buildCell()).toEqual(
        <Tooltip
          title={overlap ? cellValDateTime : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width: columnTime.colSize }}>
            {TimeType(cellValDateTime)}
          </div>
        </Tooltip>
      );
    });

    it("dateTime", () => {
      const cell = shallow(
        <BodyCellPureComponent
          cellVal={cellValDateTime}
          column={columnDateTime}
          width={columnDateTime.colSize}
          customDataTypes={[]}
        />
      );

      const textWidth = twidth(cellValDateTime, {
        family: "Arial",
        size: 15
      });
      const overlap =
        textWidth - 5 > Number(columnDateTime.colSize.split("px")[0]);

      expect(cell.instance().buildCell()).toEqual(
        <Tooltip
          title={overlap ? cellValDateTime : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width: columnDateTime.colSize }}>
            {DateTimeType(cellValDateTime)}
          </div>
        </Tooltip>
      );
    });

    it("default", () => {
      const cell = shallow(
        <BodyCellPureComponent
          cellVal={cellValDefault}
          column={columnDefault}
          width={columnDefault.colSize}
          customDataTypes={[]}
        />
      );

      const textWidth = twidth(cellValDefault, {
        family: "Arial",
        size: 15
      });
      const overlap =
        textWidth - 5 > Number(columnDefault.colSize.split("px")[0]);

      expect(cell.instance().buildCell()).toEqual(
        <Tooltip
          title={overlap ? cellValDefault : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width: columnDefault.colSize }}>
            {TextType(cellValDefault)}
          </div>
        </Tooltip>
      );
    });

    it("custom iban", () => {
      const cell = shallow(
        <BodyCellPureComponent
          cellVal={cellValCustomIban}
          column={columnCustomIban}
          width={columnCustomIban.colSize}
          customDataTypes={customDataTypes}
        />
      );

      const textWidth = twidth(cellValCustomIban, {
        family: "Arial",
        size: 15
      });
      const overlap =
        textWidth - 5 > Number(columnCustomIban.colSize.split("px")[0]);

      expect(cell.instance().buildCell()).toEqual(
        <Tooltip
          title={overlap ? cellValCustomIban : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width: columnCustomIban.colSize }}>
            <div style={{ color: "red" }}>{cellValCustomIban}</div>
          </div>
        </Tooltip>
      );
    });

    it("custom override text", () => {
      const cell = shallow(
        <BodyCellPureComponent
          cellVal={cellValCustomOverrideText}
          column={columnCustomOverrideText}
          width={columnCustomOverrideText.colSize}
          customDataTypes={customDataTypes}
        />
      );

      const textWidth = twidth(cellValCustomOverrideText, {
        family: "Arial",
        size: 15
      });
      const overlap =
        textWidth - 5 > Number(columnCustomOverrideText.colSize.split("px")[0]);

      expect(cell.instance().buildCell()).toEqual(
        <Tooltip
          title={overlap ? cellValCustomOverrideText : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width: columnCustomOverrideText.colSize }}>
            <div style={{ color: "purple" }}>{cellValCustomOverrideText}</div>
          </div>
        </Tooltip>
      );
    });
  });
});
