import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Body from "../../../src/components/DatatableCore/Body";
import { storeSample } from "../../data/samples";

describe("Body component", () => {
  const mockStore = configureStore();
  beforeEach(() => {});
  it("should render without errors", () => {
    const store = mockStore(storeSample);
    const tree = renderer
      .create(
        <Provider store={store}>
          <Body />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
