import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { storeSample } from "../../../../data/samples";
import Filter from "../../../../src/components/DatatableHeader/Widgets/Filter";

const mockStore = configureStore();
const store = mockStore(storeSample);
const { rows } = storeSample.datatableReducer.data;
describe("Filter component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Filter />
      </Provider>
    );
    expect(wrapper.find("Connect(Filter)")).toHaveLength(1);
  });

  it("connected should mount without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Filter />
      </Provider>
    );
    const button = wrapper.find("button.filter-icon");
    button.simulate("click");
    expect(wrapper.find("Connect(Filter)")).toHaveLength(1);
  });

  it("filter with props", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Filter rows={rows} isRefreshing filterText="test" />
      </Provider>
    );
    const button = wrapper.find("button.filter-icon");
    button.simulate("click");
    wrapper.setProps({ filterText: "sd" });
    expect(wrapper).toBeTruthy();
  });
});
