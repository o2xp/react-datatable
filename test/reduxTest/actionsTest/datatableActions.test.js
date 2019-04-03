import * as actions from "../../../src/redux/actions/datatableActions";
import sample1 from "../../data/samples";

describe("Datatable actions", () => {
  it("should create an action to initialize options", () => {
    const payload = sample1;
    const expectedAction = {
      type: "INITIALIZE_OPTIONS",
      payload
    };
    expect(actions.initializeOptions(payload)).toEqual(expectedAction);
  });

  it("should create an action to update options", () => {
    const payload = sample1;
    const expectedAction = {
      type: "UPDATE",
      payload
    };
    expect(actions.updateOptions(payload)).toEqual(expectedAction);
  });
});
