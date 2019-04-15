import deepmerge from "deepmerge";

const defaultState = {
  title: "",
  dimensions: {
    datatable: {
      width: "100vw"
    },
    header: {
      height: "60px"
    },
    body: {
      height: "300px"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn: null,
  font: "Arial",
  data: {
    columns: [],
    rows: []
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
      available: [10, 25, 50, 100],
      selected: 50
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

const initializeOptions = (state, payload) => {
  const newState = deepmerge(state, payload, {
    arrayMerge: overwriteMerge
  });

  if (newState.features.userConfiguration.columnsOrder.length === 0) {
    newState.features.userConfiguration.columnsOrder = payload.data.columns.map(
      col => col.id
    );
  }

  return newState;
};

const datatableReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "INITIALIZE_OPTIONS":
      return initializeOptions(state, action.payload);
    default:
      return state;
  }
};

export default datatableReducer;
