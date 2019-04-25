import equal from "fast-deep-equal";
import datatableReducer from "../../../src/redux/reducers/datatableReducer";
import {
  defaultOptionsSample,
  simpleOptionsSample,
  mergedSimpleOptionsSample,
  mergedSimpleOptionsSampleCustomSize,
  mergedSimpleOptionsSampleWidthResize,
  mergedSimpleOptionsSampleHeightResize,
  mergedSimpleOptionsSampleWidthHeightResize,
  minimumOptionsSample,
  mergedMinimumOptionsSample,
  maximumOptionsSample,
  mergedMaximumOptionsSample
} from "../../../data/samples";
import cloneObject from "../../functions";

describe("datatableReducer reducer", () => {
  it("should return the initial state", () => {
    expect(datatableReducer(undefined, {})).toEqual(defaultOptionsSample);
  });

  describe("should handle INITIALIZE_OPTIONS", () => {
    it("simple options", () => {
      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: cloneObject(simpleOptionsSample)
      });

      expect(
        equal(initializedOptions, cloneObject(mergedSimpleOptionsSample))
      ).toBeTruthy();
    });

    it("minimum options", () => {
      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: cloneObject(minimumOptionsSample)
      });

      expect(
        equal(initializedOptions, cloneObject(mergedMinimumOptionsSample))
      ).toBeTruthy();
    });

    it("maximum options", () => {
      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: cloneObject(maximumOptionsSample)
      });

      expect(
        equal(initializedOptions, cloneObject(mergedMaximumOptionsSample))
      ).toBeTruthy();
    });

    it("default colSize", () => {
      const simpleOptionsSampleNoColSize = cloneObject(simpleOptionsSample);
      const mergedSimpleOptionsSampleNoColSize = cloneObject(
        mergedSimpleOptionsSample
      );

      simpleOptionsSampleNoColSize.data.columns = simpleOptionsSampleNoColSize.data.columns.map(
        col => {
          const column = col;
          delete column.colSize;
          return column;
        }
      );

      mergedSimpleOptionsSampleNoColSize.data.columns = mergedSimpleOptionsSampleNoColSize.data.columns.map(
        col => {
          const column = col;
          column.colSize = "100px";
          return column;
        }
      );

      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: cloneObject(simpleOptionsSampleNoColSize)
      });

      expect(
        equal(
          initializedOptions,
          cloneObject(mergedSimpleOptionsSampleNoColSize)
        )
      ).toBeTruthy();
    });
  });

  describe("should handle UPDATE_COMPONENT_SIZE", () => {
    afterEach(() => {
      global.innerWidth = 1024;
      global.innerHeight = 768;
    });

    it("with initial size", () => {
      const state = datatableReducer(cloneObject(mergedSimpleOptionsSample), {
        type: "UPDATE_COMPONENT_SIZE"
      });

      expect(
        equal(state, cloneObject(mergedSimpleOptionsSampleCustomSize))
      ).toBeTruthy();
    });

    it("with width resize", () => {
      global.innerWidth = 2000;

      const state = datatableReducer(cloneObject(mergedSimpleOptionsSample), {
        type: "UPDATE_COMPONENT_SIZE"
      });

      expect(
        equal(state, cloneObject(mergedSimpleOptionsSampleWidthResize))
      ).toBeTruthy();
    });

    it("with height resize", () => {
      global.innerHeight = 500;

      const state = datatableReducer(cloneObject(mergedSimpleOptionsSample), {
        type: "UPDATE_COMPONENT_SIZE"
      });

      expect(
        equal(state, cloneObject(mergedSimpleOptionsSampleHeightResize))
      ).toBeTruthy();
    });

    it("with height and width resize", () => {
      global.innerWidth = 2000;
      global.innerHeight = 500;

      const state = datatableReducer(cloneObject(mergedSimpleOptionsSample), {
        type: "UPDATE_COMPONENT_SIZE"
      });

      expect(
        equal(state, cloneObject(mergedSimpleOptionsSampleWidthHeightResize))
      ).toBeTruthy();
    });
  });

  describe("should handle SORT_COLUMNS", () => {
    it("with negative new index", () => {
      const {
        columnsOrder
      } = mergedSimpleOptionsSample.features.userConfiguration;

      const payload = { columnsOrder, oldIndex: 1, newIndex: -5 };

      const sortedColums = datatableReducer(
        cloneObject(mergedSimpleOptionsSample),
        {
          type: "SORT_COLUMNS",
          payload
        }
      );

      expect(
        equal(sortedColums, cloneObject(mergedSimpleOptionsSample))
      ).toBeTruthy();
    });

    it("with one movement", () => {
      const {
        columnsOrder
      } = mergedSimpleOptionsSample.features.userConfiguration;

      const payload = { columnsOrder, oldIndex: 1, newIndex: 2 };

      const sortedColums = datatableReducer(
        cloneObject(mergedSimpleOptionsSample),
        {
          type: "SORT_COLUMNS",
          payload
        }
      );

      const mergedSimpleOptionsSampleSortColumns = cloneObject(
        mergedSimpleOptionsSample
      );

      mergedSimpleOptionsSampleSortColumns.features.userConfiguration.columnsOrder = [
        "id",
        "age",
        "name",
        "adult",
        "birthDate",
        "iban"
      ];
      expect(
        equal(sortedColums, mergedSimpleOptionsSampleSortColumns)
      ).toBeTruthy();
    });

    it("with multiples movements", () => {
      const {
        columnsOrder
      } = mergedSimpleOptionsSample.features.userConfiguration;

      let payload = { columnsOrder, oldIndex: 1, newIndex: 2 };

      let sortedColums = datatableReducer(
        cloneObject(mergedSimpleOptionsSample),
        {
          type: "SORT_COLUMNS",
          payload
        }
      );

      payload = { columnsOrder, oldIndex: 0, newIndex: 3 };

      sortedColums = datatableReducer(sortedColums, {
        type: "SORT_COLUMNS",
        payload
      });

      const mergedSimpleOptionsSampleSortColumns = cloneObject(
        mergedSimpleOptionsSample
      );

      mergedSimpleOptionsSampleSortColumns.features.userConfiguration.columnsOrder = [
        "age",
        "name",
        "adult",
        "id",
        "birthDate",
        "iban"
      ];
      expect(
        equal(sortedColums, mergedSimpleOptionsSampleSortColumns)
      ).toBeTruthy();
    });

    it("with new index higher than length", () => {
      const {
        columnsOrder
      } = mergedSimpleOptionsSample.features.userConfiguration;

      const payload = { columnsOrder, oldIndex: 0, newIndex: 45 };

      const sortedColums = datatableReducer(
        cloneObject(mergedSimpleOptionsSample),
        {
          type: "SORT_COLUMNS",
          payload
        }
      );

      const mergedSimpleOptionsSampleSortColumns = cloneObject(
        mergedSimpleOptionsSample
      );

      mergedSimpleOptionsSampleSortColumns.features.userConfiguration.columnsOrder = [
        "name",
        "age",
        "adult",
        "birthDate",
        "iban",
        "id"
      ];
      expect(
        equal(sortedColums, mergedSimpleOptionsSampleSortColumns)
      ).toBeTruthy();
    });
  });
});
