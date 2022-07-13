import React from "react";
import configureStore from "redux-mock-store";
import { MenuItem } from "@material-ui/core";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import ColumnsDisplayer, {
  ColumnsDisplayer as ColumnsDisplayerPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/ColumnsDisplayer";
import { storeSample } from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeSample);
const setColumnVisibilty = jest.fn();
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

  describe("click on element should", () => {
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
});
