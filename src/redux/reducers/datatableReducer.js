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
    columnSizeMultiplier: 1,
    isScrolling: false
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
  rowsEdited: [],
  rowsSelected: [],
  actionsRow: null,
  features: {
    canEdit: false,
    canPrint: false,
    canDownload: false,
    canDelete: false,
    canSearch: false,
    canRefreshRows: false,
    canFilterColumns: false,
    canSelectRow: false,
    canSaveUserConfiguration: false,
    userConfiguration: {
      columnsOrder: [],
      copyToClipboard: false
    },
    rowsPerPage: {
      available: [10, 25, 50, 100, "All"],
      selected: "All"
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
  const { canEdit, canDelete, canSelectRow } = state.features;
  const numberOfActions = [canEdit, canDelete, canSelectRow].filter(v => v)
    .length;
  const colDisplayed = [];
  state.data.columns.forEach(col => {
    if (state.features.userConfiguration.columnsOrder.includes(col.id)) {
      colDisplayed.push(col);
    }
  });

  const widthColDisplayed = colDisplayed.map(col => {
    const column = col;
    if (column.colSize && col.id !== "actions") {
      return Number(column.colSize.split("px")[0]);
    }
    if (col.id !== "actions") {
      column.colSize = "100px";
      return 100;
    }
    return 0;
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

  widthTable -= numberOfActions * 50;
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
    if (
      state.features.userConfiguration.columnsOrder.includes(col.id) &&
      col.id !== "actions"
    ) {
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
      ...state.dimensions,
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

  if (tableRef.current && (newPageSelected || newRowsPerPageSelected)) {
    tableRef.current.scrollToItem(0);
  }

  return {
    pageSelected,
    pageTotal,
    rowsPerPageSelected,
    rowsCurrentPage
  };
};

const initializeOptions = (
  state,
  { optionsInit, forceRerender = false, actionsRow = null }
) => {
  const newState = deepmerge(
    forceRerender ? defaultState : state,
    optionsInit,
    {
      arrayMerge: overwriteMerge
    }
  );
  newState.actionsRow = actionsRow;

  if (newState.features.userConfiguration.columnsOrder.length === 0) {
    newState.features.userConfiguration.columnsOrder = optionsInit.data.columns.map(
      col => col.id
    );
  }

  const { canEdit, canDelete, canSelectRow } = newState.features;
  const actions = [canEdit, canDelete, canSelectRow];
  const numberOfActions = actions.filter(v => v).length;

  if (
    numberOfActions > 0 &&
    !newState.data.columns.find(col => col.id === "actions")
  ) {
    newState.features.userConfiguration.columnsOrder.unshift("actions");
    let colSize = 0;
    switch (actions.join(" ")) {
      case "true true true":
      case "false true true":
      case "true false true":
        colSize = "150px";
        break;
      case "true true false":
      case "false true false":
      case "true false false":
        colSize = "100px";
        break;
      default:
        colSize = "50px";
        break;
    }

    newState.data.columns.unshift({
      id: "actions",
      label: "",
      colSize,
      editable: false
    });
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

const setRowsPerPage = (state, newRowsPerPageSelected) => {
  return {
    ...state,
    pagination: setPagination({
      state,
      newPageSelected: 1,
      newRowsPerPageSelected
    })
  };
};

const setPage = (state, newPageSelected) => {
  return {
    ...state,
    pagination: setPagination({ state, newPageSelected })
  };
};

const setIsScrolling = (state, isScrolling) => {
  return {
    ...state,
    dimensions: {
      ...state.dimensions,
      isScrolling
    }
  };
};

const addRowEdited = (state, row) => {
  const { rowsEdited, keyColumn } = state;
  if (rowsEdited.find(re => re[keyColumn] === row[keyColumn])) {
    return state;
  }
  return {
    ...state,
    rowsEdited: [
      ...rowsEdited,
      {
        ...row,
        idOfColumnErr: [],
        hasBeenEdited: false
      }
    ]
  };
};

const checkHasBeenEdited = ({ rows, rowEdited, keyColumn }) => {
  const rowNonEdited = rows.find(
    row => row[keyColumn] === rowEdited[keyColumn]
  );

  let hasBeenEdited = false;
  Object.keys(rowNonEdited).forEach(key => {
    if (rowNonEdited[key] !== rowEdited[key]) {
      hasBeenEdited = true;
    }
  });
  return hasBeenEdited;
};

const setRowEdited = (state, { columnId, rowId, newValue, error }) => {
  const { rowsEdited, keyColumn } = state;
  const rowsEditedUpdate = rowsEdited.map(row => {
    if (row[keyColumn] === rowId) {
      let idOfColumnErrUpdate = row.idOfColumnErr;
      if (error) {
        if (!idOfColumnErrUpdate.includes(columnId)) {
          idOfColumnErrUpdate = [...idOfColumnErrUpdate, columnId];
        }
      } else {
        idOfColumnErrUpdate = idOfColumnErrUpdate.filter(e => e !== columnId);
      }

      const r = {
        ...row,
        [columnId]: newValue,
        idOfColumnErr: idOfColumnErrUpdate
      };

      const hasBeenEdited = checkHasBeenEdited({
        rows: state.data.rows,
        rowEdited: r,
        keyColumn
      });

      return {
        ...r,
        hasBeenEdited
      };
    }
    return row;
  });

  return { ...state, rowsEdited: rowsEditedUpdate };
};

const mergeObjectInArray = (object, keyColumn, array) => {
  return [
    ...array.map(el => {
      if (el[keyColumn] === object[keyColumn]) {
        return object;
      }
      return el;
    })
  ];
};

const saveRowEdited = (state, payload) => {
  const row = payload;
  delete row.idOfColumnErr;
  delete row.hasBeenEdited;
  const { data, rowsEdited, keyColumn, pagination, actionsRow } = state;
  if (actionsRow) {
    actionsRow({ type: "save", payload: row });
  }
  return {
    ...state,
    data: {
      ...data,
      rows: mergeObjectInArray(row, keyColumn, data.rows)
    },
    pagination: {
      ...pagination,
      rowsCurrentPage: mergeObjectInArray(
        row,
        keyColumn,
        pagination.rowsCurrentPage
      )
    },
    rowsEdited: [...rowsEdited.filter(r => r[keyColumn] !== row[keyColumn])]
  };
};

const revertRowEdited = (state, payload) => {
  const row = payload;
  const { rowsEdited, keyColumn } = state;
  return {
    ...state,
    rowsEdited: [...rowsEdited.filter(r => r[keyColumn] !== row[keyColumn])]
  };
};

const deleteRow = (state, payload) => {
  const row = payload;
  const { data, keyColumn, actionsRow } = state;

  if (actionsRow) {
    actionsRow({ type: "delete", payload: row });
  }

  let newState = {
    ...state,
    data: {
      ...data,
      rows: [...data.rows.filter(r => r[keyColumn] !== row[keyColumn])]
    }
  };

  newState = {
    ...newState,
    pagination: setPagination({ state: newState })
  };

  return newState;
};

const selectRow = (state, payload) => {
  const { keyColumn, rowsSelected } = state;
  const { checked, row } = payload;

  if (checked) {
    return {
      ...state,
      rowsSelected: [...rowsSelected, row]
    };
  }
  return {
    ...state,
    rowsSelected: [...rowsSelected.filter(r => r[keyColumn] !== row[keyColumn])]
  };
};

const setRowsSelected = (state, payload) => {
  return {
    ...state,
    rowsSelected: payload
  };
};

const datatableReducer = (state = defaultState, action) => {
  const { payload, type } = action;

  switch (type) {
    case "INITIALIZE_OPTIONS":
      return initializeOptions(state, payload);
    case "UPDATE_COMPONENT_SIZE":
      return calcComponentSize(state);
    case "SORT_COLUMNS":
      return sortColumn(state, payload);
    case "SET_ROWS_PER_PAGE":
      return setRowsPerPage(state, payload);
    case "SET_PAGE":
      return setPage(state, payload);
    case "SET_IS_SCROLLING":
      return setIsScrolling(state, payload);
    case "ADD_ROW_EDITED":
      return addRowEdited(state, payload);
    case "SET_ROW_EDITED":
      return setRowEdited(state, payload);
    case "SAVE_ROW_EDITED":
      return saveRowEdited(state, payload);
    case "REVERT_ROW_EDITED":
      return revertRowEdited(state, payload);
    case "DELETE_ROW":
      return deleteRow(state, payload);
    case "SELECT_ROW":
      return selectRow(state, payload);
    case "SET_ROWS_SELECTED":
      return setRowsSelected(state, payload);
    default:
      return state;
  }
};

export default datatableReducer;
