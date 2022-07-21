import {
  title,
  currentScreen,
  dimensions,
  keyColumn,
  font,
  data,
  columnAction,
  userConfiguration,
  pagination,
  rowsEdited,
  rowsGlobalEdited,
  rowsSelected,
  refreshRows,
  isRefreshing,
  stripped,
  orderBy,
  searchTerm,
  newRows,
  rowsDeleted,
  areFilterFieldsDisplayed,
  isSearchFieldDisplayed,
  filterTerms,
  filterResultForEachColumn,
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleWidthResize = {
  title,
  currentScreen,
  dimensions: {
    ...dimensions,
    datatable: {
      ...dimensions.datatable,
      width: "90vw",
      widthNumber: 1800,
      totalWidthNumber: 1288
    },
    columnSizeMultiplier: 1228 / 1205
  },

  pagination: {
    ...pagination,
    rowsCurrentPage: data.rows
  },
  keyColumn,
  actions: null,
  refreshRows,
  isRefreshing,
  newRows,
  rowsDeleted,
  areFilterFieldsDisplayed,
  isSearchFieldDisplayed,
  filterTerms,
  filterResultForEachColumn,
  stripped,
  orderBy,
  searchTerm,
  font,
  data: {
    ...data,
    columns: [columnAction, ...data.columns]
  },
  rowsEdited,
  rowsGlobalEdited,
  rowsSelected,
  features: {
    ...features,
    userConfiguration: {
      ...userConfiguration,
      columnsOrder: ["o2xpActions", ...userConfiguration.columnsOrder]
    },
    additionalActions: [],
    additionalIcons: []
  }
};

export default mergedSimpleOptionsSampleWidthResize;
