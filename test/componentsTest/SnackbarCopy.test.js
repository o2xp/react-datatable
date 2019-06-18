import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import SnackbarCopy, {
  SnackbarCopy as SnackbarCopyPureComponent
} from "../../src/components/SnackbarCopy";
import { storeSample } from "../../data/samples";
import { customVariant } from "../../src/components/MuiTheme";

const mockStore = configureStore();
const store = mockStore({
  ...storeSample,
  datatableReducer: { ...storeSample.datatableReducer, snackbarOpen: true }
});

const toggleSnackbar = jest.fn();

describe("SnackbarCopy component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SnackbarCopy />
      </Provider>
    );
    expect(wrapper.find("Connect(WithStyles(SnackbarCopy))")).toHaveLength(1);
  });

  it("connected should mount without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <SnackbarCopy />
      </Provider>
    );
    const button = wrapper.find("button.close-snackbar-icon");
    button.simulate("click");

    expect(wrapper.find("Connect(WithStyles(SnackbarCopy))")).toHaveLength(1);
  });

  it("onClose should call toggleSnackbar", () => {
    const wrapper = mount(
      <SnackbarCopyPureComponent
        classes={{ customVariant }}
        snackbarOpen
        toggleSnackbar={toggleSnackbar}
      />
    );

    const sb = wrapper.find("Snackbar");
    sb.props().onClose();

    expect(toggleSnackbar).toHaveBeenCalled();
  });

  it("icon close click should call toggleSnackbar", () => {
    const wrapper = mount(
      <SnackbarCopyPureComponent
        classes={{ customVariant }}
        snackbarOpen
        toggleSnackbar={toggleSnackbar}
      />
    );

    const button = wrapper.find("button.close-snackbar-icon");
    button.simulate("click");

    expect(toggleSnackbar).toHaveBeenCalled();
  });

  it("wait 2500ms should call toggleSnackbar", () => {
    mount(
      <SnackbarCopyPureComponent
        classes={{ customVariant }}
        snackbarOpen
        toggleSnackbar={toggleSnackbar}
      />
    );

    setTimeout(() => {
      expect(toggleSnackbar).toHaveBeenCalled();
    }, 2500);
  });
});
