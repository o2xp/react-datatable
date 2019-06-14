import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import Body, {
  Body as BodyPureComponent
} from "../../../../src/components/DatatableCore/Body/Body";
import BodyRow from "../../../../src/components/DatatableCore/Body/BodyRow";
import {
  storeNoCustomComponentsSample,
  storeCustomTableBodyRowComponentSample
} from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeNoCustomComponentsSample);
const storeCustomComponent = mockStore(storeCustomTableBodyRowComponentSample);
const storeNoRowsCurrentPage = mockStore({
  ...storeNoCustomComponentsSample,
  datatableReducer: {
    ...storeNoCustomComponentsSample.datatableReducer,
    pagination: {
      ...storeNoCustomComponentsSample.datatableReducer.pagination,
      rowsCurrentPage: []
    }
  }
});

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

    it("of 6 rows visible", () => {
      expect(bodyWrapper.find(BodyRow)).toHaveLength(6);
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

    it("of 6 rows visible", () => {
      expect(bodyWrapper.find("div.Table-Row")).toHaveLength(6);
    });

    it("of 3 stripped rows visible", () => {
      expect(bodyWrapper.find(".stripped").hostNodes()).toHaveLength(3);
    });

    it("of 3 not-stripped rows visible", () => {
      expect(bodyWrapper.find(".not-stripped").hostNodes()).toHaveLength(3);
    });
  });

  it("on unmount componentWillUnmount should be called", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ScrollSync>
          <ScrollSyncPane>
            <Body />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );
    const componentWillUnmount = jest.spyOn(
      wrapper.find("Body").instance(),
      "componentWillUnmount"
    );
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalled();
  });

  it("on mount componentDidMount should be called", () => {
    const componentDidMount = jest.spyOn(
      BodyPureComponent.prototype,
      "componentDidMount"
    );
    mount(
      <Provider store={store}>
        <ScrollSync>
          <ScrollSyncPane>
            <Body />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );
    expect(componentDidMount).toHaveBeenCalled();
  });

  describe("function handleScroll should", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ScrollSync>
          <ScrollSyncPane>
            <Body />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );
    it("not dispatch action if scrollLeft = 0", () => {
      wrapper
        .find("Body")
        .instance()
        .handleScroll(0);
      expect(store.getActions().length).toEqual(0);
    });
    describe("dispatch action of", () => {
      it("type SET_IS_SCROLLING", () => {
        wrapper
          .find("Body")
          .instance()
          .handleScroll(456);
        const action = store.getActions()[0];
        expect(action.type).toEqual("SET_IS_SCROLLING");
      });

      it("type SET_IS_SCROLLING with payload", () => {
        wrapper
          .find("Body")
          .instance()
          .handleScroll(456);
        const action = store.getActions()[0];
        expect(action.payload).toEqual(true);
      });
    });
  });

  it("should display div with no rows", () => {
    const bodyWrapper = mount(
      <Provider store={storeNoRowsCurrentPage}>
        <ScrollSync>
          <ScrollSyncPane>
            <Body />
          </ScrollSyncPane>
        </ScrollSync>
      </Provider>
    );

    expect(bodyWrapper.find("#no-rows-filtered")).toHaveLength(1);
  });
});
