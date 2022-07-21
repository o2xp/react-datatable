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

const mergedSimpleOptionsSampleWidthHeightResize = {
  title,
  currentScreen,
  dimensions: {
    ...dimensions,
    datatable: {
      width: "90vw",
      height: "40vh",
      widthNumber: 1800,
      totalWidthNumber: 1288
    },
    body: {
      heightNumber: 20
    },
    columnSizeMultiplier: 1228 / 1205
  },
  pagination: {
    ...pagination,
    rowsCurrentPage: data.rows
  },
  keyColumn,
  refreshRows,
  isRefreshing,
  areFilterFieldsDisplayed,
  isSearchFieldDisplayed,
  filterTerms,
  filterResultForEachColumn,
  stripped,
  newRows,
  rowsDeleted,
  orderBy,
  searchTerm,
  actions: null,
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

export default mergedSimpleOptionsSampleWidthHeightResize;
