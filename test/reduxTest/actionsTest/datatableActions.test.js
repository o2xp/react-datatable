import * as actions from "../../../src/redux/actions/datatableActions";
import { simpleOptionsSample } from "../../../data/samples";

describe("Datatable actions should create an action to", () => {
  it("initialize options", () => {
    const payload = simpleOptionsSample;
    const expectedAction = {
      type: "INITIALIZE_OPTIONS",
      payload
    };
    expect(actions.initializeOptions(payload)).toEqual(expectedAction);
  });

  it("update options", () => {
    const payload = simpleOptionsSample;
    const expectedAction = {
      type: "UPDATE",
      payload
    };
    expect(actions.updateOptions(payload)).toEqual(expectedAction);
  });

  it("update component size", () => {
    const expectedAction = {
      type: "UPDATE_COMPONENT_SIZE"
    };
    expect(actions.updateComponentSize()).toEqual(expectedAction);
  });

  it("sort columns", () => {
    const columnsOrder = ["id", "age", "name", "adult"];
    const payload = { columnsOrder, oldIndex: 0, newIndex: 2 };
    const expectedAction = {
      type: "SORT_COLUMNS",
      payload
    };
    expect(actions.sortColumns(payload)).toEqual(expectedAction);
  });

  it("set rows per page", () => {
    const payload = 25;
    const expectedAction = {
      type: "SET_ROWS_PER_PAGE",
      payload
    };
    expect(actions.setRowsPerPage(payload)).toEqual(expectedAction);
  });

  it("set page", () => {
    const payload = 2;
    const expectedAction = {
      type: "SET_PAGE",
      payload
    };
    expect(actions.setPage(payload)).toEqual(expectedAction);
  });

  it("set scrolling", () => {
    const payload = true;
    const expectedAction = {
      type: "SET_IS_SCROLLING",
      payload
    };
    expect(actions.setIsScrolling(payload)).toEqual(expectedAction);
  });

  it("add a row to edited", () => {
    const payload = {
      index: 0,
      id: "5cd9307025f4f0572995990f",
      name: "Hunt Valdez",
      age: 2,
      adult: false,
      birthDate: "2017-06-02T11:22",
      iban: "",
      eyeColor: "green"
    };
    const expectedAction = {
      type: "ADD_ROW_EDITED",
      payload
    };
    expect(actions.addRowEdited(payload)).toEqual(expectedAction);
  });

  it("set an edited row", () => {
    const payload = {
      columnId: "age",
      rowId: "5cd9307025f4f0572995990f",
      newValue: 50,
      error: false
    };
    const expectedAction = {
      type: "SET_ROW_EDITED",
      payload
    };
    expect(actions.setRowEdited(payload)).toEqual(expectedAction);
  });
});
