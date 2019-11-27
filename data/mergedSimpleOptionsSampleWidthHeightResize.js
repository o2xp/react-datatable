import {
  title,
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
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleWidthHeightResize = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      width: "90vw",
      height: "40vh",
      widthNumber: 1800,
      totalWidthNumber: 1288
    },
    body: {
      heightNumber: 30
    },
    columnSizeMultiplier: 1228 / 960
  },
  pagination: {
    ...pagination,
    rowsCurrentPage: data.rows
  },
  keyColumn,
  refreshRows,
  isRefreshing,
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
