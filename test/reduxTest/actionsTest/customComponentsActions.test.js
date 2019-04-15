import initializeCustomComponents from "../../../src/redux/actions/customComponentsActions";

describe("Component actions", () => {
  it("should create an action to initialize cuztom components", () => {
    const payload = {
      CustomTableBodyCell: null,
      CustomTableBodyRow: null,
      CustomTableHeaderCell: null,
      CustomTableHeaderRow: null,
      customDataTypes: []
    };
    const expectedAction = {
      type: "INITIALIZE_CUSTOM_COMPONENTS",
      payload
    };
    expect(initializeCustomComponents(payload)).toEqual(expectedAction);
  });
});
