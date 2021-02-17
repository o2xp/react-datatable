import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import { Dialog } from "@material-ui/core";
import RefreshRows, {
  RefreshRows as RefreshRowsPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/RefreshRows";
import { storeSample } from "../../../../data/samples";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  ...storeSample,
  datatableReducer: { ...storeSample.datatableReducer, refreshRows: jest.fn() }
});

const { datatableReducer } = storeSample;
const { rows } = datatableReducer.data;

describe("RefreshRows component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <RefreshRows />
      </Provider>
    );
    expect(wrapper.find("Connect(RefreshRows)")).toHaveLength(1);
  });

  it("connected should mount without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <RefreshRows />
      </Provider>
    );
    const button = wrapper.find("button.refresh-icon");
    button.simulate("click");
    expect(wrapper.find("Connect(RefreshRows)")).toHaveLength(1);
  });

  it("on button click should call refresh", () => {
    const refreshRows = jest.fn();
    const refreshRowsUser = jest.fn();
    const wrapper = mount(
      <RefreshRowsPureComponent
        refreshRows={refreshRows}
        refreshRowsUser={refreshRowsUser}
        isRefreshing={false}
        searchTerm=""
        rowsSelected={[]}
        rowsEdited={[]}
        refreshText="Refresh"
      />
    );

    const spy = jest.spyOn(wrapper.instance(), "refresh");
    const button = wrapper.find("button.refresh-icon");
    button.simulate("click");

    expect(spy).toHaveBeenCalled();
  });

  it("refresh button should be disabled if its refreshing", () => {
    const refreshRows = jest.fn();
    const refreshRowsUser = jest.fn();
    const wrapper = mount(
      <RefreshRowsPureComponent
        refreshRows={refreshRows}
        refreshRowsUser={refreshRowsUser}
        isRefreshing
        searchTerm=""
        rowsSelected={[]}
        rowsEdited={[]}
        refreshText="Refresh"
      />
    );

    const button = wrapper.find("button.refresh-icon");
    expect(button.props().disabled).toBeTruthy();
  });

  describe("on button click should", () => {
    const refreshRows = jest.fn();
    const refreshRowsUser = jest.fn();
    const wrapper = mount(
      <RefreshRowsPureComponent
        refreshRows={refreshRows}
        refreshRowsUser={refreshRowsUser}
        isRefreshing={false}
        searchTerm="hunt"
        rowsSelected={[rows[0]]}
        rowsEdited={[rows[1]]}
        refreshText="Refresh"
      />
    );

    const button = wrapper.find("button.refresh-icon");
    button.simulate("click");

    describe("open dialog", () => {
      it("", () => {
        expect(wrapper.state("dialogOpen")).toBeTruthy();
      });
      describe("and display error", () => {
        it("search message", () => {
          expect(wrapper.find("li.error-search")).toHaveLength(1);
        });
        it("rows selected", () => {
          expect(wrapper.find("li.error-rows-selected")).toHaveLength(1);
        });
        it("rows edited", () => {
          expect(wrapper.find("li.error-rows-edited")).toHaveLength(1);
        });
      });
      describe("click on", () => {
        it("cancel should close modal", () => {
          const cancel = wrapper.find("button.cancel-refresh");
          cancel.simulate("click");
          expect(wrapper.state("dialogOpen")).toBeFalsy();
        });
        describe("refresh should", () => {
          it("close modal", () => {
            const refresh = wrapper.find("button.force-refresh");
            button.simulate("click");
            refresh.simulate("click");
            expect(wrapper.state("dialogOpen")).toBeFalsy();
          });
        });
        it("close icon should close modal", () => {
          const close = wrapper.find("button.close-icon");
          button.simulate("click");
          close.simulate("click");
          expect(wrapper.state("dialogOpen")).toBeFalsy();
        });
        it("click away should close modal", () => {
          button.simulate("click");
          wrapper
            .find(Dialog)
            .props()
            .onClose();
          expect(wrapper.state("dialogOpen")).toBeFalsy();
        });
      });
    });
  });
});
