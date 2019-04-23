import deepmerge from "deepmerge";

const defaultState = {
  title: "",
  dimensions: {
    datatable: {
      width: "100vw",
      widthNumber: 0
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

const calcComponentSize = state => {
  return {
    ...state,
    dimensions: {
      datatable: {
        ...state.dimensions.datatable,
        widthNumber: convertSizeToNumber(state.dimensions.datatable.width)
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

const initializeOptions = (state, payload) => {
  const newState = deepmerge(state, payload, {
    arrayMerge: overwriteMerge
  });

  if (newState.features.userConfiguration.columnsOrder.length === 0) {
    newState.features.userConfiguration.columnsOrder = payload.data.columns.map(
      col => col.id
    );
  }
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

const datatableReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "INITIALIZE_OPTIONS":
      return initializeOptions(state, action.payload);
    case "UPDATE_COMPONENT_SIZE":
      return calcComponentSize(state);
    default:
      return state;
  }
};

export default datatableReducer;
