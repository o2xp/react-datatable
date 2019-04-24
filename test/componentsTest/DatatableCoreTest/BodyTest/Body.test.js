import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import Body from "../../../../src/components/DatatableCore/Body/Body";
import BodyRow from "../../../../src/components/DatatableCore/Body/BodyRow";
import {
  storeNoCustomComponentsSample,
  storeCustomTableBodyRowComponentSample
} from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeNoCustomComponentsSample);
const storeCustomComponent = mockStore(storeCustomTableBodyRowComponentSample);

describe("Body component", () => {
  it("connected should render without errors", () => {
    const bodyWrapper = shallow(
      <Provider store={store}>
        <ScrollSync>
          <ScrollSyncPane>
            <Body />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );
    expect(bodyWrapper.find("Connect(Body)")).toHaveLength(1);
  });

  describe("should create a body", () => {
    const bodyWrapper = mount(
      <Provider store={store}>
        <ScrollSync>
          <ScrollSyncPane>
            <Body />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );

    it("of 3 rows", () => {
      expect(bodyWrapper.find(BodyRow)).toHaveLength(3);
    });
  });

  describe("should create a body with custom row", () => {
    const bodyWrapper = mount(
      <Provider store={storeCustomComponent}>
        <ScrollSync>
          <ScrollSyncPane>
            <Body />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );

    it("of 3 rows", () => {
      expect(bodyWrapper.find("div.Table-Row")).toHaveLength(3);
    });

    it("of 2 stripped rows", () => {
      expect(bodyWrapper.find(".stripped").hostNodes()).toHaveLength(2);
    });

    it("of 1 not-stripped row", () => {
      expect(bodyWrapper.find(".not-stripped").hostNodes()).toHaveLength(1);
    });
  });
});
