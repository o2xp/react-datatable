import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import GlobalEdit, {
  GlobalEdit as GlobalEditPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/GlobalEdit";
import { storeSample } from "../../../../data/samples";
import { customVariant } from "../../../../src/components/MuiTheme";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const { datatableReducer } = storeSample;
const { rows } = datatableReducer.data;
const row = rows[10];
const rowAdded = { ...row, age: "91", idOfColumnErr: [], hasBeenEdited: false };
const rowAddedError = {
  ...row,
  age: "91",
  idOfColumnErr: ["age"],
  hasBeenEdited: false
};
const store = mockStore({
  ...storeSample,
  datatableReducer: {
    ...storeSample.datatableReducer,
    features: {
      ...storeSample.datatableReducer.features,
      canEdit: false,
      canGlobalEdit: true
    },
    rowsGlobalEdited: [rowAdded]
  }
});

describe("GlobalEdit component", () => {
  it("connected should render without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <GlobalEdit />
      </Provider>
    );
    const editButton = wrapper.find("button.edit-icon");
    editButton.simulate("click");
    const buttonRevert = wrapper.find("button.revert-icon");
    buttonRevert.simulate("click");
    editButton.simulate("click");
    const buttonSave = wrapper.find("button.save-icon");
    buttonSave.simulate("click");
    expect(wrapper.find("Connect(GlobalEdit)")).toHaveLength(1);
  });

  it("on button click should put edit mode", () => {
    const addAllRowsToEdited = jest.fn();
    const saveAllRowsEdited = jest.fn();
    const revertAllRowsToEdited = jest.fn();

    const wrapper = mount(
      <GlobalEditPureComponent
        addAllRowsToEdited={addAllRowsToEdited}
        saveAllRowsEdited={saveAllRowsEdited}
        revertAllRowsToEdited={revertAllRowsToEdited}
        rowsGlobalEdited={[]}
        rowsDeleted={[]}
        classes={{ customVariant }}
        editText='Edit'
        clearText='Clear'
        saveText='Save'
      />
    );
    expect(wrapper.state("editing")).toBeFalsy();
    const spy = jest.spyOn(wrapper.instance(), "edit");
    const button = wrapper.find("button.edit-icon");
    button.simulate("click");
    const buttonSave = wrapper.find("button.save-icon");
    expect(wrapper.state("editing")).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(buttonSave.props().disabled).toBeTruthy();
  });

  it("on button revert click close edit mode", () => {
    const addAllRowsToEdited = jest.fn();
    const saveAllRowsEdited = jest.fn();
    const revertAllRowsToEdited = jest.fn();

    const wrapper = mount(
      <GlobalEditPureComponent
        addAllRowsToEdited={addAllRowsToEdited}
        saveAllRowsEdited={saveAllRowsEdited}
        revertAllRowsToEdited={revertAllRowsToEdited}
        rowsGlobalEdited={[]}
        rowsDeleted={[]}
        classes={{ customVariant }}
        editText='Edit'
        clearText='Clear'
        saveText='Save'
      />
    );
    expect(wrapper.state("editing")).toBeFalsy();
    const spy = jest.spyOn(wrapper.instance(), "edit");
    const button = wrapper.find("button.edit-icon");
    button.simulate("click");
    const buttonSave = wrapper.find("button.save-icon");
    expect(wrapper.state("editing")).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(buttonSave.props().disabled).toBeTruthy();
    const buttonRevert = wrapper.find("button.revert-icon");
    buttonRevert.simulate("click");
    expect(wrapper.state("editing")).toBeFalsy();
  });

  it("on button save click close edit mode", () => {
    const addAllRowsToEdited = jest.fn();
    const saveAllRowsEdited = jest.fn();
    const revertAllRowsToEdited = jest.fn();

    const wrapper = mount(
      <GlobalEditPureComponent
        addAllRowsToEdited={addAllRowsToEdited}
        saveAllRowsEdited={saveAllRowsEdited}
        revertAllRowsToEdited={revertAllRowsToEdited}
        rowsGlobalEdited={[rowAdded]}
        rowsDeleted={[]}
        classes={{ customVariant }}
        editText='Edit'
        clearText='Clear'
        saveText='Save'
      />
    );
    expect(wrapper.state("editing")).toBeFalsy();
    const spy = jest.spyOn(wrapper.instance(), "edit");
    const button = wrapper.find("button.edit-icon");
    button.simulate("click");
    const buttonSave = wrapper.find("button.save-icon");
    expect(wrapper.state("editing")).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(buttonSave.props().disabled).toBeFalsy();
    buttonSave.simulate("click");
    expect(wrapper.state("editing")).toBeFalsy();
  });

  it("disabled save button on error", () => {
    const addAllRowsToEdited = jest.fn();
    const saveAllRowsEdited = jest.fn();
    const revertAllRowsToEdited = jest.fn();

    const wrapper = mount(
      <GlobalEditPureComponent
        addAllRowsToEdited={addAllRowsToEdited}
        saveAllRowsEdited={saveAllRowsEdited}
        revertAllRowsToEdited={revertAllRowsToEdited}
        rowsGlobalEdited={[rowAddedError]}
        rowsDeleted={[]}
        classes={{ customVariant }}
        editText='Edit'
        clearText='Clear'
        saveText='Save'
      />
    );
    expect(wrapper.state("editing")).toBeFalsy();
    const spy = jest.spyOn(wrapper.instance(), "edit");
    const button = wrapper.find("button.edit-icon");
    button.simulate("click");
    const buttonSave = wrapper.find("button.save-icon");
    expect(wrapper.state("editing")).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(buttonSave.props().disabled).toBeTruthy();
  });
});
