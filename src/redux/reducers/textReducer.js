const defaultState = {
  noRow: "There is no data yet, try to refresh",
  search: "Toggle",
  searchPlaceholder: "Search..",
  edit: "Edit",
  clear: "Clear",
  save: "Save",
  delete: "Delete",
  confirmDelete: "Confirm delete",
  cancelDelete: "Cancel delete",
  download: "Download data",
  downloadTitle: "Download Data",
  downloadDescription: "Data will be exported in",
  downloadSelectedRows: "Selected rows",
  downloadCurrentRows: "Rows of current page",
  downloadAllRows: "All rows",
  display: "Display columns",
  refresh: "Refresh",
  configuration: "Configuration",
  configurationTitle: "User Configuration",
  configurationCopy: "Save cell's content to clipboard on click",
  configurationColumn:
    "Do you want to save the configuration of the columns and copy to clipboard feature ?",
  configurationReset: "Reset",
  configurationSave: "Save",
  create: "Create",
  createTitle: "Create a new row",
  createCancel: "Cancel",
  createSubmit: "Create",
  duplicate: "Duplicate",
  print: "Print",
  orderBy: "Order by",
  drag: "Drag",
  paginationRows: "Rows",
  paginationPage: "Page"
};

const initText = (state, payload) => ({ ...state, ...payload });

const textReducer = (state = defaultState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "INIT_TEXT":
      return initText(state, payload);
    default:
      return state;
  }
};

export default textReducer;
