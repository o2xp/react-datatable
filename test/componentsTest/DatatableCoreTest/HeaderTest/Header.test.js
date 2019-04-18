import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
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
        <ScrollSync>
          <ScrollSyncPane>
            <Header />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );
    expect(wrapper.find("Connect(Header)")).toHaveLength(1);
  });

  it("should create a header with 1 row", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ScrollSync>
          <ScrollSyncPane>
            <Header />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );

    expect(wrapper.find(HeaderRow)).toHaveLength(1);
  });

  it("should create a body with custom row", () => {
    const wrapper = mount(
      <Provider store={storeCustomComponent}>
        <ScrollSync>
          <ScrollSyncPane>
            <Header />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );

    expect(wrapper.find(".Table-Row")).toHaveLength(1);
  });
});
