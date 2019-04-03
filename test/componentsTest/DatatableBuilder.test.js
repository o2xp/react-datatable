import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { storeSample, storeNoDataSample } from "../data/samples";
import DatatableBuilder from "../../src/components/DatatableBuilder";

describe("DatatableBuilder component", () => {
  const mockStore = configureStore();
  beforeEach(() => {});
  it("should render without errors", () => {
    const store = mockStore(storeSample);
    const tree = renderer.create(
      <Provider store={store}>
        <DatatableBuilder />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should render without errors", () => {
    const store = mockStore(storeNoDataSample);
    const tree = renderer.create(
      <Provider store={store}>
        <DatatableBuilder />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
