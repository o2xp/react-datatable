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
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleHeightResize = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      ...dimensions.datatable,
      totalWidthNumber: 1288
    },
    body: {
      height: "30vh",
      heightNumber: 150
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

export default mergedSimpleOptionsSampleHeightResize;
