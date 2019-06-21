import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { shallow, mount } from "enzyme";
import DatatableContainer from "../../src/components/DatatableContainer";
import Header from "../../src/components/DatatableCore/Header/Header";
import Body from "../../src/components/DatatableCore/Body/Body";
import DatatableFooter from "../../src/components/DatatableFooter/DatatableFooter";
import {
  storeSample,
  storeNoDataSample,
  storeNoRowsDataSample
} from "../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeSample);
const storeNoData = mockStore(storeNoDataSample);
const storeNoRowsData = mockStore(storeNoRowsDataSample);
const refreshRows = jest.fn();
describe("Datatable container component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SnackbarProvider>
          <DatatableContainer refreshRows={refreshRows} />
        </SnackbarProvider>
      </Provider>
    );
    expect(wrapper.find("Connect(DatatableContainer)")).toHaveLength(1);
  });

  describe("when you have data should create a table", () => {
    const wrapper = mount(
      <Provider store={store}>
        <SnackbarProvider>
          <DatatableContainer refreshRows={refreshRows} />
        </SnackbarProvider>
      </Provider>
    );

    it("without errors", () => {
      expect(wrapper.find("div.Table")).toHaveLength(1);
    });

    it("with a Header", () => {
      expect(wrapper.find(Header)).toHaveLength(1);
    });

    it("with a Body", () => {
      expect(wrapper.find(Body)).toHaveLength(1);
    });

    it("and a Footer", () => {
      expect(wrapper.find(DatatableFooter)).toHaveLength(1);
    });
  });

  describe("when you don't have rows data should create a table", () => {
    const wrapperNoRowsData = mount(
      <Provider store={storeNoRowsData}>
        <SnackbarProvider>
          <DatatableContainer refreshRows={refreshRows} />
        </SnackbarProvider>
      </Provider>
    );

    it("with a Header", () => {
      expect(wrapperNoRowsData.find(Header)).toHaveLength(1);
    });

    it("without a Body", () => {
      expect(wrapperNoRowsData.find(Body)).toHaveLength(0);
    });

    it("with a div telling no data", () => {
      expect(wrapperNoRowsData.find("div#no-rows").hostNodes()).toHaveLength(1);
    });
  });

  describe("when you don't have data should create a table", () => {
    const wrapperNoData = mount(
      <Provider store={storeNoData}>
        <SnackbarProvider>
          <DatatableContainer refreshRows={refreshRows} />
        </SnackbarProvider>
      </Provider>
    );

    it("without Header", () => {
      expect(wrapperNoData.find(Header)).toHaveLength(0);
    });

    it("without Body", () => {
      expect(wrapperNoData.find(Body)).toHaveLength(0);
    });

    it("with a div telling no data", () => {
      expect(wrapperNoData.find("div#no-rows").hostNodes()).toHaveLength(1);
    });

    it("and a Footer", () => {
      expect(wrapperNoData.find(DatatableFooter)).toHaveLength(1);
    });
  });
});
