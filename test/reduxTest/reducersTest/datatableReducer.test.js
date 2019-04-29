import equal from "fast-deep-equal";
import { chunk } from "lodash";
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

  describe("should handle SET_ROWS_PER_PAGE", () => {
    it("with 10 rows per page", () => {
      const rowsPerPage = datatableReducer(
        cloneObject(mergedSimpleOptionsSample),
        {
          type: "SET_ROWS_PER_PAGE",
          payload: 10
        }
      );

      expect(
        equal(rowsPerPage, cloneObject(mergedSetRowsPerPageSample))
      ).toBeTruthy();
    });

    it("with 25 rows per page", () => {
      const rowsPerPage = datatableReducer(
        cloneObject(mergedSimpleOptionsSample),
        {
          type: "SET_ROWS_PER_PAGE",
          payload: 25
        }
      );

      const mergedSet25RowsPerPage = cloneObject(mergedSetRowsPerPageSample);
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
        cloneObject(mergedSimpleOptionsSample),
        {
          type: "SET_ROWS_PER_PAGE",
          payload: "All"
        }
      );

      const mergedSetAllRowsPerPage = cloneObject(mergedSetRowsPerPageSample);
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
      const setPage = datatableReducer(
        cloneObject(mergedMaximumOptionsSample),
        {
          type: "SET_PAGE",
          payload: 3
        }
      );

      const mergedSetPage3 = cloneObject(mergedMaximumOptionsSample);
      mergedSetPage3.pagination = {
        ...mergedSetPage3.pagination,
        pageSelected: 3,
        rowsCurrentPage: chunk(mergedSetPage3.data.rows, 50)[2]
      };

      expect(equal(setPage, mergedSetPage3)).toBeTruthy();
    });

    it("number higher than total", () => {
      const setPage = datatableReducer(
        cloneObject(mergedMaximumOptionsSample),
        {
          type: "SET_PAGE",
          payload: 10
        }
      );

      const mergedSetPageHigherThanTotal = cloneObject(
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
      const setPage = datatableReducer(
        cloneObject(mergedMaximumOptionsSample),
        {
          type: "SET_PAGE",
          payload: -5
        }
      );

      const mergedSetPageLowerThanTotal = cloneObject(
        mergedMaximumOptionsSample
      );
      mergedSetPageLowerThanTotal.pagination = {
        ...mergedSetPageLowerThanTotal.pagination,
        pageSelected: 1,
        rowsCurrentPage: chunk(mergedSetPageLowerThanTotal.data.rows, 50)[0]
      };

      expect(equal(setPage, mergedSetPageLowerThanTotal)).toBeTruthy();
    });
  });
});
