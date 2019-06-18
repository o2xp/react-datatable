import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import BodyCell, {
  BodyCell as BodyCellPureComponent
} from "../../../../src/components/DatatableCore/Body/BodyCell";
import { storeSample } from "../../../../data/samples";

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

const setRowEdited = jest.fn();
const onClick = jest.fn();
const rowId = "5cd9307025f4f0572995990f";

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
          width={columnNumber.colSize}
          editing={false}
          setRowEdited={setRowEdited}
          rowId={rowId}
          customDataTypes={[]}
          onClick={onClick}
        />
      );

      const cell = wrapper.find(`div.Table-Cell.${columnNumber.id}`);
      expect(cell.exists()).toBeTruthy();
      cell.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("text", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValText}
          column={columnText}
          width={columnText.colSize}
          editing={false}
          setRowEdited={setRowEdited}
          rowId={rowId}
          customDataTypes={[]}
          onClick={onClick}
        />
      );

      const cell = wrapper.find(`div.Table-Cell.${columnText.id}`);
      expect(cell.exists()).toBeTruthy();
      cell.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("boolean", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValBoolean}
          column={columnBoolean}
          width={columnBoolean.colSize}
          editing={false}
          setRowEdited={setRowEdited}
          rowId={rowId}
          customDataTypes={[]}
          onClick={onClick}
        />
      );

      const cell = wrapper.find(`div.Table-Cell.${columnBoolean.id}`);
      expect(cell.exists()).toBeTruthy();
      cell.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("date", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValDateTime}
          column={columnDate}
          width={columnDate.colSize}
          editing={false}
          setRowEdited={setRowEdited}
          rowId={rowId}
          customDataTypes={[]}
          onClick={onClick}
        />
      );

      const cell = wrapper.find(`div.Table-Cell.${columnDate.id}`);
      expect(cell.exists()).toBeTruthy();
      cell.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("time", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValDateTime}
          column={columnTime}
          width={columnTime.colSize}
          editing={false}
          setRowEdited={setRowEdited}
          rowId={rowId}
          customDataTypes={[]}
          onClick={onClick}
        />
      );

      const cell = wrapper.find(`div.Table-Cell.${columnTime.id}`);
      expect(cell.exists()).toBeTruthy();
      cell.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("dateTime", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValDateTime}
          column={columnDateTime}
          width={columnDateTime.colSize}
          editing={false}
          setRowEdited={setRowEdited}
          rowId={rowId}
          customDataTypes={[]}
          onClick={onClick}
        />
      );

      const cell = wrapper.find(`div.Table-Cell.${columnDateTime.id}`);
      expect(cell.exists()).toBeTruthy();
      cell.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("default", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValDefault}
          column={columnDefault}
          width={columnDefault.colSize}
          editing={false}
          setRowEdited={setRowEdited}
          rowId={rowId}
          customDataTypes={[]}
          onClick={onClick}
        />
      );

      const cell = wrapper.find(`div.Table-Cell.${columnDefault.id}`);
      expect(cell.exists()).toBeTruthy();
      cell.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("custom iban", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValCustomIban}
          column={columnCustomIban}
          width={columnCustomIban.colSize}
          editing={false}
          setRowEdited={setRowEdited}
          rowId={rowId}
          customDataTypes={customDataTypes}
          onClick={onClick}
        />
      );

      const cell = wrapper.find(`div.Table-Cell.${columnCustomIban.id}`);
      expect(cell.exists()).toBeTruthy();
      cell.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("custom override text", () => {
      const wrapper = shallow(
        <BodyCellPureComponent
          cellVal={cellValCustomOverrideText}
          column={columnCustomOverrideText}
          width={columnCustomOverrideText.colSize}
          editing={false}
          setRowEdited={setRowEdited}
          rowId={rowId}
          customDataTypes={customDataTypes}
          onClick={onClick}
        />
      );

      const cell = wrapper.find(
        `div.Table-Cell.${columnCustomOverrideText.id}`
      );
      expect(cell.exists()).toBeTruthy();
      cell.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });
  });
});
