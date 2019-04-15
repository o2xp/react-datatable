import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { Table, TableRow } from "@material-ui/core";
import Header from "../../../../src/components/DatatableCore/Header/Header";
import HeaderRow from "../../../../src/components/DatatableCore/Header/HeaderRow";
import {
  storeNoCustomComponentsSample,
  storeCustomTableHeaderRowComponentSample
} from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeNoCustomComponentsSample);
const storeCustomComponent = mockStore(
  storeCustomTableHeaderRowComponentSample
);

describe("Header component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(wrapper.find("Connect(Header)")).toHaveLength(1);
  });

  it("should create a header with 1 row", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Table>
          <Header />
        </Table>
      </Provider>
    );

    expect(wrapper.find(HeaderRow)).toHaveLength(1);
  });

  it("should create a body with custom row", () => {
    const wrapper = mount(
      <Provider store={storeCustomComponent}>
        <Table>
          <Header />
        </Table>
      </Provider>
    );

    expect(wrapper.find(TableRow)).toHaveLength(1);
  });
});
