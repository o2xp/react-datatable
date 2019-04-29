import * as actions from "../../../src/redux/actions/datatableActions";
import { simpleOptionsSample } from "../../../data/samples";

describe("Datatable actions", () => {
  it("should create an action to initialize options", () => {
    const payload = simpleOptionsSample;
    const expectedAction = {
      type: "INITIALIZE_OPTIONS",
      payload
    };
    expect(actions.initializeOptions(payload)).toEqual(expectedAction);
  });

  it("should create an action to update options", () => {
    const payload = simpleOptionsSample;
    const expectedAction = {
      type: "UPDATE",
      payload
    };
    expect(actions.updateOptions(payload)).toEqual(expectedAction);
  });

  it("should create an action to update component size", () => {
    const expectedAction = {
      type: "UPDATE_COMPONENT_SIZE"
    };
    expect(actions.updateComponentSize()).toEqual(expectedAction);
  });

  it("should create an action to sort columns", () => {
    const columnsOrder = ["id", "age", "name", "adult"];
    const payload = { columnsOrder, oldIndex: 0, newIndex: 2 };
    const expectedAction = {
      type: "SORT_COLUMNS",
      payload
    };
    expect(actions.sortColumns(payload)).toEqual(expectedAction);
  });

  it("should create an action to set rows per page", () => {
    const payload = 25;
    const expectedAction = {
      type: "SET_ROWS_PER_PAGE",
      payload
    };
    expect(actions.setRowsPerPage(payload)).toEqual(expectedAction);
  });

  it("should create an action to set page", () => {
    const payload = 2;
    const expectedAction = {
      type: "SET_PAGE",
      payload
    };
    expect(actions.setPage(payload)).toEqual(expectedAction);
  });
});
