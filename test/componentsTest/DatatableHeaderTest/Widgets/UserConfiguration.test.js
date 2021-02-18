import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { Dialog, Switch } from "@material-ui/core";
import UserConfiguration, {
  UserConfiguration as UserConfigurationPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/UserConfiguration";
import { storeSample } from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeSample);
const {
  columnsOrder,
  copyToClipboard
} = storeSample.datatableReducer.features.userConfiguration;

describe("ColumnsDisplayer component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <UserConfiguration />
      </Provider>
    );
    expect(wrapper.find("Connect(UserConfiguration)")).toHaveLength(1);
  });

  it("connected should mount without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <UserConfiguration />
      </Provider>
    );
    const buttonDialog = wrapper.find("button.user-configuration-icon");
    buttonDialog.simulate("click");
    const switchButton = wrapper.find(Switch);
    switchButton.props().onChange({ target: null });
    const reset = wrapper.find("button.reset-configuration");
    reset.simulate("click");
    expect(wrapper.find("Connect(UserConfiguration)")).toHaveLength(1);
  });

  describe("on button click should open dialog", () => {
    const setUserConfiguration = jest.fn();
    const wrapper = mount(
      <UserConfigurationPureComponent
        columnsOrder={columnsOrder}
        copyToClipboard={copyToClipboard}
        setUserConfiguration={setUserConfiguration}
        configurationText=""
        configurationTitleText=""
        configurationCopyText=""
        configurationColumnText=""
        configurationResetText=""
        configurationSaveText=""
      />
    );

    const buttonDialog = wrapper.find("button.user-configuration-icon");
    buttonDialog.simulate("click");

    it("", () => {
      buttonDialog.simulate("click");
      expect(wrapper.state("dialogOpen")).toBeTruthy();
    });

    it("with reset button disabled", () => {
      const reset = wrapper.find("button.reset-configuration");
      expect(reset.props().disabled).toBeTruthy();
    });

    it("with save button disabled", () => {
      const save = wrapper.find("button.save-configuration");
      expect(save.props().disabled).toBeTruthy();
    });
  });

  describe("on switch click", () => {
    const setUserConfiguration = jest.fn();
    const wrapper = mount(
      <UserConfigurationPureComponent
        columnsOrder={columnsOrder}
        copyToClipboard
        setUserConfiguration={setUserConfiguration}
        configurationText=""
        configurationTitleText=""
        configurationCopyText=""
        configurationColumnText=""
        configurationResetText=""
        configurationSaveText=""
      />
    );

    const buttonDialog = wrapper.find("button.user-configuration-icon");
    buttonDialog.simulate("click");
    const switchButton = wrapper.find(Switch);
    switchButton.props().onChange({ target: null });

    it("set copyToClipboardState to false", () => {
      expect(wrapper.state().copyToClipboardState).toBeFalsy();
    });
  });

  describe("click on", () => {
    describe("reset", () => {
      const setUserConfiguration = jest.fn();
      const wrapper = mount(
        <UserConfigurationPureComponent
          columnsOrder={columnsOrder}
          copyToClipboard
          setUserConfiguration={setUserConfiguration}
          configurationText=""
          configurationTitleText=""
          configurationCopyText=""
          configurationColumnText=""
          configurationResetText=""
          configurationSaveText=""
        />
      );
      const buttonDialog = wrapper.find("button.user-configuration-icon");
      buttonDialog.simulate("click");
      const switchButton = wrapper.find(Switch);
      switchButton.props().onChange({ target: null });
      const reset = wrapper.find("button.reset-configuration");
      reset.simulate("click");

      it("should call setUserConfiguration", () => {
        expect(setUserConfiguration).toHaveBeenCalled();
      });

      it("should close modal", () => {
        expect(wrapper.state().dialogOpen).toBeFalsy();
      });
    });

    describe("save", () => {
      const setUserConfiguration = jest.fn();
      const wrapper = mount(
        <UserConfigurationPureComponent
          columnsOrder={columnsOrder}
          copyToClipboard
          setUserConfiguration={setUserConfiguration}
          configurationText=""
          configurationTitleText=""
          configurationCopyText=""
          configurationColumnText=""
          configurationResetText=""
          configurationSaveText=""
        />
      );
      const buttonDialog = wrapper.find("button.user-configuration-icon");
      buttonDialog.simulate("click");
      const switchButton = wrapper.find(Switch);
      switchButton.props().onChange({ target: null });
      const save = wrapper.find("button.save-configuration");
      save.simulate("click");

      it("should call setUserConfiguration", () => {
        expect(setUserConfiguration).toHaveBeenCalled();
      });

      it("should close modal", () => {
        expect(wrapper.state().dialogOpen).toBeFalsy();
      });
    });

    describe("away ", () => {
      const setUserConfiguration = jest.fn();
      const wrapper = mount(
        <UserConfigurationPureComponent
          columnsOrder={columnsOrder}
          copyToClipboard
          setUserConfiguration={setUserConfiguration}
          configurationText=""
          configurationTitleText=""
          configurationCopyText=""
          configurationColumnText=""
          configurationResetText=""
          configurationSaveText=""
        />
      );
      const buttonDialog = wrapper.find("button.user-configuration-icon");
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

    describe("exit button should close modal", () => {
      const setUserConfiguration = jest.fn();
      const wrapper = mount(
        <UserConfigurationPureComponent
          columnsOrder={columnsOrder}
          copyToClipboard
          setUserConfiguration={setUserConfiguration}
          configurationText=""
          configurationTitleText=""
          configurationCopyText=""
          configurationColumnText=""
          configurationResetText=""
          configurationSaveText=""
        />
      );
      const spy = jest.spyOn(wrapper.instance(), "toggleDialog");
      const buttonDialog = wrapper.find("button.user-configuration-icon");
      buttonDialog.simulate("click");
      const button = wrapper.find("button.close-icon");
      button.simulate("click");
      it("should close modal", () => {
        expect(wrapper.state("dialogOpen")).toBeFalsy();
      });

      it("should call toggleDialog function", () => {
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
