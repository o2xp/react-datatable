import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import ExportRows from "../../../../src/components/DatatableHeader/Widgets/ExportRows";
import { storeSample } from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore({
  ...storeSample,
  datatableReducer: {
    ...storeSample.datatableReducer,
    rowsSelected: [storeSample.datatableReducer.data.rows[1]]
  }
});
const storeNoExport = mockStore(storeSample);

describe("ExportRows component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ExportRows />
      </Provider>
    );
    expect(wrapper.find("Connect(ExportRows)")).toHaveLength(1);
  });

  describe("should", () => {
    it("should dispatch action type ADD_ROW_EDITED", () => {
      const wrapper = mount(
        <Provider store={store}>
          <ExportRows />
        </Provider>
      );

      const exportButton = wrapper.find("button.export-rows");
      exportButton.simulate("click");
      const action = store.getActions()[0];
      expect(action.type).toEqual("EXPORT_ROW");
    });

    it("should be disabled", () => {
      const wrapper = mount(
        <Provider store={storeNoExport}>
          <ExportRows />
        </Provider>
      );

      const exportButton = wrapper.find("button.export-rows");
      expect(exportButton.props().disabled).toBeTruthy();
    });
  });
});
