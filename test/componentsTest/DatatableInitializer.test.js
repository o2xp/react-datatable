import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import DatatableContainer from "../../src/components/DatatableContainer";
import DatatableInitializer, {
  DatatableInitializer as DatatableInitializerPureComponent
} from "../../src/components/DatatableInitializer";
import { storeSample, simpleOptionsSample } from "../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeSample);

describe("Datatable initializer component", () => {
  it("connected should render without errors", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DatatableInitializer />
      </Provider>
    );
    expect(wrapper.find("Connect(DatatableInitializer)")).toHaveLength(1);
  });

  it("should render DatatableInitializer component", () => {
    const wrapper = mount(
      <Provider store={store}>
        <DatatableInitializer optionsInit={simpleOptionsSample} />
      </Provider>
    );
    expect(wrapper.find(DatatableContainer)).toHaveLength(1);
  });

  it("should call componentDidMount", () => {
    const componentDidMount = jest.spyOn(
      DatatableInitializerPureComponent.prototype,
      "componentDidMount"
    );

    mount(
      <Provider store={store}>
        <DatatableInitializer optionsInit={simpleOptionsSample} />
      </Provider>
    );

    global.innerWidth = 30000;
    global.dispatchEvent(new Event("resize"));

    expect(componentDidMount).toHaveBeenCalledTimes(1);
  });

  it("should call componentWillUnmount", () => {
    const componentWillUnmount = jest.spyOn(
      DatatableInitializerPureComponent.prototype,
      "componentWillUnmount"
    );

    const wrapper = mount(
      <Provider store={store}>
        <DatatableInitializer optionsInit={simpleOptionsSample} />
      </Provider>
    );
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });
});
