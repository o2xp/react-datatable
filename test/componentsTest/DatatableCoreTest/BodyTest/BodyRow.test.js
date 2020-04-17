import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import BodyRow, {
  BodyRow as BodyRowPureComponent
} from "../../../../src/components/DatatableCore/Body/BodyRow";
import BodyCell from "../../../../src/components/DatatableCore/Body/BodyCell";
import {
  storeNoCustomComponentsSample,
  storeCustomTableBodyCellComponentSample
} from "../../../../data/samples";
import { moment, locale } from "../../../../src/moment.config";

const mockStore = configureStore();
const store = mockStore({
  ...storeNoCustomComponentsSample,
  datatableReducer: {
    ...storeNoCustomComponentsSample.datatableReducer,
    features: {
      ...storeNoCustomComponentsSample.datatableReducer.features,
      userConfiguration: {
        ...storeNoCustomComponentsSample.datatableReducer.features
          .userConfiguration,
        copyToClipboard: true
      }
    }
  }
});
const storeCustomComponent = mockStore(storeCustomTableBodyCellComponentSample);

const row = storeNoCustomComponentsSample.datatableReducer.data.rows[0];
const { keyColumn } = storeNoCustomComponentsSample.datatableReducer;
const { columns } = storeNoCustomComponentsSample.datatableReducer.data;
const {
  columnsOrder
} = storeNoCustomComponentsSample.datatableReducer.features.userConfiguration;
const style = { top: 0, height: "33px", position: "absolute" };
const {
  CustomTableBodyCell
} = storeCustomTableBodyCellComponentSample.customComponentsReducer;

describe("BodyRow component", () => {
  it("connected should render without errors", () => {
    const rowWrapper = shallow(
      <Provider store={store}>
        <BodyRow row={row} style={style} editing={false} />
      </Provider>
    );
    expect(rowWrapper.find("Connect(BodyRow)")).toHaveLength(1);
  });

  describe("should create a row", () => {
    const rowWrapper = mount(
      <Provider store={store}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <BodyRow row={row} style={style} editing={false} />
        </MuiPickersUtilsProvider>
      </Provider>
    );

    rowWrapper
      .find(BodyCell)
      .first()
      .simulate("click");

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

  describe("should create edited row", () => {
    const rowWrapper = mount(
      <Provider store={store}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <BodyRow row={row} style={style} editing />
        </MuiPickersUtilsProvider>
      </Provider>
    );

    rowWrapper
      .find(BodyCell)
      .first()
      .simulate("click");

    it("of 8 cells", () => {
      expect(rowWrapper.find("div.Table-Cell")).toHaveLength(8);
    });

    it("with 6 cells input", () => {
      expect(rowWrapper.find(BodyCell)).toHaveLength(6);
    });
  });

  describe("should create a row with custom cell", () => {
    const rowWrapper = mount(
      <Provider store={storeCustomComponent}>
        <BodyRow row={row} style={style} editing={false} />
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

  describe("click on cell should", () => {
    const enqueueSnackbar = jest.fn();
    const rowWrapper = shallow(
      <BodyRowPureComponent
        row={row}
        columns={columns}
        columnsOrder={columnsOrder}
        rowsSelected={[]}
        style={style}
        editing={false}
        columnSizeMultiplier={1}
        keyColumn={keyColumn}
        copyToClipboard
        enqueueSnackbar={enqueueSnackbar}
        CustomTableBodyCell={null}
      />
    );

    const spy = jest.spyOn(rowWrapper.instance(), "copyToClipboardFunction");
    rowWrapper
      .find(BodyCell)
      .first()
      .simulate("click");

    it("call copyToClipboard", () => {
      expect(spy).toHaveBeenCalled();
    });

    it("dispatch enqueueSnackbar", () => {
      expect(enqueueSnackbar).toHaveBeenCalled();
    });
  });

  describe("click on cell without copy to clipboard should", () => {
    const enqueueSnackbar = jest.fn();
    const rowWrapper = shallow(
      <BodyRowPureComponent
        row={row}
        columns={columns}
        columnsOrder={columnsOrder}
        rowsSelected={[]}
        style={style}
        editing={false}
        columnSizeMultiplier={1}
        keyColumn={keyColumn}
        copyToClipboard={false}
        enqueueSnackbar={enqueueSnackbar}
        CustomTableBodyCell={null}
      />
    );

    const spy = jest.spyOn(rowWrapper.instance(), "copyToClipboardFunction");
    rowWrapper
      .find(BodyCell)
      .first()
      .simulate("click");

    it("call copyToClipboard", () => {
      expect(spy).toHaveBeenCalled();
    });

    it("not dispatch enqueueSnackbar", () => {
      expect(enqueueSnackbar).toHaveBeenCalledTimes(0);
    });
  });

  describe("click on custom cell should", () => {
    const enqueueSnackbar = jest.fn();
    const rowWrapper = shallow(
      <BodyRowPureComponent
        row={row}
        columns={columns}
        columnsOrder={columnsOrder}
        rowsSelected={[]}
        style={style}
        editing={false}
        columnSizeMultiplier={1}
        keyColumn={keyColumn}
        copyToClipboard
        enqueueSnackbar={enqueueSnackbar}
        CustomTableBodyCell={CustomTableBodyCell}
      />
    );

    const spy = jest.spyOn(rowWrapper.instance(), "copyToClipboardFunction");
    rowWrapper
      .find(CustomTableBodyCell)
      .first()
      .simulate("click");

    it("call copyToClipboard", () => {
      expect(spy).toHaveBeenCalled();
    });

    it("dispatch enqueueSnackbar", () => {
      expect(enqueueSnackbar).toHaveBeenCalled();
    });
  });
});
