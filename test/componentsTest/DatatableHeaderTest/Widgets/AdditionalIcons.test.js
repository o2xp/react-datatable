import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";
import AdditionalIcons from "../../../../src/components/DatatableHeader/Widgets/AdditionalIcons";
import { storeSample } from "../../../../data/samples";

const onClick = jest.fn();
const additionalIcon = {
  title: "Coffee",
  icon: <CallSplitIcon />,
  onClick
};
const mockStore = configureStore();
const store = mockStore({
  ...storeSample,
  datatableReducer: {
    ...storeSample.datatableReducer,
    features: {
      ...storeSample.datatableReducer.features,
      additionalIcons: [additionalIcon]
    }
  }
});

describe("SelectionIcons component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <AdditionalIcons />
      </Provider>
    );
    expect(wrapper.find("Connect(AdditionalIcons)")).toHaveLength(1);
  });

  describe("should", () => {
    it("onClick excute the function passed", () => {
      const wrapper = mount(
        <Provider store={store}>
          <AdditionalIcons />
        </Provider>
      );

      const additionalButton0 = wrapper.find("button.additional-icon-0");
      additionalButton0.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });
  });
});
