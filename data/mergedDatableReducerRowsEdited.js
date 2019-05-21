import {
  title,
  dimensions,
  keyColumn,
  font,
  data,
  columnAction,
  userConfiguration,
  pagination,
  features
} from "./optionsObjectSample";

const mergedDatableReducerRowsEdited = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      ...dimensions.datatable,
      totalWidthNumber: 0
    }
  },
  data: {
    ...data,
    columns: [columnAction, ...data.columns]
  },
  pagination: {
    ...pagination,
    rowsCurrentPage: data.rows
  },
  keyColumn,
  font,
  rowsEdited: [
    { ...data.rows[0], idOfColumnErr: [] },
    { ...data.rows[5], idOfColumnErr: [] },
    { ...data.rows[45], idOfColumnErr: [] }
  ],
  features: {
    ...features,
    userConfiguration: {
      ...userConfiguration,
      columnsOrder: ["actions", ...userConfiguration.columnsOrder]
    },
    additionalIcons: []
  }
};

export default mergedDatableReducerRowsEdited;
