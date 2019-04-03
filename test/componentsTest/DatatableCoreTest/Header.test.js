import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Header from "../../../src/components/DatatableCore/Header";
import { storeSample } from "../../data/samples";

describe("Header component", () => {
  const mockStore = configureStore();
  beforeEach(() => {});
  it("should render without errors", () => {
    const store = mockStore(storeSample);
    const tree = renderer
      .create(
        <Provider store={store}>
          <Header />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
