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
  newRows,
  rowsDeleted,
  orderBy,
  searchTerm,
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleHeightResize = {
  title,
  tableRef: null,
  dimensions: {
    ...dimensions,
    datatable: {
      ...dimensions.datatable,
      height: "40vh",
      totalWidthNumber: 1288
    },
    body: {
      heightNumber: 30
    }
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

export default mergedSimpleOptionsSampleHeightResize;
