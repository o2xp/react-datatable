const defaultOptionsSample = {
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
      height: "33px",
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
  rowsEdited: [],
  rowsGlobalEdited: [],
  rowsSelected: [],
  newRows: [],
  rowsDeleted: [],
  actions: null,
  refreshRows: null,
  areFilterFieldsDisplayed: false,
  isSearchFieldDisplayed: false,
  isRefreshing: false,
  stripped: false,
  filterTerms: {},
  filterResultForEachColumn: {},
  orderBy: [],
  pagination: {
    pageSelected: 1,
    pageTotal: 1,
    rowsPerPageSelected: "",
    rowsCurrentPage: [],
    rowsToUse: []
  },
  features: {
    canEdit: false,
    canAdd: false,
    canEditRow: null,
    canGlobalEdit: false,
    canPrint: false,
    canDownload: false,
    canDuplicate: false,
    canDelete: false,
    canSearch: false,
    canFilter: false,
    canRefreshRows: false,
    canSelectRow: false,
    canOrderColumns: false,
    canSaveUserConfiguration: false,
    editableIdNewRow: [],
    userConfiguration: {
      columnsOrder: [],
      copyToClipboard: false
    },
    rowsPerPage: {
      available: [10, 25, 50, 100, "All"],
      selected: "All"
    },
    additionalActions: [],
    additionalIcons: [],
    selectionIcons: []
  }
};

export default defaultOptionsSample;
