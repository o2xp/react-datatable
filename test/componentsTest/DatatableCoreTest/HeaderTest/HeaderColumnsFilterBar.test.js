import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { storeSample } from "../../../../data/samples";
import HeaderColumnsFilterBar from "../../../../src/components/DatatableCore/Header/HeaderColumnsFilterBar";

const mockStore = configureStore();
const store = mockStore({
  ...storeSample,
  datatableReducer: {
    ...storeSample.datatableReducer,
    features: {
      ...storeSample.datatableReducer.features
    }
  }
});

const column = {
  id: "id",
  label: "id",
  colSize: "200px",
  editable: false,
  required: true,
  dataType: "text",
  valueVerification: val => {
    const error = val === "whatever";
    const message = val === "whatever" ? "Value is not valid" : "";
    return {
      error,
      message
    };
  }
};

const filterInColumn = jest.fn();

describe("HeaderColumnsFilterBar component should filter", () => {
  it("should render component connect", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <HeaderColumnsFilterBar
          column={column}
          isRefreshing={false}
          filterInColumn={filterInColumn}
          filterTerms={{}}
        />
      </Provider>
    );
    expect(wrapper.find("Connect(HeaderColumnsFilterBar)")).toHaveLength(1);
  });

  it("a column based on a string", () => {
    const wrapper = mount(
      <Provider store={store}>
        <HeaderColumnsFilterBar
          column={column}
          isRefreshing={false}
          filterInColumn={filterInColumn}
          filterTerms={{ id: "dodo" }}
        />
      </Provider>
    );
    expect(wrapper.text()).toEqual("");
  });

});
