import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { Dialog } from "@material-ui/core";
import { Provider } from "react-redux";
import Print, {
  Print as PrintPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/Print";
import { storeSample } from "../../../../data/samples";

const rowsSelected = [storeSample.datatableReducer.data.rows[1]];
const mockStore = configureStore();
const store = mockStore({
  ...storeSample,
  datatableReducer: { ...storeSample.datatableReducer, rowsSelected }
});
const { datatableReducer } = storeSample;
const { columns, rows } = datatableReducer.data;
const { rowsCurrentPage } = datatableReducer.pagination;
const columnsOrder = columns.map(col => col.id);

describe("Print component", () => {
  afterAll(() => {
    window.print.mockClear();
    window.open.mockClear();
  });

  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Print />
      </Provider>
    );
    expect(wrapper.find("Connect(Print)")).toHaveLength(1);
  });

  describe("on button click should open dialog", () => {
    window.open = jest.fn();
    window.open.mockReturnValue({
      document: {
        close: jest.fn(),
        write: jest.fn()
      },
      focus: jest.fn(),
      close: jest.fn(),
      print: jest.fn()
    });
    const wrapperNoRowsSelected = mount(
      <PrintPureComponent
        rowsSelected={[]}
        rowsToUse={rows}
        columns={columns}
        rowsCurrentPage={rowsCurrentPage}
        columnsOrder={columnsOrder}
        printText=""
        printTitleText=""
        printDescriptionText=""
        downloadSelectedRowsText=""
        downloadCurrentRowsText=""
        downloadAllRowsText=""
      />
    );

    const wrapper = mount(
      <PrintPureComponent
        rowsSelected={rowsSelected}
        rowsToUse={rows}
        columns={columns}
        columnsOrder={columnsOrder}
        rowsCurrentPage={rowsCurrentPage}
        printText=""
        printTitleText=""
        printDescriptionText=""
        downloadSelectedRowsText=""
        downloadCurrentRowsText=""
        downloadAllRowsText=""
      />
    );

    const buttonDialog = wrapper.find("button.print-icon");
    buttonDialog.simulate("click");

    it("", () => {
      buttonDialog.simulate("click");
      expect(wrapper.state("dialogOpen")).toBeTruthy();
    });

    it("with rows selected disabled", () => {
      const buttonD = wrapperNoRowsSelected.find("button.print-icon");
      buttonD.simulate("click");
      const button = wrapperNoRowsSelected.find("button.rows-selected");
      expect(button.props().disabled).toBeTruthy();
    });

    it("with rows selected enabled", () => {
      const button = wrapper.find("button.rows-selected");
      expect(button.props().disabled).toBeFalsy();
    });

    describe("click on ", () => {
      it("exit button should close modal", () => {
        const button = wrapper.find("button.close-icon");
        button.simulate("click");
        expect(wrapper.state("dialogOpen")).toBeFalsy();
      });

      buttonDialog.simulate("click");

      describe("rows selected", () => {
        const spy = jest.spyOn(wrapper.instance(), "print");
        const button = wrapper.find("button.rows-selected");
        button.simulate("click");

        it("should call print function with param 'selected'", () => {
          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith("selected");
        });

        it("should close modal", () => {
          expect(wrapper.state("dialogOpen")).toBeFalsy();
        });
      });

      describe("rows current page", () => {
        buttonDialog.simulate("click");
        const spy = jest.spyOn(wrapper.instance(), "print");
        const button = wrapper.find("button.rows-current-page");
        button.simulate("click");

        it("should call print function with param 'current'", () => {
          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith("current");
        });

        it("should close modal", () => {
          expect(wrapper.state("dialogOpen")).toBeFalsy();
        });
      });

      describe("all rows", () => {
        buttonDialog.simulate("click");
        const spy = jest.spyOn(wrapper.instance(), "print");
        const button = wrapper.find("button.all-rows");
        button.simulate("click");

        it("should call print function with param 'all'", () => {
          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith("all");
        });

        it("should close modal", () => {
          expect(wrapper.state("dialogOpen")).toBeFalsy();
        });
      });
    });

    describe("modal on click away ", () => {
      buttonDialog.simulate("click");
      const spy = jest.spyOn(wrapper.instance(), "toggleDialog");
      wrapper
        .find(Dialog)
        .props()
        .onClose();

      it("should close modal", () => {
        expect(wrapper.state("dialogOpen")).toBeFalsy();
      });

      it("should call toggleDialog function", () => {
        expect(spy).toHaveBeenCalled();
      });
    });

    it("should handle default print param", () => {
      wrapper.instance().print("test");
      expect(wrapper.state("dialogOpen")).toBeFalsy();
    });
  });
});
