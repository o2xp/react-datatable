import deepmerge from "deepmerge";
import arrayMove from "array-move";
import { chunk, cloneDeep, orderBy as orderByFunction } from "lodash";
import { tableRef } from "../../components/DatatableCore/Body/Body";

const Fuse = require("fuse.js");

const optionsFuse = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1
};
const defaultState = {
  dtKey: "",
  title: "",
  dimensions: {
    datatable: {
      width: "100%",
      height: "100%",
      widthNumber: 0,
      totalWidthNumber: 0
    },
    header: {
      height: "0px",
      heightNumber: 0
    },
    body: {
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
  rowsGlobalEdited: [],
  rowsSelected: [],
  actions: null,
  refreshRows: null,
  isRefreshing: false,
  stripped: false,
  searchTerm: "",
  orderBy: {
    keys: [],
    order: []
  },
  features: {
    canEdit: false,
    canGlobalEdit: false,
    canPrint: false,
    canDownload: false,
    canDelete: false,
    canSearch: false,
    canRefreshRows: false,
    canOrderColumns: false,
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

const convertSizeToNumber = (val, height) => {
  const splitSize = val.match(/[0-9]+|(px|%|vw|vh)/gi);
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
  if (unitSize === "%") {
    if (height) {
      valSize =
        document.getElementById("o2xp").parentElement.clientHeight *
        (valSize / 100);
    } else {
      valSize =
        document.getElementById("o2xp").parentElement.clientWidth *
        (valSize / 100);
    }
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
    if (column.colSize && col.id !== "o2xpActions") {
      return Number(column.colSize.split("px")[0]);
    }
    if (col.id !== "o2xpActions") {
      column.colSize = "100px";
      return 100;
    }
    return 0;
  });

  const totalWidthColDisplayed = widthColDisplayed.reduce((a, b) => {
    return a + b;
  });

  const splitWidth = state.dimensions.datatable.width.match(
    /[0-9]+|(px|%|vw|vh)/gi
  );
  let widthTable = splitWidth[0];
  const unitWidthTable = splitWidth[1];

  if (unitWidthTable === "vw") {
    widthTable = (window.innerWidth * widthTable) / 100;
  }

  if (unitWidthTable === "%") {
    widthTable =
      document.getElementById("o2xp").parentElement.clientWidth *
      (widthTable / 100);
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
      col.id !== "o2xpActions"
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
  const newState = {
    ...state,
    dimensions: {
      ...state.dimensions,
      datatable: {
        ...state.dimensions.datatable,
        widthNumber: convertSizeToNumber(state.dimensions.datatable.width),
        totalWidthNumber: totalWidth(state)
      },
      row: {
        ...state.dimensions.row,
        heightNumber: convertSizeToNumber(state.dimensions.row.height)
      },
      columnSizeMultiplier: updateRowSizeMultiplier(state)
    }
  };
  const heightNumber = convertSizeToNumber(
    newState.dimensions.datatable.height,
    true
  );
  newState.dimensions.body.heightNumber =
    heightNumber -
    newState.dimensions.header.heightNumber -
    50 -
    newState.dimensions.row.heightNumber;
  return newState;
};

const setPagination = ({
  state,
  newPageSelected = null,
  newRowsPerPageSelected = null
}) => {
  const { searchTerm, orderBy } = state;
  let rowsToUse = state.data.rows;
  if (searchTerm.length) {
    const fuse = new Fuse(state.data.rows, {
      ...optionsFuse,
      keys: state.features.userConfiguration.columnsOrder
    });
    rowsToUse = fuse.search(searchTerm);
  }

  const { keys, order } = orderBy;
  if (keys.length) {
    rowsToUse = orderByFunction(rowsToUse, keys, order);
  }

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
      : Math.ceil(rowsToUse.length / rowsPerPageSelected);
  pageSelected = pageSelected > pageTotal ? pageTotal : pageSelected;
  pageSelected = pageSelected < 1 ? 1 : pageSelected;
  let rowsCurrentPage = [];
  if (rowsToUse.length > 0) {
    rowsCurrentPage =
      rowsPerPageSelected === "All"
        ? rowsToUse
        : chunk(rowsToUse, rowsPerPageSelected)[
            pageSelected ? pageSelected - 1 : 0
          ];
  }

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

const removeNullUndefined = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === "object" && key !== "icon")
      removeNullUndefined(obj[key]);
    /* eslint-disable no-param-reassign */ else if (
      obj[key] == null ||
      obj[key] === undefined
    )
      delete obj[key]; // delete
  });
  return obj;
};

const initializeOptions = (
  state,
  {
    optionsInit,
    dtKey,
    forceRerender = false,
    actions = null,
    refreshRows = null,
    stripped = false
  }
) => {
  const newState = deepmerge(
    forceRerender || dtKey !== state.dtKey ? defaultState : state,
    removeNullUndefined({ ...optionsInit, dtKey }),
    {
      arrayMerge: overwriteMerge
    }
  );
  newState.actions = actions;
  newState.refreshRows = refreshRows;
  newState.stripped = stripped;

  const { height } = newState.dimensions.row;
  newState.dimensions.row.height = height.split("px")[0] < 60 ? "60px" : height;

  if (newState.features.userConfiguration.columnsOrder.length === 0) {
    newState.features.userConfiguration.columnsOrder = optionsInit.data.columns.map(
      col => col.id
    );
  }

  const { canEdit, canDelete, canSelectRow } = newState.features;
  const actionsUser = [canEdit, canDelete, canSelectRow];
  const numberOfActions = actionsUser.filter(v => v).length;

  if (
    numberOfActions > 0 &&
    !newState.data.columns.find(col => col.id === "o2xpActions")
  ) {
    newState.features.userConfiguration.columnsOrder = newState.features.userConfiguration.columnsOrder.filter(
      colId => colId !== "o2xpActions"
    );

    newState.data.columns = newState.data.columns.filter(
      column => column.id !== "o2xpActions"
    );

    newState.features.userConfiguration.columnsOrder.unshift("o2xpActions");
    let colSize = 0;
    switch (actionsUser.join(" ")) {
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
      id: "o2xpActions",
      label: "Actions",
      colSize,
      editable: false
    });
  }

  newState.pagination = setPagination({
    state: newState,
    current: newState.pagination.current,
    rowsPerPageSelected: newState.features.rowsPerPage.selected
  });

  const { title, features } = newState;
  const {
    canGlobalEdit,
    canPrint,
    canDownload,
    canSearch,
    canRefreshRows,
    canOrderColumns,
    canSaveUserConfiguration,
    additionalIcons,
    selectionIcons
  } = features;
  const hasHeader =
    canGlobalEdit ||
    canPrint ||
    canDownload ||
    canSearch ||
    canRefreshRows ||
    canOrderColumns ||
    canSaveUserConfiguration ||
    title.length > 0 ||
    additionalIcons.length > 0 ||
    selectionIcons.length > 0;

  newState.dimensions.columnSizeMultiplier = updateRowSizeMultiplier(newState);
  newState.dimensions.datatable.widthNumber = convertSizeToNumber(
    newState.dimensions.datatable.width
  );

  const heightNumber = convertSizeToNumber(
    newState.dimensions.datatable.height,
    true
  );
  newState.dimensions.header.height = hasHeader ? "60px" : "0px";

  newState.dimensions.header.heightNumber = convertSizeToNumber(
    newState.dimensions.header.height
  );

  newState.dimensions.row.heightNumber = convertSizeToNumber(
    newState.dimensions.row.height
  );

  newState.dimensions.body.heightNumber =
    heightNumber -
    newState.dimensions.header.heightNumber -
    50 -
    newState.dimensions.row.heightNumber;

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

const addAllRowsToEdited = state => {
  const { rows } = state.data;
  const rowsEdited = rows.map(row => {
    return {
      ...row,
      idOfColumnErr: [],
      hasBeenEdited: false
    };
  });

  return {
    ...state,
    rowsEdited
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
  const { rowsEdited, keyColumn, rowsGlobalEdited, features } = state;
  let newRowsGlobalEdited = [...rowsGlobalEdited];
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
      /* eslint-disable no-restricted-globals */
      const r = {
        ...row,
        [columnId]:
          isNaN(newValue) && typeof newValue !== "string" ? "" : newValue,
        idOfColumnErr: idOfColumnErrUpdate
      };

      const hasBeenEdited = checkHasBeenEdited({
        rows: state.data.rows,
        rowEdited: r,
        keyColumn
      });

      if (features.canGlobalEdit) {
        newRowsGlobalEdited = newRowsGlobalEdited.filter(
          rowGlobalEdited => rowGlobalEdited[keyColumn] !== r[keyColumn]
        );

        if (hasBeenEdited) {
          newRowsGlobalEdited = [...newRowsGlobalEdited, r];
        }
      }

      return {
        ...r,
        hasBeenEdited
      };
    }
    return row;
  });
  return {
    ...state,
    rowsEdited: rowsEditedUpdate,
    rowsGlobalEdited: newRowsGlobalEdited
  };
};

