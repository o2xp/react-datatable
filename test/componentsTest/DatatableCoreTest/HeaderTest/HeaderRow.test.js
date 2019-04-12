import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { Table, TableHead, TableCell } from "@material-ui/core";
import HeaderRow from "../../../../src/components/DatatableCore/Header/HeaderRow";
import HeaderCell from "../../../../src/components/DatatableCore/Header/HeaderCell";
import {
  storeNoCustomComponentsSample,
  storeCustomTableHeaderCellComponentSample
} from "../../../../data/samples";

import {
  NumberWrapper,
  TextWrapper,
  BooleanWrapper,
  DateWrapper
} from "../../../../src/components/DatatableCore/CellTypes";

const mockStore = configureStore();
const store = mockStore(storeNoCustomComponentsSample);
const storeCustomComponent = mockStore(
  storeCustomTableHeaderCellComponentSample
);

const { columns } = storeNoCustomComponentsSample.datatableReducer.data;
const {
  columnsOrder
} = storeNoCustomComponentsSample.datatableReducer.features.userConfiguration;

describe("HeaderRow component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <HeaderRow
          columns={columns}
          columnsOrder={columnsOrder}
          CustomTableHeaderCell={null}
        />
      </Provider>
    );
    expect(wrapper.find("Connect(HeaderRow)")).toHaveLength(1);
  });

  describe("should create a row", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Table>
          <TableHead>
            <HeaderRow />
          </TableHead>
        </Table>
      </Provider>
    );

    it("of 6 cells", () => {
      expect(wrapper.find(HeaderCell)).toHaveLength(6);
    });

    it("with 1 number cell", () => {
      expect(wrapper.find(NumberWrapper)).toHaveLength(1);
    });

    it("with 3 text cells", () => {
      expect(wrapper.find(TextWrapper)).toHaveLength(3);
    });

    it("with 1 boolean cell", () => {
      expect(wrapper.find(BooleanWrapper)).toHaveLength(1);
    });

    it("with 1 date cell", () => {
      expect(wrapper.find(DateWrapper)).toHaveLength(1);
    });
  });

  describe("should create a row with custom cell", () => {
    const wrapper = mount(
      <Provider store={storeCustomComponent}>
        <Table>
          <TableHead>
            <HeaderRow />
          </TableHead>
        </Table>
      </Provider>
    );

    it("of 6 cells", () => {
      expect(wrapper.find(TableCell)).toHaveLength(6);
    });

    it("with 1 number cell", () => {
      expect(wrapper.find(".number").hostNodes()).toHaveLength(1);
    });

    it("with 2 text cells", () => {
      expect(wrapper.find(".text").hostNodes()).toHaveLength(2);
    });

    it("with 1 boolean cell", () => {
      expect(wrapper.find(".boolean").hostNodes()).toHaveLength(1);
    });

    it("with 1 date cell", () => {
      expect(wrapper.find(".date").hostNodes()).toHaveLength(1);
    });

    it("with 1 default cell", () => {
      expect(wrapper.find(".default").hostNodes()).toHaveLength(1);
    });
  });
});