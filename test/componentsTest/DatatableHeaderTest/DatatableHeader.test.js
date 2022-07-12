import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";
import DatatableHeader from "../../../src/components/DatatableHeader/DatatableHeader";
import { storeSample } from "../../../data/samples";

const mockStore = configureStore();
const store = mockStore({
  ...storeSample,
  datatableReducer: {
    ...storeSample.datatableReducer,
    refreshRows: jest.fn(),
    features: {
      ...storeSample.datatableReducer.features,
      canEdit: false,
      canGlobalEdit: true,
      canSearch: true,
      canDownload: true,
      canOrderColumns: true,
      canPrint: true,
      canRefreshRows: true,
      canCreatePreset: true,
      canSaveUserConfiguration: true,
      additionalIcons: [
        {
          title: "Coffee",
          icon: <CallSplitIcon />,
          onClick: () => true
        }
      ]
    }
  }
});

const storeBasicIcons = mockStore({
  ...storeSample,
  datatableReducer: {
    ...storeSample.datatableReducer,
    features: {
      ...storeSample.datatableReducer.features,
      canSearch: false,
      canDownload: false,
      canOrderColumns: false,
      canPrint: false,
      canRefreshRows: false,
      canCreatePreset: false,
      canSaveUserConfiguration: false,
      selectionIcons: []
    }
  }
});

describe("DatatableHeader component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DatatableHeader />
      </Provider>
    );
    expect(wrapper.find("Connect(DatatableHeader)")).toHaveLength(1);
  });

  describe("should render", () => {
    const wrapper = mount(
      <Provider store={store}>
        <DatatableHeader />
      </Provider>
    );

    it("a title", () => {
      expect(wrapper.find("div.title")).toHaveLength(1);
    });

    it("a downloadData button", () => {
      expect(wrapper.find("DownloadData")).toHaveLength(1);
    });

    it("a selection icons separator", () => {
      const element = wrapper.find("div.selection-icons-separator");
      expect(element.props().style.height).toEqual("45%");
    });

    it("selection icons", () => {
      expect(wrapper.find("SelectionIcons")).toHaveLength(1);
    });

    it("a global edit icon separator", () => {
      const element = wrapper.find("div.global-edit-icon-separator");
      expect(element.props().style.height).toEqual("45%");
    });

    it("global edit", () => {
      expect(wrapper.find("GlobalEdit")).toHaveLength(1);
    });

    it("an additional icons separator", () => {
      const element = wrapper.find("div.additional-icons-separator");
      expect(element.props().style.height).toEqual("45%");
    });

    it("additional icons", () => {
      expect(wrapper.find("AdditionalIcons")).toHaveLength(1);
    });
  });

  describe("with basic icons should not render render", () => {
    const wrapper = mount(
      <Provider store={storeBasicIcons}>
        <DatatableHeader />
      </Provider>
    );

    it("a selection icons separator", () => {
      const element = wrapper.find("div.selection-icons-separator");
      expect(element.props().style.height).toEqual("0%");
    });

    it("an additional icons separator", () => {
      const element = wrapper.find("div.additional-icons-separator");
      expect(element.props().style.height).toEqual("0%");
    });
  });
});
