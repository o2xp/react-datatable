import equal from "fast-deep-equal";
import { chunk, cloneDeep } from "lodash";
import datatableReducer from "../../../src/redux/reducers/datatableReducer";
import {
  defaultOptionsSample,
  simpleOptionsSample,
  mergedSimpleOptionsSample,
  mergedSimpleOptionsSampleCustomSize,
  mergedSimpleOptionsSampleWidthResize,
  mergedSimpleOptionsSampleHeightResize,
  mergedSimpleOptionsSampleWidthHeightResize,
  mergedSetRowsPerPageSample,
  minimumOptionsSample,
  mergedMinimumOptionsSample,
  maximumOptionsSample,
  mergedMaximumOptionsSample
} from "../../../data/samples";

describe("datatableReducer reducer", () => {
  it("should return the initial state", () => {
    expect(datatableReducer(undefined, {})).toEqual(defaultOptionsSample);
  });

  describe("should handle INITIALIZE_OPTIONS", () => {
    it("simple options", () => {
      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: cloneDeep(simpleOptionsSample)
      });

      expect(
        equal(initializedOptions, cloneDeep(mergedSimpleOptionsSample))
      ).toBeTruthy();
    });

    it("minimum options", () => {
      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: cloneDeep(minimumOptionsSample)
      });

      expect(
        equal(initializedOptions, cloneDeep(mergedMinimumOptionsSample))
      ).toBeTruthy();
    });

    it("maximum options", () => {
      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: cloneDeep(maximumOptionsSample)
      });

      expect(
        equal(initializedOptions, cloneDeep(mergedMaximumOptionsSample))
      ).toBeTruthy();
    });

    it("default colSize", () => {
      const simpleOptionsSampleNoColSize = cloneDeep(simpleOptionsSample);
      const mergedSimpleOptionsSampleNoColSize = cloneDeep(
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
          column.colSize = col.id === "actions" ? "150px" : "100px";
          return column;
        }
      );

      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: cloneDeep(simpleOptionsSampleNoColSize)
      });

      expect(
        equal(initializedOptions, cloneDeep(mergedSimpleOptionsSampleNoColSize))
      ).toBeTruthy();
    });
  });

  describe("should handle UPDATE_COMPONENT_SIZE", () => {
    afterEach(() => {
      global.innerWidth = 1024;
      global.innerHeight = 768;
    });

    it("with initial size", () => {
      const state = datatableReducer(cloneDeep(mergedSimpleOptionsSample), {
        type: "UPDATE_COMPONENT_SIZE"
      });

      expect(
        equal(state, cloneDeep(mergedSimpleOptionsSampleCustomSize))
      ).toBeTruthy();
    });

    it("with width resize", () => {
      global.innerWidth = 2000;

      const state = datatableReducer(cloneDeep(mergedSimpleOptionsSample), {
        type: "UPDATE_COMPONENT_SIZE"
      });

      expect(
        equal(state, cloneDeep(mergedSimpleOptionsSampleWidthResize))
      ).toBeTruthy();
    });

    it("with height resize", () => {
      global.innerHeight = 500;

      const state = datatableReducer(cloneDeep(mergedSimpleOptionsSample), {
        type: "UPDATE_COMPONENT_SIZE"
      });

      expect(
        equal(state, cloneDeep(mergedSimpleOptionsSampleHeightResize))
      ).toBeTruthy();
    });

    it("with height and width resize", () => {
      global.innerWidth = 2000;
      global.innerHeight = 500;

      const state = datatableReducer(cloneDeep(mergedSimpleOptionsSample), {
        type: "UPDATE_COMPONENT_SIZE"
      });

      expect(
        equal(state, cloneDeep(mergedSimpleOptionsSampleWidthHeightResize))
      ).toBeTruthy();
    });
  });

  describe("should handle SORT_COLUMNS", () => {
    it("with one movement", () => {
      const {
        columnsOrder
      } = mergedSimpleOptionsSample.features.userConfiguration;

      const payload = { columnsOrder, oldIndex: 1, newIndex: 2 };

      const sortedColums = datatableReducer(
        cloneDeep(mergedSimpleOptionsSample),
        {
          type: "SORT_COLUMNS",
          payload
        }
      );

      const mergedSimpleOptionsSampleSortColumns = cloneDeep(
        mergedSimpleOptionsSample
      );

      mergedSimpleOptionsSampleSortColumns.features.userConfiguration.columnsOrder = [
        "actions",
        "name",
        "id",
        "age",
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
        cloneDeep(mergedSimpleOptionsSample),
        {
          type: "SORT_COLUMNS",
          payload
        }
      );

      payload = { columnsOrder, oldIndex: 3, newIndex: 5 };

      sortedColums = datatableReducer(sortedColums, {
        type: "SORT_COLUMNS",
        payload
      });

      const mergedSimpleOptionsSampleSortColumns = cloneDeep(
        mergedSimpleOptionsSample
      );

      mergedSimpleOptionsSampleSortColumns.features.userConfiguration.columnsOrder = [
        "actions",
        "name",
        "id",
        "adult",
        "birthDate",
        "age",
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

      const payload = { columnsOrder, oldIndex: 1, newIndex: 45 };

      const sortedColums = datatableReducer(
        cloneDeep(mergedSimpleOptionsSample),
        {
          type: "SORT_COLUMNS",
          payload
        }
      );

      const mergedSimpleOptionsSampleSortColumns = cloneDeep(
        mergedSimpleOptionsSample
      );

      mergedSimpleOptionsSampleSortColumns.features.userConfiguration.columnsOrder = [
        "actions",
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

  describe("should handle SET_ROWS_PER_PAGE", () => {
    it("with 10 rows per page", () => {
      const rowsPerPage = datatableReducer(
        cloneDeep(mergedSimpleOptionsSample),
        {
          type: "SET_ROWS_PER_PAGE",
          payload: 10
        }
      );

      expect(
        equal(rowsPerPage, cloneDeep(mergedSetRowsPerPageSample))
      ).toBeTruthy();
    });

    it("with 25 rows per page", () => {
      const rowsPerPage = datatableReducer(
        cloneDeep(mergedSimpleOptionsSample),
        {
          type: "SET_ROWS_PER_PAGE",
          payload: 25
        }
      );

      const mergedSet25RowsPerPage = cloneDeep(mergedSetRowsPerPageSample);
      mergedSet25RowsPerPage.pagination = {
        ...mergedSet25RowsPerPage.pagination,
        pageTotal: 8,
        rowsPerPageSelected: 25,
        rowsCurrentPage: chunk(mergedSet25RowsPerPage.data.rows, 25)[0]
      };

      expect(equal(rowsPerPage, mergedSet25RowsPerPage)).toBeTruthy();
    });

    it("with all rows per page", () => {
      const rowsPerPage = datatableReducer(
        cloneDeep(mergedSimpleOptionsSample),
        {
          type: "SET_ROWS_PER_PAGE",
          payload: "All"
        }
      );

      const mergedSetAllRowsPerPage = cloneDeep(mergedSetRowsPerPageSample);
      mergedSetAllRowsPerPage.pagination = {
        pageSelected: 1,
        pageTotal: 1,
        rowsPerPageSelected: "All",
        rowsCurrentPage: mergedSetAllRowsPerPage.data.rows
      };

      expect(equal(rowsPerPage, mergedSetAllRowsPerPage)).toBeTruthy();
    });
  });

  describe("should handle SET_PAGE", () => {
    it("number 3", () => {
      const setPage = datatableReducer(cloneDeep(mergedMaximumOptionsSample), {
        type: "SET_PAGE",
        payload: 3
      });

      const mergedSetPage3 = cloneDeep(mergedMaximumOptionsSample);
      mergedSetPage3.pagination = {
        ...mergedSetPage3.pagination,
        pageSelected: 3,
        rowsCurrentPage: chunk(mergedSetPage3.data.rows, 50)[2]
      };

      expect(equal(setPage, mergedSetPage3)).toBeTruthy();
    });

    it("number higher than total", () => {
      const setPage = datatableReducer(cloneDeep(mergedMaximumOptionsSample), {
        type: "SET_PAGE",
        payload: 10
      });

      const mergedSetPageHigherThanTotal = cloneDeep(
        mergedMaximumOptionsSample
      );
      mergedSetPageHigherThanTotal.pagination = {
        ...mergedSetPageHigherThanTotal.pagination,
        pageSelected: 4,
        rowsCurrentPage: chunk(mergedSetPageHigherThanTotal.data.rows, 50)[3]
      };

      expect(equal(setPage, mergedSetPageHigherThanTotal)).toBeTruthy();
    });

    it("number lower than 1", () => {
      const setPage = datatableReducer(cloneDeep(mergedMaximumOptionsSample), {
        type: "SET_PAGE",
        payload: -5
      });

      const mergedSetPageLowerThanTotal = cloneDeep(mergedMaximumOptionsSample);
      mergedSetPageLowerThanTotal.pagination = {
        ...mergedSetPageLowerThanTotal.pagination,
        pageSelected: 1,
        rowsCurrentPage: chunk(mergedSetPageLowerThanTotal.data.rows, 50)[0]
      };

      expect(equal(setPage, mergedSetPageLowerThanTotal)).toBeTruthy();
    });
  });
});
