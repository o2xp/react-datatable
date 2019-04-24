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
});
