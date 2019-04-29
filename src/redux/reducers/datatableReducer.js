import deepmerge from "deepmerge";
import arrayMove from "array-move";
import { chunk } from "lodash";
import { tableRef } from "../../components/DatatableCore/Body/Body";

const defaultState = {
  title: "",
  dimensions: {
    datatable: {
      width: "100vw",
      widthNumber: 0,
      totalWidthNumber: 0
    },
    header: {
      height: "60px",
      heightNumber: 0
    },
    body: {
      height: "300px",
      heightNumber: 0
    },
    row: {
      height: "60px",
      heightNumber: 0
    },
    columnSizeMultiplier: 1
  },
  keyColumn: null,
  font: "Roboto",
  data: {
    columns: [],
    rows: []
  },
  pagination: {
    pageSelected: 1,
    pageTotal: 1,
    rowsPerPageSelected: "",
    rowsCurrentPage: []
  },
  features: {
    canEdit: false,
    canPrint: false,
    canDownload: false,
    canSearch: false,
    canRefreshRows: false,
    canFilterColumns: false,
    canSaveUserConfiguration: false,
    userConfiguration: {
      columnsOrder: [],
      copyToClipboard: false
    },
    rowsPerPage: {
      available: [10, 25, 50, 100, "All"],
      selected: "All"
    },
    selection: {
      rowsSelectable: false,
      selectPageRows: false,
      selectAllRows: false
    },
    additionalIcons: [],
    selectionIcons: []
  }
};

const overwriteMerge = (destinationArray, sourceArray) => sourceArray;

const convertSizeToNumber = val => {
  const splitSize = val.match(/[a-z]+|[^a-z]+/gi);
  let valSize = splitSize[0];
  const unitSize = splitSize[1];
  if (unitSize === "px") {
    valSize = Number(valSize);
  }
  if (unitSize === "vw") {
    valSize = window.innerWidth * (valSize / 100);
  }
  if (unitSize === "vh") {
    valSize = window.innerHeight * (valSize / 100);
  }

  return valSize;
};

const updateRowSizeMultiplier = state => {
  const colDisplayed = [];
  state.data.columns.forEach(col => {
    if (state.features.userConfiguration.columnsOrder.includes(col.id)) {
      colDisplayed.push(col);
    }
  });

  const widthColDisplayed = colDisplayed.map(col => {
    const column = col;
    if (column.colSize) {
      return Number(column.colSize.split("px")[0]);
    }
    column.colSize = "100px";
    return 100;
  });
  const totalWidthColDisplayed = widthColDisplayed.reduce((a, b) => {
    return a + b;
  });

  const splitWidth = state.dimensions.datatable.width.match(/[a-z]+|[^a-z]+/gi);
  let widthTable = splitWidth[0];
  const unitWidthTable = splitWidth[1];

  if (unitWidthTable === "vw") {
    widthTable = (window.innerWidth * widthTable) / 100;
  }

  widthTable -= state.features.userConfiguration.columnsOrder.length * 50;
  widthTable -= 22;
  let mult = 1;

  if (widthTable > totalWidthColDisplayed) {
    mult = widthTable / totalWidthColDisplayed;
  }
  return mult;
};

const totalWidth = state => {
  const colDisplayed = [];
  state.data.columns.forEach(col => {
    if (state.features.userConfiguration.columnsOrder.includes(col.id)) {
      colDisplayed.push(col);
    }
  });

  const widthColDisplayed = colDisplayed.map(
    col => Number(col.colSize.split("px")[0]) + 50
  );
  let totalWidthColDisplayed = widthColDisplayed.reduce((a, b) => {
    return a + b;
  });

  totalWidthColDisplayed *= state.dimensions.columnSizeMultiplier;
  totalWidthColDisplayed -= 22;

  return totalWidthColDisplayed;
};

