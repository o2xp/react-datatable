import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import DownloadData, {
  DownloadData as DownloadDataPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/DownloadData";
import { storeSample } from "../../../../data/samples";

const rowsSelected = [storeSample.datatableReducer.data.rows[1]];
const mockStore = configureStore();
const store = mockStore({
  ...storeSample,
  datatableReducer: { ...storeSample.datatableReducer, rowsSelected }
});

const setRowsSelected = jest.fn();
const { datatableReducer } = storeSample;
const { columns, rows } = datatableReducer.data;
const { rowsCurrentPage } = datatableReducer.pagination;
const columnsOrder = columns.map(col => col.id);

describe("DownloadData component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DownloadData />
      </Provider>
    );
    expect(wrapper.find("Connect(DownloadData)")).toHaveLength(1);
  });

  it("connected should mount without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <DownloadData />
      </Provider>
    );

    const buttonDialog = wrapper.find("button.download-data-icon");
    buttonDialog.simulate("click");
    const button = wrapper.find("button.rows-selected");
    button.simulate("click");
    expect(wrapper.find("Connect(DownloadData)")).toHaveLength(1);
  });

  describe("on button click should open dialog", () => {
    const wrapperNoRowsSelected = mount(
      <DownloadDataPureComponent
        setRowsSelected={setRowsSelected}
        rowsSelected={[]}
        rows={rows}
        rowsToUse={rows}
        columns={columns}
        columnsOrder={columnsOrder}
        rowsCurrentPage={rowsCurrentPage}
        isRefreshing={false}
        keyColumn="id"
        downloadText=""
        downloadTitleText=""
        downloadDescriptionText=""
        downloadSelectedRowsText=""
        downloadCurrentRowsText=""
        downloadAllRowsText=""
      />
    );

    const wrapper = mount(
      <DownloadDataPureComponent
        setRowsSelected={setRowsSelected}
        rowsSelected={rowsSelected}
        rows={rows}
        rowsToUse={rows}
        columns={columns}
        columnsOrder={columnsOrder}
        rowsCurrentPage={rowsCurrentPage}
        isRefreshing={false}
        keyColumn="id"
        downloadText=""
        downloadTitleText=""
        downloadDescriptionText=""
        downloadSelectedRowsText=""
        downloadCurrentRowsText=""
        downloadAllRowsText=""
      />
    );

    const buttonDialog = wrapper.find("button.download-data-icon");
    buttonDialog.simulate("click");

    it("", () => {
      buttonDialog.simulate("click");
      expect(wrapper.state("dialogOpen")).toBeTruthy();
    });

    it("with rows selected disabled", () => {
      const buttonD = wrapperNoRowsSelected.find("button.download-data-icon");
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
        const spy = jest.spyOn(wrapper.instance(), "download");
        const button = wrapper.find("button.rows-selected");
        button.simulate("click");

        it("should call download function with param 'selected'", () => {
          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith("selected");
        });

        it("should call setRowsSelected function", () => {
          expect(setRowsSelected).toHaveBeenCalled();
        });

        it("should close modal", () => {
          expect(wrapper.state("dialogOpen")).toBeFalsy();
        });
      });

      describe("rows current page", () => {
        buttonDialog.simulate("click");
        const spy = jest.spyOn(wrapper.instance(), "download");
        const button = wrapper.find("button.rows-current-page");
        button.simulate("click");

        it("should call download function with param 'current'", () => {
          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith("current");
        });

        it("should close modal", () => {
          expect(wrapper.state("dialogOpen")).toBeFalsy();
        });
      });

      describe("all rows", () => {
        buttonDialog.simulate("click");
        const spy = jest.spyOn(wrapper.instance(), "download");
        wrapper
          .find("Select")
          .props()
          .onChange({ target: { value: "json" } });
        const button = wrapper.find("button.all-rows");
        button.simulate("click");

        it("should call download function with param 'all'", () => {
          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith("all");
        });

        it("should close modal", () => {
          expect(wrapper.state("dialogOpen")).toBeFalsy();
        });
      });
    });

    describe("change file name", () => {
      buttonDialog.simulate("click");
      const spy = jest.spyOn(wrapper.instance(), "setFileName");
      const input = wrapper.find("input.input-fileName");
      input.simulate("change", { target: { value: "test" } });

      it("should change name in state", () => {
        expect(wrapper.state("fileName")).toEqual("test");
      });

      it("should call setFileName function", () => {
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("change file type", () => {
      buttonDialog.simulate("click");
      const spy = jest.spyOn(wrapper.instance(), "setFileType");
      wrapper
        .find("Select")
        .props()
        .onChange({ target: { value: "json" } });

      it("should change type in state", () => {
        expect(wrapper.state("fileType")).toEqual("json");
      });

      it("should call setFileType function", () => {
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("modal on click away ", () => {
      buttonDialog.simulate("click");
      const spy = jest.spyOn(wrapper.instance(), "toggleDialog");
      wrapper
        .find("Dialog")
        .props()
        .onClose();

      it("should close modal", () => {
        expect(wrapper.state("dialogOpen")).toBeFalsy();
      });

      it("should call toggleDialog function", () => {
        expect(spy).toHaveBeenCalled();
      });
    });

    it("should handle default download param", () => {
      wrapper.instance().download("test");
      expect(wrapper.state("dialogOpen")).toBeFalsy();
    });
  });
});
