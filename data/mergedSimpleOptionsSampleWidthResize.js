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
  rowsSelected,
  refreshRows,
  isRefreshing,
  orderBy,
  searchTerm,
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleWidthResize = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      width: "90vw",
      widthNumber: 1800,
      totalWidthNumber: 1288
    },
    columnSizeMultiplier: 1228 / 960
  },
  pagination: {
    ...pagination,
    rowsCurrentPage: data.rows
  },
  keyColumn,
  actions: null,
  refreshRows,
  isRefreshing,
  orderBy,
  searchTerm,
  font,
  data: {
    ...data,
    columns: [columnAction, ...data.columns]
  },
  rowsEdited,
  rowsSelected,
  features: {
    ...features,
    userConfiguration: {
      ...userConfiguration,
      columnsOrder: ["actions", ...userConfiguration.columnsOrder]
    },
    additionalIcons: []
  }
};

export default mergedSimpleOptionsSampleWidthResize;
