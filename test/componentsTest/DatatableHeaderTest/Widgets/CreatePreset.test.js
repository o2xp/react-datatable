import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { storeSample } from "../../../../data/samples";
import CreatePreset, {
  CreatePreset as CreatePresetPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/CreatePreset";

const mockStore = configureStore();
const store = mockStore(storeSample);
const { columns } = storeSample.datatableReducer.data;
describe("CreatePreset component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CreatePreset />
      </Provider>
    );
    expect(wrapper.find("Connect(CreatePreset)")).toHaveLength(1);
  });

  it("connected should mount without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <CreatePreset />
      </Provider>
    );
    const button = wrapper.find("button.create-preset-icon");
    button.simulate("click");
    expect(wrapper.find("Connect(CreatePreset)")).toHaveLength(1);
  });

  it("create preset with props", () => {
    const wrapper = mount(
      <Provider store={store}>
        <CreatePresetPureComponent
          createPresetTooltipText="Create a new preset"
          createPresetTitle="Create New Preset"
          createPresetNamingPlaceholder="Preset name"
          createPresetDescription="Select the columns to save in the preset"
          createPresetCancelBtn="Cancel"
          createPresetCreateBtn="Create"
          columns={columns}
        />
      </Provider>
    );
    const button = wrapper.find("button.create-preset-icon");
    button.simulate("click");

    // insert preset name
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "NEW PRESET" } });

    // check 1st checkbox
    const input = wrapper.find("input");
    input.at(0).getDOMNode().checked = !input.at(0).getDOMNode().checked;
    input.at(0).simulate("change");

    // click on Create button
    const createButton = wrapper.findWhere(node => {
      return node.type() && node.name() && node.text() === "Create";
    });
    createButton.at(0).simulate("click");

    expect(createButton.at(0).text()).toEqual("Create");
    expect(wrapper).toBeTruthy();
  });

  it("cancel preset with props", () => {
    const wrapper = mount(
      <Provider store={store}>
        <CreatePresetPureComponent
          createPresetTooltipText="Create a new preset"
          createPresetTitle="Create New Preset"
          createPresetNamingPlaceholder="Preset name"
          createPresetDescription="Select the columns to save in the preset"
          createPresetCancelBtn="Cancel"
          createPresetCreateBtn="Create"
          columns={columns}
        />
      </Provider>
    );
    const button = wrapper.find("button.create-preset-icon");
    button.simulate("click");

    // click on Create button
    const createButton = wrapper.findWhere(node => {
      return node.type() && node.name() && node.text() === "Cancel";
    });
    createButton.at(0).simulate("click");
    expect(createButton.at(0).text()).toEqual("Cancel");
    expect(wrapper).toBeTruthy();
  });
});
