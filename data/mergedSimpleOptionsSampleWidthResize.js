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
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleWidthResize = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      width: "90vw",
      widthNumber: 1800,
      totalWidthNumber: 1308
    },
    columnSizeMultiplier: 1228 / 980
  },
  pagination: {
    ...pagination,
    rowsCurrentPage: data.rows
  },
  keyColumn,
  font,
  data: {
    ...data,
    columns: [columnAction, ...data.columns]
  },
  rowsEdited,
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
