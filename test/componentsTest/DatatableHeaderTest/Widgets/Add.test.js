import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import Add, {
  Add as AddPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/Add";
import { storeSample } from "../../../../data/samples";
import { moment, locale } from "../../../../src/moment.config";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const { columns } = storeSample.datatableReducer.data;
const store = mockStore({
  ...storeSample,
  datatableReducer: {
    ...storeSample.datatableReducer,
    features: {
      ...storeSample.datatableReducer.features,
      canEdit: false,
      canGlobalEdit: true
    }
  }
});

const newColumns = [
  {
    id: "id",
    label: "id",
    colSize: "200px",
    dataType: "text"
  },
  {
    id: "age",
    label: "age",
    colSize: "60px",
    dataType: "number",
    valueVerification: val => {
      let error;
      let message;
      switch (true) {
        case val > 100:
          error = true;
          message = "Value is too big";
          break;
        case val < 1:
          error = true;
          message = "Value is too low";
          break;
        default:
          error = false;
          message = "";
          break;
      }

      return {
        error,
        message
      };
    }
  },
  {
    id: "adult",
    label: "adult",
    colSize: "50px",
    dataType: "boolean"
  },
  {
    id: "birthDateTime",
    label: "birth date",
    colSize: "180px",
    dataType: "dateTime",
    dateFormat: "YYYY-MM-DDTHH:mm"
  },
  {
    id: "birthDate",
    label: "birth date",
    colSize: "180px",
    dataType: "date",
    dateFormat: "YYYY-MM-DD"
  },
  {
    id: "birthTime",
    label: "birth date",
    colSize: "180px",
    dataType: "time",
    dateFormat: "HH:mm"
  }
];

const addNewRow = jest.fn();

describe("Add component", () => {
  it("connected should render without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <Add />
        </MuiPickersUtilsProvider>
      </Provider>
    );
    expect(wrapper.find("Connect(Add)")).toHaveLength(1);
  });

  it("should dispatch redux action", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <Add editing />
        </MuiPickersUtilsProvider>
      </Provider>
    );
    const addRowButton = wrapper.find("button.add-row-icon");
    addRowButton.simulate("click");
    wrapper
      .find("div.new-row-id")
      .find("input")
      .simulate("change", { target: { value: "_id" } });
    const buttonCreate = wrapper.find("button.create");
    buttonCreate.simulate("click");
    expect(wrapper.find("Connect(Add)")).toHaveLength(1);
  });

  it("should open modal", () => {
    const wrapper = mount(
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        locale={locale}
        moment={moment}
      >
        <AddPureComponent
          editing
          addNewRow={addNewRow}
          columns={columns}
          createText=""
          createTitleText=""
          createCancelText=""
          createSubmitText=""
        />
      </MuiPickersUtilsProvider>
    );

    expect(wrapper.state("modalOpen")).toBeFalsy();

    const addRowButton = wrapper.find("button.add-row-icon");
    addRowButton.simulate("click");
    expect(wrapper.find("Add").state("modalOpen")).toBeTruthy();

    wrapper
      .find("div.new-row-id")
      .find("input")
      .simulate("change", { target: { value: "_id" } });
    const buttonCreate = wrapper.find("button.create");
    buttonCreate.simulate("click");
    expect(wrapper.find("Add").state("modalOpen")).toBeFalsy();

    addRowButton.simulate("click");
    const buttonCancel = wrapper.find("button.cancel");
    buttonCancel.simulate("click");
    expect(wrapper.find("Add").state("modalOpen")).toBeFalsy();

    addRowButton.simulate("click");
    wrapper
      .find("Dialog")
      .first()
      .props()
      .onClose();
    expect(wrapper.find("Add").state("modalOpen")).toBeFalsy();
  });

  it("should render inputs", () => {
    const wrapper = mount(
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        locale={locale}
        moment={moment}
      >
        <AddPureComponent
          editing
          addNewRow={addNewRow}
          columns={newColumns}
          createText=""
          createTitleText=""
          createCancelText=""
          createSubmitText=""
        />
      </MuiPickersUtilsProvider>
    );

    expect(wrapper.state("modalOpen")).toBeFalsy();

    const addRowButton = wrapper.find("button.add-row-icon");
    addRowButton.simulate("click");
    expect(wrapper.find("Add").state("modalOpen")).toBeTruthy();

    expect(wrapper.find("div.new-row-age")).toHaveLength(1);
    expect(wrapper.find("div.new-row-id")).toHaveLength(1);
    expect(wrapper.find("div.new-row-birthDate")).toHaveLength(1);
    expect(wrapper.find("div.new-row-birthDateTime")).toHaveLength(1);
    expect(wrapper.find("div.new-row-birthTime")).toHaveLength(1);
    expect(wrapper.find("div.new-row-adult")).toHaveLength(1);
  });

  it(" without ", () => {
    global.document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document
      }
    });

    const wrapper = mount(
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        locale={locale}
        moment={moment}
      >
        <AddPureComponent
          editing
          addNewRow={addNewRow}
          columns={newColumns}
          createText=""
          createTitleText=""
          createCancelText=""
          createSubmitText=""
        />
      </MuiPickersUtilsProvider>
    );

    expect(wrapper.state("modalOpen")).toBeFalsy();

    const addRowButton = wrapper.find("button.add-row-icon");
    addRowButton.simulate("click");
    expect(wrapper.find("Add").state("modalOpen")).toBeTruthy();

    wrapper
      .find("div.new-row-age")
      .find("input")
      .simulate("change", { target: { value: "75" } });
    expect(wrapper.find("Add").state("newRow")).toEqual({ age: 75 });

    wrapper
      .find("div.new-row-age")
      .find("input")
      .simulate("change", { target: { value: "150" } });

    expect(wrapper.find("Add").state()).toEqual({
      buttonDisabled: true,
      modalOpen: true,
      newRow: { age: 150 },
      errors: ["age"],
      requiredVal: []
    });

    wrapper
      .find("div.new-row-age")
      .find("input")
      .simulate("change", { target: { value: "90" } });

    expect(wrapper.find("Add").state()).toEqual({
      buttonDisabled: false,
      modalOpen: true,
      newRow: { age: 90 },
      errors: [],
      requiredVal: []
    });
  });
});
