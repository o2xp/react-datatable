import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { Table, TableRow } from "@material-ui/core";
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
    const wrapper = shallow(
      <Provider store={store}>
        <Body />
      </Provider>
    );
    expect(wrapper.find("Connect(Body)")).toHaveLength(1);
  });

  describe("should create a body", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Table>
          <Body />
        </Table>
      </Provider>
    );

    it("of 3 rows", () => {
      expect(wrapper.find(BodyRow)).toHaveLength(3);
    });
  });

  describe("should create a body with custom row", () => {
    const wrapper = mount(
      <Provider store={storeCustomComponent}>
        <Table>
          <Body />
        </Table>
      </Provider>
    );

    it("of 3 rows", () => {
      expect(wrapper.find(TableRow)).toHaveLength(3);
    });

    it("of 2 stripped rows", () => {
      expect(wrapper.find(".stripped").hostNodes()).toHaveLength(2);
    });

    it("of 1 not-stripped row", () => {
      expect(wrapper.find(".not-stripped").hostNodes()).toHaveLength(1);
    });
  });
});
