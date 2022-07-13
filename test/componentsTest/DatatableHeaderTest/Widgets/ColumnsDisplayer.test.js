import React from "react";
import configureStore from "redux-mock-store";
import { MenuItem } from "@material-ui/core";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import ColumnsDisplayer, {
  ColumnsDisplayer as ColumnsDisplayerPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/ColumnsDisplayer";
import { storeSample } from "../../../../data/samples";
import CreatePreset from "../../../../src/components/DatatableHeader/Widgets/CreatePreset";

const mockStore = configureStore();
const store = mockStore(storeSample);
const setColumnVisibilty = jest.fn();
const handlePresetDisplay = jest.fn();
const { columns } = storeSample.datatableReducer.data;
const {
  columnsOrder
} = storeSample.datatableReducer.features.userConfiguration;

describe("ColumnsDisplayer component", () => {
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document
    }
  });

  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ColumnsDisplayer />
      </Provider>
    );
    expect(wrapper.find("Connect(ColumnsDisplayer)")).toHaveLength(1);
  });

  it("connected should mount without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ColumnsDisplayer />
      </Provider>
    );

    const button = wrapper.find("button.display-columns-icon");
    button.simulate("click");
    wrapper.find("button.display-column").simulate("click");
    wrapper
      .find(MenuItem)
      .at(2)
      .simulate("click");

    expect(wrapper.find("Connect(ColumnsDisplayer)")).toHaveLength(1);
  });

  describe("click on display columns button", () => {
    const wrapper = mount(
      <ColumnsDisplayerPureComponent
        setColumnVisibilty={setColumnVisibilty}
        columns={columns}
        columnsOrder={columnsOrder}
        displayText="Display columns"
      />
    );
    const button = wrapper.find("button.display-columns-icon");

    it("should open menu", () => {
      button.simulate("click");
      expect(wrapper.state("menuOpen")).toBeTruthy();
    });

    it("should close menu", () => {
      button.simulate("click");
      expect(wrapper.state("menuOpen")).toBeFalsy();
    });
  });

  it("should close menu on click away", () => {
    const wrapper = mount(
      <ColumnsDisplayerPureComponent
        setColumnVisibilty={setColumnVisibilty}
        columns={columns}
        columnsOrder={columnsOrder}
        displayText="Display columns"
      />
    );
    const button = wrapper.find("button.display-columns-icon");
    button.simulate("click");
    wrapper
      .find("ClickAwayListener")
      .props()
      .onClickAway(document.createEvent("CustomEvent"));
    expect(wrapper.state("menuOpen")).toBeFalsy();
  });

  describe("click on element display by columns should", () => {
    const wrapper = mount(
      <ColumnsDisplayerPureComponent
        setColumnVisibilty={setColumnVisibilty}
        columns={columns}
        columnsOrder={columnsOrder}
        displayText="Display columns"
      />
    );
    const button = wrapper.find("button.display-columns-icon");
    button.simulate("click");
    wrapper.find("button.display-column").simulate("click");
    wrapper
      .find(MenuItem)
      .at(2)
      .simulate("click");

    it("should dispatch action setColumnVisibilty", () => {
      expect(setColumnVisibilty).toHaveBeenCalled();
    });
  });

  describe("click on element display by presets should", () => {
    const wrapper2 = mount(
      <Provider store={store}>
        <CreatePreset
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
    const cbutton = wrapper2.find("button.create-preset-icon");
    cbutton.simulate("click");

    // insert preset name
    wrapper2
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "NEW PRESET" } });

    // check 1st checkbox
    const input = wrapper2.find("input");
    input.at(0).getDOMNode().checked = !input.at(0).getDOMNode().checked;
    input.at(0).simulate("change");

    // click on Create button
    const createButton = wrapper2.findWhere(node => {
      return node.type() && node.name() && node.text() === "Create";
    });
    createButton.at(0).simulate("click");
    const wrapper = mount(
      <ColumnsDisplayerPureComponent
        setColumnVisibilty={setColumnVisibilty}
        columns={columns}
        columnsOrder={columnsOrder}
        columnsPresetsToDisplay={[
          {
            presetName: "Show column",
            columnsToShow: ["id"],
            isActive: false,
            type: "predefinedPreset"
          }
        ]}
        handlePresetDisplay={handlePresetDisplay}
        displayText="Display columns"
      />
    );
    const button = wrapper.find("button.display-columns-icon");
    button.simulate("click");
    // click on display by presets
    wrapper.find("button.display-column-preset").simulate("click");
    expect(wrapper).toBeTruthy();
  });
});
