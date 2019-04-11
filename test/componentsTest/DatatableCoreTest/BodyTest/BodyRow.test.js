import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { Table, TableBody, TableCell } from "@material-ui/core";
import BodyRow from "../../../../src/components/DatatableCore/Body/BodyRow";
import BodyCell from "../../../../src/components/DatatableCore/Body/BodyCell";
import {
  storeNoCustomComponentsSample,
  storeCustomTableBodyCellComponentSample
} from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeNoCustomComponentsSample);
const storeCustomComponent = mockStore(storeCustomTableBodyCellComponentSample);

const row = storeNoCustomComponentsSample.datatableReducer.data.rows[1];
const { columns } = storeNoCustomComponentsSample.datatableReducer.data;
const {
  columnsOrder
} = storeNoCustomComponentsSample.datatableReducer.features.userConfiguration;
const rowIndex = 1;

describe("BodyRow component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <BodyRow
          row={row}
          columns={columns}
          columnsOrder={columnsOrder}
          rowIndex={rowIndex}
          CustomTableBodyCell={null}
        />
      </Provider>
    );
    expect(wrapper.find("Connect(BodyRow)")).toHaveLength(1);
  });

  describe("should create a row", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Table>
          <TableBody>
            <BodyRow
              row={row}
              columns={columns}
              columnsOrder={columnsOrder}
              rowIndex={rowIndex}
              CustomTableBodyCell={null}
            />
          </TableBody>
        </Table>
      </Provider>
    );
    it("of 6 cells", () => {
      expect(wrapper.find(TableCell)).toHaveLength(6);
    });

    it("with 5 cells containing data", () => {
      expect(wrapper.find(BodyCell)).toHaveLength(5);
    });

    it("with 1 empty cell", () => {
      expect(wrapper.find(".no-data").hostNodes()).toHaveLength(1);
    });
  });

  describe("should create a row with custom cell", () => {
    const wrapper = mount(
      <Provider store={storeCustomComponent}>
        <Table>
          <TableBody>
            <BodyRow
              row={row}
              columns={columns}
              columnsOrder={columnsOrder}
              rowIndex={rowIndex}
            />
          </TableBody>
        </Table>
      </Provider>
    );
    it("of 6 cells", () => {
      expect(wrapper.find(TableCell)).toHaveLength(6);
    });

    it("with 4 cells containing basic data", () => {
      expect(wrapper.find(".data").hostNodes()).toHaveLength(4);
    });

    it("with 1 empty cell", () => {
      expect(wrapper.find(".no-data").hostNodes()).toHaveLength(1);
    });

    it("with 1 cell containing boolean", () => {
      expect(wrapper.find(".data-boolean").hostNodes()).toHaveLength(1);
    });
  });
});
