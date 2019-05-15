import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import BodyRow from "../../../../src/components/DatatableCore/Body/BodyRow";
import BodyCell from "../../../../src/components/DatatableCore/Body/BodyCell";
import {
  storeNoCustomComponentsSample,
  storeCustomTableBodyCellComponentSample
} from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeNoCustomComponentsSample);
const storeCustomComponent = mockStore(storeCustomTableBodyCellComponentSample);

const row = storeNoCustomComponentsSample.datatableReducer.data.rows[0];
const { columns } = storeNoCustomComponentsSample.datatableReducer.data;
const {
  columnsOrder
} = storeNoCustomComponentsSample.datatableReducer.features.userConfiguration;
const rowIndex = 0;
const style = { top: 0, height: "60px", position: "absolute" };

describe("BodyRow component", () => {
  it("connected should render without errors", () => {
    const rowWrapper = shallow(
      <Provider store={store}>
        <BodyRow
          row={row}
          columns={columns}
          columnsOrder={columnsOrder}
          rowIndex={rowIndex}
          style={style}
          CustomTableBodyCell={null}
        />
      </Provider>
    );
    expect(rowWrapper.find("Connect(BodyRow)")).toHaveLength(1);
  });

  describe("should create a row", () => {
    const rowWrapper = mount(
      <Provider store={store}>
        <BodyRow
          row={row}
          columns={columns}
          columnsOrder={columnsOrder}
          rowIndex={rowIndex}
          style={style}
          editing={false}
          CustomTableBodyCell={null}
        />
      </Provider>
    );

    it("of 8 cells", () => {
      expect(rowWrapper.find("div.Table-Cell")).toHaveLength(8);
    });

    it("with 6 cells containing data", () => {
      expect(rowWrapper.find(BodyCell)).toHaveLength(6);
    });

    it("with 1 empty cell", () => {
      expect(rowWrapper.find(".no-data").hostNodes()).toHaveLength(1);
    });
  });

  describe("should create a row with custom cell", () => {
    const rowWrapper = mount(
      <Provider store={storeCustomComponent}>
        <BodyRow
          row={row}
          columns={columns}
          columnsOrder={columnsOrder}
          rowIndex={rowIndex}
          style={style}
          editing={false}
          CustomTableBodyCell={null}
        />
      </Provider>
    );
    it("of 8 cells", () => {
      expect(rowWrapper.find("div.Table-Cell")).toHaveLength(8);
    });

    it("with 5 cells containing basic data", () => {
      expect(rowWrapper.find(".data").hostNodes()).toHaveLength(5);
    });

    it("with 1 empty cell", () => {
      expect(rowWrapper.find(".no-data").hostNodes()).toHaveLength(1);
    });

    it("with 1 cell containing boolean", () => {
      expect(rowWrapper.find(".data-boolean").hostNodes()).toHaveLength(1);
    });
  });
});
