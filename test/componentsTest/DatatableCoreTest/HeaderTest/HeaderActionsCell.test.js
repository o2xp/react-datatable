import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import HeaderActionsCell, {
  HeaderActionsCell as HeaderActionsCellPureComponent
} from "../../../../src/components/DatatableCore/Header/HeaderActionsCell";
import { storeSample } from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore(storeSample);

const column = {
  id: "o2xpActions",
  label: "Actions",
  colSize: "150px",
  editable: false
};

describe("HeaderActionsCell component", () => {
  it("connected should render without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <HeaderActionsCell column={column} />
      </Provider>
    );
    expect(wrapper.find("Connect(HeaderActionsCell)")).toHaveLength(1);
  });

  describe("pure Component should render a div", () => {
    it("without .scrolling-shadow when no scrolling", () => {
      const wrapper = shallow(
        <HeaderActionsCellPureComponent isScrolling={false} column={column} />
      );
      expect(wrapper.find(".Table-Header-Cell.action")).toHaveLength(1);
    });

    it("with .scrolling-shadow when scrolling", () => {
      const wrapper = shallow(
        <HeaderActionsCellPureComponent isScrolling column={column} />
      );
      expect(
        wrapper.find(".Table-Header-Cell.action.scrolling-shadow")
      ).toHaveLength(1);
    });
  });
});
