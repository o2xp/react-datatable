import {
  title,
  dimensions,
  keyColumn,
  font,
  data,
  columnAction,
  userConfiguration,
  pagination,
  rowsSelected,
  refreshRows,
  isRefreshing,
  stripped,
  searchTerm,
  orderBy,
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
  actions: null,
  refreshRows,
  isRefreshing,
  stripped,
  searchTerm,
  font,
  orderBy,
  rowsEdited: [
    { ...data.rows[0], idOfColumnErr: [], hasBeenEdited: false },
    { ...data.rows[5], idOfColumnErr: [], hasBeenEdited: false },
    { ...data.rows[45], idOfColumnErr: [], hasBeenEdited: false }
  ],
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

export default mergedDatableReducerRowsEdited;
