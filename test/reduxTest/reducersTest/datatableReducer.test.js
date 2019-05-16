import equal from "fast-deep-equal";
import { chunk, cloneDeep } from "lodash";
import datatableReducer from "../../../src/redux/reducers/datatableReducer";
import {
  defaultOptionsSample,
  simpleOptionsSample,
  mergedDatableReducerRowsEdited,
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
        "eyeColor",
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
        "eyeColor",
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
        "eyeColor",
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

  describe("should handle SET_IS_SCROLLING", () => {
    it("to false", () => {
      const setScrolled = datatableReducer(
        cloneDeep(mergedSimpleOptionsSample),
        {
          type: "SET_IS_SCROLLING",
          payload: false
        }
      );

      expect(
        equal(setScrolled, cloneDeep(mergedSimpleOptionsSample))
      ).toBeTruthy();
    });

    it("to true", () => {
      const setScrolled = datatableReducer(
        cloneDeep(mergedSimpleOptionsSample),
        {
          type: "SET_IS_SCROLLING",
          payload: true
        }
      );
      const mergedSimpleOptionsSampleScrollingTrue = {
        ...mergedSimpleOptionsSample,
        dimensions: {
          ...mergedSimpleOptionsSample.dimensions,
          isScrolling: true
        }
      };
      expect(
        equal(setScrolled, cloneDeep(mergedSimpleOptionsSampleScrollingTrue))
      ).toBeTruthy();
    });
  });

  describe("should handle ADD_ROW_EDITED", () => {
    it("with one row", () => {
      const row = simpleOptionsSample.data.rows[0];
      const rowAdded = simpleOptionsSample.data.rows[0];
      rowAdded.idOfColumnErr = [];
      const result = datatableReducer(cloneDeep(mergedSimpleOptionsSample), {
        type: "ADD_ROW_EDITED",
        payload: row
      });

      const mergedSimpleOptionsSampleWithOneEditedRow = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [rowAdded]
      };

      expect(
        equal(result, cloneDeep(mergedSimpleOptionsSampleWithOneEditedRow))
      ).toBeTruthy();
    });

    it("with multiples rows (here 4)", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row = rows[10];
      const rowAdded = rows[10];
      rowAdded.idOfColumnErr = [];
      const result = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "ADD_ROW_EDITED",
          payload: row
        }
      );

      const mergedDatableReducerRowsEditedWithFourRows = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          { ...rows[5], idOfColumnErr: [] },
          { ...rows[45], idOfColumnErr: [] },
          rowAdded
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedWithFourRows))
      ).toBeTruthy();
    });

    it("shouln't add row if already present", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row = rows[5];
      const rowAdded = rows[5];
      rowAdded.idOfColumnErr = [];
      const result = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "ADD_ROW_EDITED",
          payload: row
        }
      );

      const mergedDatableReducerRowsEditedWithFourRows = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          { ...rows[5], idOfColumnErr: [] },
          { ...rows[45], idOfColumnErr: [] }
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedWithFourRows))
      ).toBeTruthy();
    });
  });

  describe("should handle SET_ROW_EDITED", () => {
    it("when value is good", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row = rows[5];
      const payload = {
        columnId: "age",
        rowId: row.id,
        newValue: 50,
        error: false
      };

      const result = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "SET_ROW_EDITED",
          payload
        }
      );

      const mergedDatableReducerRowsEditedExpect = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          { ...rows[5], age: 50, idOfColumnErr: [] },
          { ...rows[45], idOfColumnErr: [] }
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedExpect))
      ).toBeTruthy();
    });

    it("when value is wrong", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row = rows[5];
      const payload = {
        columnId: "age",
        rowId: row.id,
        newValue: 101,
        error: true
      };

      const result = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "SET_ROW_EDITED",
          payload
        }
      );

      const mergedDatableReducerRowsEditedExpect = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          { ...rows[5], age: 101, idOfColumnErr: ["age"] },
          { ...rows[45], idOfColumnErr: [] }
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedExpect))
      ).toBeTruthy();
    });

    it("when edit row on multiple field without error", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row = rows[5];
      const payload = {
        columnId: "age",
        rowId: row.id,
        newValue: 101,
        error: false
      };

      const preresult = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "SET_ROW_EDITED",
          payload
        }
      );

      const payload2 = {
        columnId: "name",
        rowId: row.id,
        newValue: "John Doe",
        error: false
      };

      const result = datatableReducer(preresult, {
        type: "SET_ROW_EDITED",
        payload: payload2
      });

      const mergedDatableReducerRowsEditedExpect = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          { ...rows[5], age: 101, name: "John Doe", idOfColumnErr: [] },
          { ...rows[45], idOfColumnErr: [] }
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedExpect))
      ).toBeTruthy();
    });

    it("when edit row on multiple field with errors", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row = rows[5];
      const payload = {
        columnId: "age",
        rowId: row.id,
        newValue: 101,
        error: true
      };

      const preresult = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "SET_ROW_EDITED",
          payload
        }
      );

      const payload2 = {
        columnId: "name",
        rowId: row.id,
        newValue: "John Doe",
        error: true
      };

      const result = datatableReducer(preresult, {
        type: "SET_ROW_EDITED",
        payload: payload2
      });

      const mergedDatableReducerRowsEditedExpect = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          {
            ...rows[5],
            age: 101,
            name: "John Doe",
            idOfColumnErr: ["age", "name"]
          },
          { ...rows[45], idOfColumnErr: [] }
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedExpect))
      ).toBeTruthy();
    });

    it("when edit row on multiple field with corrected error", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row = rows[5];
      const payload = {
        columnId: "age",
        rowId: row.id,
        newValue: 101,
        error: true
      };

      const preresult = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "SET_ROW_EDITED",
          payload
        }
      );

      const payload2 = {
        columnId: "age",
        rowId: row.id,
        newValue: 70,
        error: false
      };

      const result = datatableReducer(preresult, {
        type: "SET_ROW_EDITED",
        payload: payload2
      });

      const mergedDatableReducerRowsEditedExpect = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          { ...rows[5], age: 70, idOfColumnErr: [] },
          { ...rows[45], idOfColumnErr: [] }
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedExpect))
      ).toBeTruthy();
    });

    it("when edit multiple rows field without error", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row5 = rows[5];
      const row45 = rows[45];
      const payload = {
        columnId: "age",
        rowId: row5.id,
        newValue: 70,
        error: false
      };

      const preresult = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "SET_ROW_EDITED",
          payload
        }
      );

      const payload2 = {
        columnId: "name",
        rowId: row45.id,
        newValue: "John Doe",
        error: false
      };

      const result = datatableReducer(preresult, {
        type: "SET_ROW_EDITED",
        payload: payload2
      });

      const mergedDatableReducerRowsEditedExpect = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          { ...rows[5], age: 70, idOfColumnErr: [] },
          { ...rows[45], name: "John Doe", idOfColumnErr: [] }
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedExpect))
      ).toBeTruthy();
    });

    it("when edit multiple rows field with error", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row5 = rows[5];
      const row45 = rows[45];
      const payload = {
        columnId: "age",
        rowId: row5.id,
        newValue: 105,
        error: true
      };

      const preresult = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "SET_ROW_EDITED",
          payload
        }
      );

      const payload2 = {
        columnId: "name",
        rowId: row45.id,
        newValue: "John Doe",
        error: false
      };

      const result = datatableReducer(preresult, {
        type: "SET_ROW_EDITED",
        payload: payload2
      });

      const mergedDatableReducerRowsEditedExpect = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          { ...rows[5], age: 105, idOfColumnErr: ["age"] },
          { ...rows[45], name: "John Doe", idOfColumnErr: [] }
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedExpect))
      ).toBeTruthy();
    });

    it("when edit multiple rows field with errors", () => {
      const { rows } = cloneDeep(simpleOptionsSample.data);
      const row5 = rows[5];
      const row45 = rows[45];
      const payload = {
        columnId: "age",
        rowId: row5.id,
        newValue: 105,
        error: true
      };

      const preresult = datatableReducer(
        cloneDeep(mergedDatableReducerRowsEdited),
        {
          type: "SET_ROW_EDITED",
          payload
        }
      );

      const payload2 = {
        columnId: "name",
        rowId: row45.id,
        newValue: "John Doe",
        error: true
      };

      const result = datatableReducer(preresult, {
        type: "SET_ROW_EDITED",
        payload: payload2
      });

      const mergedDatableReducerRowsEditedExpect = {
        ...mergedSimpleOptionsSample,
        rowsEdited: [
          { ...rows[0], idOfColumnErr: [] },
          { ...rows[5], age: 105, idOfColumnErr: ["age"] },
          { ...rows[45], name: "John Doe", idOfColumnErr: ["name"] }
        ]
      };

      expect(
        equal(result, cloneDeep(mergedDatableReducerRowsEditedExpect))
      ).toBeTruthy();
    });
  });
});