const mergeArrayInArray = (firstArray, keyColumn, secondArray) => {
  return [
    ...secondArray.map(el => {
      const object = firstArray.find(obj => el[keyColumn] === obj[keyColumn]);
      if (object) {
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
  const { data, rowsEdited, keyColumn, pagination, actions } = state;
  if (actions) {
    actions({ type: "save", payload: row });
  }
  return {
    ...state,
    data: {
      ...data,
      rows: mergeArrayInArray([row], keyColumn, data.rows)
    },
    pagination: {
      ...pagination,
      rowsCurrentPage: mergeArrayInArray(
        [row],
        keyColumn,
        pagination.rowsCurrentPage
      )
    },
    rowsGlobalEdited: [],
    rowsEdited: [...rowsEdited.filter(r => r[keyColumn] !== row[keyColumn])]
  };
};

const saveAllRowsEdited = state => {
  const { data, keyColumn, rowsGlobalEdited, actions, pagination } = state;
  const rows = rowsGlobalEdited.map(row => {
    const r = row;
    delete r.idOfColumnErr;
    delete r.hasBeenEdited;
    return r;
  });

  if (actions) {
    actions({ type: "save", payload: rows });
  }

  return {
    ...state,
    data: {
      ...data,
      rows: mergeArrayInArray(rows, keyColumn, data.rows)
    },
    pagination: {
      ...pagination,
      rowsCurrentPage: mergeArrayInArray(
        rows,
        keyColumn,
        pagination.rowsCurrentPage
      )
    },
    rowsGlobalEdited: [],
    rowsEdited: []
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

const revertAllRowsToEdited = state => {
  return {
    ...state,
    rowsEdited: [],
    rowsGlobalEdited: []
  };
};

const deleteRow = (state, payload) => {
  const row = payload;
  const { data, keyColumn, actions, rowsEdited, rowsGlobalEdited } = state;

  if (actions) {
    actions({ type: "delete", payload: row });
  }

  let newState = {
    ...state,
    rowsEdited: [...rowsEdited.filter(r => r[keyColumn] !== row[keyColumn])],
    rowsGlobalEdited: [
      ...rowsGlobalEdited.filter(r => r[keyColumn] !== row[keyColumn])
    ],
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

const search = (state, payload) => {
  const newState = {
    ...state,
    searchTerm: payload
  };

  return {
    ...newState,
    pagination: setPagination({ state: newState })
  };
};

const setColumnVisibilty = (state, payload) => {
  const { columns } = state.data;
  const { columnsOrder } = state.features.userConfiguration;
  const orderDisplayed = columns.filter(
    col => columnsOrder.includes(col.id) || col.id === payload.id
  );
  const columnsId = orderDisplayed.map(col => col.id);
  const index = columnsId.indexOf(payload.id);

  let newColumnsOrder;
  if (columnsOrder.includes(payload.id)) {
    newColumnsOrder = columnsOrder.filter(col => col !== payload.id);
  } else {
    columnsOrder.splice(index, 0, payload.id);
    newColumnsOrder = cloneDeep(columnsOrder);
  }

  const newState = {
    ...state,
    features: {
      ...state.features,
      userConfiguration: {
        ...state.features.userConfiguration,
        columnsOrder: newColumnsOrder
      }
    }
  };

  return {
    ...newState,
    dimensions: {
      ...newState.dimensions,
      columnSizeMultiplier: updateRowSizeMultiplier(newState)
    }
  };
};

const setUserConfiguration = (state, payload) => {
  const { columnsOrder, copyToClipboard, action } = payload;
  const { actions } = state;

  if (action === "save" && actions) {
    actions({
      type: "saveUserConfiguration",
      payload: { columnsOrder, copyToClipboard }
    });
  }

  const newState = {
    ...state,
    features: {
      ...state.features,
      userConfiguration: {
        columnsOrder,
        copyToClipboard
      }
    }
  };

  return {
    ...newState,
    dimensions: {
      ...newState.dimensions,
      columnSizeMultiplier: updateRowSizeMultiplier(newState)
    }
  };
};

const refreshRowsStarted = state => {
  return {
    ...state,
    isRefreshing: true,
    searchTerm: "",
    rowsEdited: [],
    rowsSelected: []
  };
};

const refreshRowsSuccess = (state, payload) => {
  const newState = {
    ...state,
    data: {
      ...state.data,
      rows: payload
    },
    isRefreshing: false
  };
  return {
    ...newState,
    pagination: setPagination({ state: newState })
  };
};

const refreshRowsError = state => {
  return { ...state, isRefreshing: false };
};

const orderByColumns = (state, payload) => {
  const { orderBy } = state;
  const { keys, order } = orderBy;
  const index = keys.indexOf(payload);

  if (index === -1) {
    keys.push(payload);
    order.push("asc");
  } else if (order[index] === "desc") {
    keys.splice(index, 1);
    order.splice(index, 1);
  } else {
    order[index] = "desc";
  }

  const newState = {
    ...state,
    orderBy: { keys, order }
  };
  return {
    ...newState,
    pagination: setPagination({
      state: newState
    })
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
    case "ADD_ALL_ROWS_TO_EDITED":
      return addAllRowsToEdited(state);
    case "SET_ROW_EDITED":
      return setRowEdited(state, payload);
    case "SAVE_ROW_EDITED":
      return saveRowEdited(state, payload);
    case "SAVE_ALL_ROWS_EDITED":
      return saveAllRowsEdited(state);
    case "REVERT_ROW_EDITED":
      return revertRowEdited(state, payload);
    case "REVERT_ALL_ROWS_TO_EDITED":
      return revertAllRowsToEdited(state);
    case "DELETE_ROW":
      return deleteRow(state, payload);
    case "SELECT_ROW":
      return selectRow(state, payload);
    case "SET_ROWS_SELECTED":
      return setRowsSelected(state, payload);
    case "SEARCH":
      return search(state, payload);
    case "SET_COLUMN_VISIBILITY":
      return setColumnVisibilty(state, payload);
    case "SET_USER_CONFIGURATION":
      return setUserConfiguration(state, payload);
    case "REFRESH_ROWS_STARTED":
      return refreshRowsStarted(state);
    case "REFRESH_ROWS_SUCCESS":
      return refreshRowsSuccess(state, payload);
    case "REFRESH_ROWS_ERROR":
      return refreshRowsError(state);
    case "ORDER_BY_COLUMNS":
      return orderByColumns(state, payload);
    default:
      return state;
  }
};

export default datatableReducer;
