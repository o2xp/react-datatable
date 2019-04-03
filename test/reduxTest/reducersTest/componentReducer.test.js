import componentReducer from "../../../src/redux/reducers/componentReducer";

describe("componentReducer reducer", () => {
  it("should return the initial state", () => {
    expect(componentReducer(undefined, {})).toEqual({
      header: null,
      body: null,
      footer: null
    });
  });
});
