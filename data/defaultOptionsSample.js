const defaultOptionsSample = {
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

export default defaultOptionsSample;
