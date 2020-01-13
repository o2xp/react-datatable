import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";
import BodyActionsCell, {
  BodyActionsCell as BodyActionsCellPureComponent
} from "../../../../src/components/DatatableCore/Body/BodyActionsCell";
import { storeSample } from "../../../../data/samples";
import { customVariant } from "../../../../src/components/MuiTheme";

const mockStore = configureStore();
const store = mockStore({
  ...storeSample,
  datatableReducer: {
    ...storeSample.datatableReducer,
    features: { ...storeSample.datatableReducer.features, canDuplicate: true }
  }
});
const addRowEdited = jest.fn();
const saveRowEdited = jest.fn();
const revertRowEdited = jest.fn();
const addToDeleteRow = jest.fn();
const deleteRow = jest.fn();
const selectRow = jest.fn();
const duplicateRow = jest.fn();
const column = {
  id: "o2xpActions",
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

const style = {
  backgroundColor: "#fff"
};

describe("BodyActionsCell component", () => {
  it("connected should render without errors", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BodyActionsCell
          column={column}
          row={row}
          style={style}
          editing={false}
          checked={false}
        />
      </Provider>
    );
    expect(wrapper.find("Connect(BodyActionsCell)")).toHaveLength(1);
  });

  describe("pure Component should render a div", () => {
    it("without .scrolling-shadow when no scrolling", () => {
      const wrapper = shallow(
        <BodyActionsCellPureComponent
          isScrolling={false}
          keyColumn="id"
          canEdit
          canDelete
          canSelectRow
          rowsEdited={[]}
          addRowEdited={addRowEdited}
          addToDeleteRow={addToDeleteRow}
          saveRowEdited={saveRowEdited}
          revertRowEdited={revertRowEdited}
          deleteRow={deleteRow}
          selectRow={selectRow}
          duplicateRow={duplicateRow}
          column={column}
          row={row}
          style={style}
          editing={false}
          canGlobalEdit={false}
          checked={false}
          canDuplicate={false}
          classes={{ customVariant }}
          additionalActions={[]}
          editText="Edit"
          saveText="Save"
          clearText="Undo"
          duplicateText="Duplicate"
          deleteText="Delete"
          confirmDeleteText="Confirm delete"
          cancelDeleteText="Cancel delete"
        />
      );
      expect(wrapper.find(".Table-Cell.action")).toHaveLength(1);
    });

    it("with .scrolling-shadow when scrolling", () => {
      const wrapper = shallow(
        <BodyActionsCellPureComponent
          isScrolling
          keyColumn="id"
          canEdit
          canDelete
          canSelectRow
          rowsEdited={[]}
          addRowEdited={addRowEdited}
          addToDeleteRow={addToDeleteRow}
          saveRowEdited={saveRowEdited}
          revertRowEdited={revertRowEdited}
          deleteRow={deleteRow}
          selectRow={selectRow}
          duplicateRow={duplicateRow}
          column={column}
          row={row}
          style={style}
          editing={false}
          canGlobalEdit={false}
          checked={false}
          canDuplicate={false}
          classes={{ customVariant }}
          additionalActions={[]}
          editText="Edit"
          saveText="Save"
          clearText="Undo"
          duplicateText="Duplicate"
          deleteText="Delete"
          confirmDeleteText="Confirm delete"
          cancelDeleteText="Cancel delete"
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
            keyColumn="id"
            canEdit={false}
            canDelete
            canSelectRow
            rowsEdited={[]}
            addRowEdited={addRowEdited}
            addToDeleteRow={addToDeleteRow}
            saveRowEdited={saveRowEdited}
            revertRowEdited={revertRowEdited}
            deleteRow={deleteRow}
            selectRow={selectRow}
            duplicateRow={duplicateRow}
            column={column}
            row={row}
            style={style}
            editing={false}
            canGlobalEdit={false}
            checked={false}
            canDuplicate={false}
            classes={{ customVariant }}
            additionalActions={[]}
            editText="Edit"
            saveText="Save"
            clearText="Undo"
            duplicateText="Duplicate"
            deleteText="Delete"
            confirmDeleteText="Confirm delete"
            cancelDeleteText="Cancel delete"
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
            keyColumn="id"
            canEdit
            canDelete={false}
            canSelectRow
            rowsEdited={[]}
            addRowEdited={addRowEdited}
            addToDeleteRow={addToDeleteRow}
            saveRowEdited={saveRowEdited}
            revertRowEdited={revertRowEdited}
            deleteRow={deleteRow}
            selectRow={selectRow}
            duplicateRow={duplicateRow}
            column={column}
            row={row}
            style={style}
            editing={false}
            canGlobalEdit={false}
            checked={false}
            canDuplicate={false}
            classes={{ customVariant }}
            additionalActions={[]}
            editText="Edit"
            saveText="Save"
            clearText="Undo"
            duplicateText="Duplicate"
            deleteText="Delete"
            confirmDeleteText="Confirm delete"
            cancelDeleteText="Cancel delete"
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
            keyColumn="id"
            canEdit
            canDelete
            canSelectRow={false}
            rowsEdited={[]}
            addRowEdited={addRowEdited}
            addToDeleteRow={addToDeleteRow}
            saveRowEdited={saveRowEdited}
            revertRowEdited={revertRowEdited}
            deleteRow={deleteRow}
            selectRow={selectRow}
            duplicateRow={duplicateRow}
            column={column}
            row={row}
            style={style}
            editing={false}
            canGlobalEdit={false}
            checked={false}
            canDuplicate={false}
            classes={{ customVariant }}
            additionalActions={[]}
            editText="Edit"
            saveText="Save"
            clearText="Undo"
            duplicateText="Duplicate"
            deleteText="Delete"
            confirmDeleteText="Confirm delete"
            cancelDeleteText="Cancel delete"
          />
        );
        expect(wrapper.find("button.edit")).toHaveLength(1);
        expect(wrapper.find("button.delete")).toHaveLength(1);
        expect(wrapper.find("span.select")).toHaveLength(0);
      });
    });
  });

  it("should render dupplication action button", () => {
    const pure = mount(
      <BodyActionsCellPureComponent
        isScrolling={false}
        keyColumn="id"
        canEdit
        canDelete
        canSelectRow
        rowsEdited={[]}
        addRowEdited={addRowEdited}
        addToDeleteRow={addToDeleteRow}
        saveRowEdited={saveRowEdited}
        revertRowEdited={revertRowEdited}
        deleteRow={deleteRow}
        selectRow={selectRow}
        duplicateRow={duplicateRow}
        column={column}
        row={row}
        style={style}
        editing={false}
        canGlobalEdit={false}
        checked={false}
        canDuplicate={false}
        classes={{ customVariant }}
        editText="Edit"
        saveText="Save"
        clearText="Undo"
        duplicateText="Duplicate"
        deleteText="Delete"
        confirmDeleteText="Confirm delete"
        cancelDeleteText="Cancel delete"
        additionalActions={[
          {
            title: "Coffee",
            icon: <CallSplitIcon />,
            onClick: res => res
          }
        ]}
      />
    );

    const button = pure.find("button.additional-action-icon-Coffee");
    button.simulate("click");
    expect(button).toHaveLength(1);
  });

  describe("click on", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BodyActionsCell
          column={column}
          row={row}
          style={style}
          editing={false}
          checked={false}
        />
      </Provider>
    );

    const wrapperEditMode = mount(
      <Provider store={store}>
        <BodyActionsCell
          column={column}
          row={{ ...row, idOfColumnErr: [], hasBeenEdited: false }}
          style={style}
          editing
          checked={false}
        />
      </Provider>
    );

    const wrapperEdited = mount(
      <Provider store={store}>
        <BodyActionsCell
          column={column}
          row={{ ...row, idOfColumnErr: [], hasBeenEdited: true }}
          style={style}
          editing
          checked={false}
        />
      </Provider>
    );

    describe("edit button", () => {
      const editButton = wrapper.find("button.edit");
      it("should dispatch action type ADD_ROW_EDITED", () => {
        editButton.simulate("click");
        const action = store.getActions()[0];
        expect(action.type).toEqual("ADD_ROW_EDITED");
      });

      it("should dispatch action with payload", () => {
        editButton.simulate("click");
        const action = store.getActions()[1];
        expect(action.payload).toEqual(row);
      });
    });

    describe("save button", () => {
      const saveButton = wrapperEdited.find("button.save");
      const saveButtonDisabled = wrapperEditMode.find("button.save");
      it("should be disabled", () => {
        expect(saveButtonDisabled.props().disabled).toBeTruthy();
      });

      it("should be enabled", () => {
        expect(saveButton.props().disabled).toBeFalsy();
      });

      it("should dispatch action type SAVE_ROW_EDITED", () => {
        saveButton.simulate("click");
        const action = store.getActions()[2];
        expect(action.type).toEqual("SAVE_ROW_EDITED");
      });

      it("should dispatch action with payload", () => {
        saveButton.simulate("click");
        const action = store.getActions()[3];
        expect(action.payload).toEqual({
          ...row,
          idOfColumnErr: [],
          hasBeenEdited: true
        });
      });
    });

    describe("revert button", () => {
      const revertButton = wrapperEdited.find("button.revert");
      it("should dispatch action type REVERT_ROW_EDITED", () => {
        revertButton.simulate("click");
        const action = store.getActions()[4];
        expect(action.type).toEqual("REVERT_ROW_EDITED");
      });

      it("should dispatch action with payload", () => {
        revertButton.simulate("click");
        const action = store.getActions()[5];
        expect(action.payload).toEqual({
          ...row,
          idOfColumnErr: [],
          hasBeenEdited: true
        });
      });

      describe("duplicate button", () => {
        const duplicateButton = wrapper.find("button.duplicate-icon");
        it("should dispatch action type DUPLICATE_ROW", () => {
          duplicateButton.simulate("click");
          const action = store.getActions()[6];
          expect(action.type).toEqual("DUPLICATE_ROW");
        });

        it("should dispatch action with payload", () => {
          duplicateButton.simulate("click");
          const action = store.getActions()[7];
          expect(action.payload).toEqual(row);
        });
      });
    });

    describe("delete button", () => {
      const pure = mount(
        <BodyActionsCellPureComponent
          isScrolling={false}
          keyColumn="id"
          canEdit
          canDelete
          canSelectRow
          rowsEdited={[]}
          addRowEdited={addRowEdited}
          addToDeleteRow={addToDeleteRow}
          saveRowEdited={saveRowEdited}
          revertRowEdited={revertRowEdited}
          deleteRow={deleteRow}
          selectRow={selectRow}
          duplicateRow={duplicateRow}
          column={column}
          row={row}
          style={style}
          editing={false}
          canGlobalEdit={false}
          checked={false}
          canDuplicate={false}
          classes={{ customVariant }}
          additionalActions={[]}
          editText="Edit"
          saveText="Save"
          clearText="Undo"
          duplicateText="Duplicate"
          deleteText="Delete"
          confirmDeleteText="Confirm delete"
          cancelDeleteText="Cancel delete"
        />
      );

      describe("should set deleting to ", () => {
        const deleteButton = pure.find("button.delete");
        it("true", () => {
          deleteButton.simulate("click");
          expect(pure.state()).toEqual({ deleting: true });
        });

        it("false on cancel", () => {
          deleteButton.simulate("click");
          const cancelDeleteButton = pure.find("button.cancel-delete");
          expect(pure.state()).toEqual({ deleting: true });
          cancelDeleteButton.simulate("click");
          expect(pure.state()).toEqual({ deleting: false });
        });

        it("false on delete", () => {
          deleteButton.simulate("click");
          const confirmDeleteButton = pure.find("button.confirm-delete");
          expect(pure.state()).toEqual({ deleting: true });
          confirmDeleteButton.simulate("click");
          expect(pure.state()).toEqual({ deleting: false });
        });
      });

      it("should dispatch action of type", () => {
        const deleteButton = wrapper.find("button.delete");
        deleteButton.simulate("click");
        const confirmDeleteButton = wrapper.find("button.confirm-delete");
        confirmDeleteButton.simulate("click");
        const action = store.getActions()[8];
        expect(action.type).toEqual("DELETE_ROW");
      });

      it("should dispatch action with payload", () => {
        const deleteButton = wrapper.find("button.delete");
        deleteButton.simulate("click");
        const confirmDeleteButton = wrapper.find("button.confirm-delete");
        confirmDeleteButton.simulate("click");
        const action = store.getActions()[9];
        expect(action.payload).toEqual(row);
      });
    });

    describe("checkbox", () => {
      const checkbox = wrapper.find(".select input");
      it("should dispatch action type SELECT_ROW", () => {
        checkbox.simulate("change", { target: { checked: true } });
        const action = store.getActions()[10];
        expect(action.type).toEqual("SELECT_ROW");
      });

      it("should dispatch action with payload", () => {
        checkbox.simulate("change", { target: { checked: true } });
        const action = store.getActions()[11];
        expect(action.payload).toEqual({ checked: true, row });
      });
    });
  });
});
