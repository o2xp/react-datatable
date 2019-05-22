import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import BodyActionsCell, {
  BodyActionsCell as BodyActionsCellPureComponent
} from "../../../../src/components/DatatableCore/Body/BodyActionsCell";
import { storeSample } from "../../../../data/samples";
import { customVariant } from "../../../../src/components/MuiTheme";

const mockStore = configureStore();
const store = mockStore(storeSample);
const addRowEdited = jest.fn();
const saveRowEdited = jest.fn();
const column = {
  id: "actions",
  label: "Actions",
  colSize: "150px",
  editable: false
};

const row = {
  index: 0,
  id: "5cd9307025f4f0572995990f",
  name: "Hunt Valdez",
  age: 2,
  adult: false,
  birthDate: "2017-06-02T11:22",
  iban: "",
  eyeColor: "green"
};

describe("BodyActionsCell component", () => {
  it("connected should render without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BodyActionsCell column={column} row={row} editing={false} />
      </Provider>
    );
    expect(wrapper.find("Connect(BodyActionsCell)")).toHaveLength(1);
  });

  describe("pure Component should render a div", () => {
    it("without .scrolling-shadow when no scrolling", () => {
      const wrapper = shallow(
        <BodyActionsCellPureComponent
          isScrolling={false}
          canEdit
          canDelete
          rowsSelectable
          addRowEdited={addRowEdited}
          saveRowEdited={saveRowEdited}
          column={column}
          row={row}
          editing={false}
          classes={{ customVariant }}
        />
      );
      expect(wrapper.find(".Table-Cell.action")).toHaveLength(1);
    });

    it("with .scrolling-shadow when scrolling", () => {
      const wrapper = shallow(
        <BodyActionsCellPureComponent
          isScrolling
          canEdit
          canDelete
          rowsSelectable
          addRowEdited={addRowEdited}
          saveRowEdited={saveRowEdited}
          column={column}
          row={row}
          editing={false}
          classes={{ customVariant }}
        />
      );
      expect(wrapper.find(".Table-Cell.action.scrolling-shadow")).toHaveLength(
        1
      );
    });

    describe("without", () => {
      it("Edit button", () => {
        const wrapper = mount(
          <BodyActionsCellPureComponent
            isScrolling
            canEdit={false}
            canDelete
            rowsSelectable
            addRowEdited={addRowEdited}
            saveRowEdited={saveRowEdited}
            column={column}
            row={row}
            editing={false}
            classes={{ customVariant }}
          />
        );
        expect(wrapper.find("button.edit")).toHaveLength(0);
        expect(wrapper.find("button.delete")).toHaveLength(1);
        expect(wrapper.find("span.select")).toHaveLength(1);
      });

      it("Delete button", () => {
        const wrapper = mount(
          <BodyActionsCellPureComponent
            isScrolling
            canEdit
            canDelete={false}
            rowsSelectable
            addRowEdited={addRowEdited}
            saveRowEdited={saveRowEdited}
            column={column}
            row={row}
            editing={false}
            classes={{ customVariant }}
          />
        );
        expect(wrapper.find("button.edit")).toHaveLength(1);
        expect(wrapper.find("button.delete")).toHaveLength(0);
        expect(wrapper.find("span.select")).toHaveLength(1);
      });

      it("Select checkbox", () => {
        const wrapper = mount(
          <BodyActionsCellPureComponent
            isScrolling
            canEdit
            canDelete
            rowsSelectable={false}
            addRowEdited={addRowEdited}
            saveRowEdited={saveRowEdited}
            column={column}
            row={row}
            editing={false}
            classes={{ customVariant }}
          />
        );
        expect(wrapper.find("button.edit")).toHaveLength(1);
        expect(wrapper.find("button.delete")).toHaveLength(1);
        expect(wrapper.find("span.select")).toHaveLength(0);
      });
    });
  });

  describe("click on", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BodyActionsCell column={column} row={row} editing={false} />
      </Provider>
    );

    describe("edit button", () => {
      const editButton = wrapper.find("button.edit");
      it("should dispatch action type ADD_ROW_EDITED", () => {
        editButton.simulate("click");
        const action = store.getActions()[0];
        expect(action.type).toEqual("ADD_ROW_EDITED");
      });

      it("should dispatch action width payload", () => {
        editButton.simulate("click");
        const action = store.getActions()[0];
        expect(action.payload).toEqual(row);
      });
    });
  });
});
