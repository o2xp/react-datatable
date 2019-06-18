import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import Search, {
  Search as SearchPureComponent
} from "../../../../src/components/DatatableHeader/Widgets/Search";
import { storeSample } from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeSample);
const search = jest.fn();

describe("Search component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(wrapper.find("Connect(Search)")).toHaveLength(1);
  });

  it("connected should mount without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const button = wrapper.find("button.search-icon");
    button.simulate("click");
    wrapper
      .find("div.search-input input")
      .simulate("change", { target: { value: "Hunt" } });

    expect(wrapper.find("Connect(Search)")).toHaveLength(1);
  });

  describe("click on search button", () => {
    const wrapper = mount(<SearchPureComponent search={search} canSearch />);
    const button = wrapper.find("button.search-icon");

    it("should open input", () => {
      button.simulate("click");
      expect(wrapper.state("openSearch")).toBeTruthy();
    });

    it("should not close input if user search", () => {
      wrapper
        .find("div.search-input input")
        .simulate("change", { target: { value: "sd" } });
      button.simulate("click");
      expect(wrapper.state("openSearch")).toBeTruthy();
    });

    it("should close input", () => {
      wrapper
        .find("div.search-input input")
        .simulate("change", { target: { value: "" } });
      button.simulate("click");
      expect(wrapper.state("openSearch")).toBeFalsy();
    });
  });

  describe("type in search input", () => {
    const wrapper = mount(<SearchPureComponent search={search} canSearch />);
    const button = wrapper.find("button.search-icon");
    button.simulate("click");

    it("should call function and change state value", () => {
      wrapper
        .find("div.search-input input")
        .simulate("change", { target: { value: "Hunt" } });

      expect(search).toHaveBeenCalled();
      expect(wrapper.state("searchValue")).toEqual("Hunt");
    });
  });
});
