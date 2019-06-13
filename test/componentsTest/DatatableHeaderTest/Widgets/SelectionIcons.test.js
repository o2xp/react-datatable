import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import SelectionIcons from "../../../../src/components/DatatableHeader/Widgets/SelectionIcons";
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

describe("SelectionIcons component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SelectionIcons />
      </Provider>
    );
    expect(wrapper.find("Connect(SelectionIcons)")).toHaveLength(1);
  });

  describe("should", () => {
    it("dispatch action type SET_ROWS_SELECTED", () => {
      const wrapper = mount(
        <Provider store={store}>
          <SelectionIcons />
        </Provider>
      );

      const selectionButton0 = wrapper.find("button.selection-icon-0");
      selectionButton0.simulate("click");
      const action = store.getActions()[0];
      expect(action.type).toEqual("SET_ROWS_SELECTED");
    });

    it("should be disabled", () => {
      const wrapper = mount(
        <Provider store={storeNoExport}>
          <SelectionIcons />
        </Provider>
      );

      const selectionButton0 = wrapper.find("button.selection-icon-0");
      expect(selectionButton0.props().disabled).toBeTruthy();
    });
  });
});
