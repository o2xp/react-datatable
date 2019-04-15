import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import DatatableContainer from "../../src/components/DatatableContainer";
import DatatableInitializer from "../../src/components/DatatableInitializer";
import { storeSample, simpleOptionsSample } from "../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeSample);

describe("Datatable initializer component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DatatableInitializer />
      </Provider>
    );
    expect(wrapper.find("Connect(DatatableInitializer)")).toHaveLength(1);
  });

  it("should render DatatableInitializer component", () => {
    const wrapper = mount(
      <Provider store={store}>
        <DatatableInitializer optionsInit={simpleOptionsSample} />
      </Provider>
    );
    expect(wrapper.find(DatatableContainer)).toHaveLength(1);
  });
});
