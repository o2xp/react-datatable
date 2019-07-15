import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { Datatable } from "../src/index";
import { storeSample, simpleOptionsSample } from "../data/samples";

const mockStore = configureStore();
const store = mockStore(storeSample);
const refreshRows = jest.fn();

describe("Datatable component", () => {
  it("should render DatatableInitializer", () => {
    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);

    const wrapper = mount(
      <Provider store={store}>
        <Datatable
          options={simpleOptionsSample}
          refreshRows={refreshRows}
          stripped
        />
      </Provider>,
      { attachTo: window.domNode }
    );

    expect(wrapper.find("div#no-data").hostNodes()).toHaveLength(0);
    expect(wrapper.find("div#no-keyColumn").hostNodes()).toHaveLength(0);
    expect(
      wrapper.find("div#no-data-and-no-keyColumn").hostNodes()
    ).toHaveLength(0);
    expect(wrapper.find("DatatableInitializer")).toHaveLength(1);
  });

  it("with missing data and keyColumn should render div error", () => {
    const wrapper2 = mount(
      <Provider store={store}>
        <Datatable refreshRows={refreshRows} />
      </Provider>
    );

    expect(wrapper2.find("DatatableInitializer")).toHaveLength(0);
    expect(
      wrapper2.find("div#no-data-and-no-keyColumn").hostNodes()
    ).toHaveLength(1);
  });

  it("with missing data should render div error", () => {
    const wrapper3 = mount(
      <Provider store={store}>
        <Datatable options={{ keyColumn: "id" }} refreshRows={refreshRows} />
      </Provider>
    );

    expect(wrapper3.find("DatatableInitializer")).toHaveLength(0);
    expect(wrapper3.find("div#no-data").hostNodes()).toHaveLength(1);
  });

  it("with missing keyColumn should render div error", () => {
    const wrapper4 = mount(
      <Provider store={store}>
        <Datatable options={{ data: [] }} refreshRows={refreshRows} />
      </Provider>
    );

    expect(wrapper4.find("DatatableInitializer")).toHaveLength(0);
    expect(wrapper4.find("div#no-keyColumn").hostNodes()).toHaveLength(1);
  });
});
