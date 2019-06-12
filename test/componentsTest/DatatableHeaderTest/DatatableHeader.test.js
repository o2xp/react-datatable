import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import DatatableHeader from "../../../src/components/DatatableHeader/DatatableHeader";
import { storeSample } from "../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeSample);

describe("DatatableHeader component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DatatableHeader />
      </Provider>
    );
    expect(wrapper.find("Connect(DatatableHeader)")).toHaveLength(1);
  });

  describe("should render", () => {
    const wrapper = mount(
      <Provider store={store}>
        <DatatableHeader />
      </Provider>
    );

    it("a title", () => {
      expect(wrapper.find("div.title")).toHaveLength(1);
    });
  });
});
