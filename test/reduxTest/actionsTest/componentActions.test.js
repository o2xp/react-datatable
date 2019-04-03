import React from "react";
import * as actions from "../../../src/redux/actions/componentActions";

describe("Component actions", () => {
  it("should create an action to initialize cuztomised components", () => {
    const payload = <div>Test</div>;
    const expectedAction = {
      type: "INITIALIZE_CUSTOMIZED_COMPONENTS",
      payload
    };
    expect(actions.initializeCustomizedComponents(payload)).toEqual(
      expectedAction
    );
  });

  it("should create an action to update cuztomised components", () => {
    const payload = <div>Test</div>;
    const expectedAction = {
      type: "UPDATE_CUSTOMIZED_COMPONENTS",
      payload
    };
    expect(actions.updateCustomizedComponents(payload)).toEqual(expectedAction);
  });
});
