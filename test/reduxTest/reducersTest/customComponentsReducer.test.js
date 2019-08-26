import equal from "fast-deep-equal";
import customComponentsReducer from "../../../src/redux/reducers/customComponentsReducer";
import {
  customTableBodyRowSample,
  customTableBodyCellSample,
  customTableHeaderRowSample,
  customTableHeaderCellSample,
  customDataTypesSample
} from "../../../data/samples";

const defaultState = {
  CustomTableBodyCell: null,
  CustomTableBodyRow: null,
  CustomTableHeaderCell: null,
  CustomTableHeaderRow: null,
  customDataTypes: [],
  customProps: null
};

describe("componentReducer reducer", () => {
  it("should return the initial state", () => {
    expect(customComponentsReducer(undefined, {})).toEqual(defaultState);
  });

  describe("should handle INITIALIZE_CUSTOM_COMPONENTS action with", () => {
    describe("custom table body", () => {
      it("row", () => {
        const newState = defaultState;
        defaultState.CustomTableBodyRow = customTableBodyRowSample;
        newState.CustomTableBodyRow = customTableBodyRowSample;

        const initializedCustomTableBodyRow = customComponentsReducer(
          undefined,
          {
            type: "INITIALIZE_CUSTOM_COMPONENTS",
            payload: newState
          }
        );

        expect(equal(initializedCustomTableBodyRow, defaultState)).toBeTruthy();
      });

      it("cell", () => {
        const newState = defaultState;
        defaultState.CustomTableBodyCell = customTableBodyCellSample;
        newState.CustomTableBodyCell = customTableBodyCellSample;

        const initializedCustomTableBodyCell = customComponentsReducer(
          undefined,
          {
            type: "INITIALIZE_CUSTOM_COMPONENTS",
            payload: newState
          }
        );

        expect(
          equal(initializedCustomTableBodyCell, defaultState)
        ).toBeTruthy();
      });
    });

    describe("custom table header", () => {
      it("row", () => {
        const newState = defaultState;
        defaultState.CustomTableHeaderRow = customTableHeaderRowSample;
        newState.CustomTableHeaderRow = customTableHeaderRowSample;

        const initializedCustomTableHeaderRow = customComponentsReducer(
          undefined,
          {
            type: "INITIALIZE_CUSTOM_COMPONENTS",
            payload: newState
          }
        );

        expect(
          equal(initializedCustomTableHeaderRow, defaultState)
        ).toBeTruthy();
      });

      it("cell", () => {
        const newState = defaultState;
        defaultState.CustomTableHeaderCell = customTableHeaderCellSample;
        newState.CustomTableHeaderCell = customTableHeaderCellSample;

        const initializedCustomTableHeaderCell = customComponentsReducer(
          undefined,
          {
            type: "INITIALIZE_CUSTOM_COMPONENTS",
            payload: newState
          }
        );

        expect(
          equal(initializedCustomTableHeaderCell, defaultState)
        ).toBeTruthy();
      });
    });

    it("custom dataType", () => {
      const newState = defaultState;
      defaultState.customDataTypes = customDataTypesSample;
      newState.customDataTypes = customDataTypesSample;

      const initializedCustomDataTypes = customComponentsReducer(undefined, {
        type: "INITIALIZE_CUSTOM_COMPONENTS",
        payload: newState
      });

      expect(equal(initializedCustomDataTypes, defaultState)).toBeTruthy();
    });

    it("multiple custom components", () => {
      const newState = defaultState;
      defaultState.CustomTableHeaderCell = customTableHeaderCellSample;
      newState.CustomTableHeaderCell = customTableHeaderCellSample;
      defaultState.CustomTableBodyRow = customTableBodyRowSample;
      newState.CustomTableBodyRow = customTableBodyRowSample;
      defaultState.customDataTypes = customDataTypesSample;
      newState.customDataTypes = customDataTypesSample;

      const initializedMultipleCustomComponents = customComponentsReducer(
        undefined,
        {
          type: "INITIALIZE_CUSTOM_COMPONENTS",
          payload: newState
        }
      );

      expect(
        equal(initializedMultipleCustomComponents, defaultState)
      ).toBeTruthy();
    });
  });
});