const calcComponentSize = state => {
  return {
    ...state,
    dimensions: {
      datatable: {
        ...state.dimensions.datatable,
        widthNumber: convertSizeToNumber(state.dimensions.datatable.width),
        totalWidthNumber: totalWidth(state)
      },
      header: {
        ...state.dimensions.header,
        heightNumber: convertSizeToNumber(state.dimensions.header.height)
      },
      body: {
        ...state.dimensions.body,
        heightNumber: convertSizeToNumber(state.dimensions.body.height)
      },
      row: {
        ...state.dimensions.row,
        heightNumber: convertSizeToNumber(state.dimensions.row.height)
      },
      columnSizeMultiplier: updateRowSizeMultiplier(state)
    }
  };
};

const setPagination = ({
  state,
  newPageSelected = null,
  newRowsPerPageSelected = null
}) => {
  const rowsPerPageSelected =
    newRowsPerPageSelected ||
    state.pagination.rowsPerPageSelected ||
    state.features.rowsPerPage.selected;
  let pageSelected =
    rowsPerPageSelected === "All"
      ? 1
      : newPageSelected || state.pagination.pageSelected;
  const pageTotal =
    rowsPerPageSelected === "All"
      ? 1
      : Math.ceil(state.data.rows.length / rowsPerPageSelected);
  pageSelected = pageSelected > pageTotal ? pageTotal : pageSelected;
  pageSelected = pageSelected < 1 ? 1 : pageSelected;
  const rowsCurrentPage =
    rowsPerPageSelected === "All"
      ? state.data.rows
      : chunk(state.data.rows, rowsPerPageSelected)[
          pageSelected ? pageSelected - 1 : 0
        ];

  if (tableRef.current) {
    tableRef.current.scrollToItem(0);
  }

  return {
    pageSelected,
    pageTotal,
    rowsPerPageSelected,
    rowsCurrentPage
  };
};

const initializeOptions = (state, payload) => {
  const newState = deepmerge(state, payload, {
    arrayMerge: overwriteMerge
  });

  if (newState.features.userConfiguration.columnsOrder.length === 0) {
    newState.features.userConfiguration.columnsOrder = payload.data.columns.map(
      col => col.id
    );
  }

  newState.pagination = setPagination({
    state: newState,
    current: 1,
    rowsPerPageSelected: newState.features.rowsPerPage.selected
  });

  newState.dimensions.columnSizeMultiplier = updateRowSizeMultiplier(newState);
  newState.dimensions.datatable.widthNumber = convertSizeToNumber(
    newState.dimensions.datatable.width
  );
  newState.dimensions.header.heightNumber = convertSizeToNumber(
    newState.dimensions.header.height
  );
  newState.dimensions.body.heightNumber = convertSizeToNumber(
    newState.dimensions.body.height
  );
  newState.dimensions.row.heightNumber = convertSizeToNumber(
    newState.dimensions.row.height
  );

  return newState;
};

const sortColumn = (state, { newIndex, oldIndex }) => {
  const newState = {
    ...state,
    features: {
      ...state.features,
      userConfiguration: {
        ...state.features.userConfiguration,
        columnsOrder: arrayMove(
          state.features.userConfiguration.columnsOrder,
          oldIndex,
          newIndex
        )
      }
    }
  };

  return newState;
};

const datatableReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "INITIALIZE_OPTIONS":
      return initializeOptions(state, action.payload);
    case "UPDATE_COMPONENT_SIZE":
      return calcComponentSize(state);
    case "SORT_COLUMNS":
      return sortColumn(state, action.payload);
    case "SET_ROWS_PER_PAGE":
      return {
        ...state,
        pagination: setPagination({
          state,
          newPageSelected: 1,
          newRowsPerPageSelected: action.payload
        })
      };
    case "SET_PAGE":
      return {
        ...state,
        pagination: setPagination({ state, newPageSelected: action.payload })
      };
    default:
      return state;
  }
};

export default datatableReducer;
