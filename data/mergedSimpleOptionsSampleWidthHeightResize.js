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
  stripped,
  orderBy,
  searchTerm,
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleWidthHeightResize = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      width: "90vw",
      widthNumber: 1800,
      totalWidthNumber: 1288
    },
    body: {
      height: "30vh",
      heightNumber: 150
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
  orderBy,
  searchTerm,
  actions: null,
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
      columnsOrder: ["o2xpActions", ...userConfiguration.columnsOrder]
    },
    additionalIcons: []
  }
};

export default mergedSimpleOptionsSampleWidthHeightResize;
