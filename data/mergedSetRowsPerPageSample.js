import { chunk } from "lodash";
import {
  title,
  dimensions,
  keyColumn,
  font,
  data,
  columnAction,
  userConfiguration,
  rowsEdited,
  rowsSelected,
  refreshRows,
  isRefreshing,
  stripped,
  orderBy,
  searchTerm,
  features
} from "./optionsObjectSample";

const mergedSetRowsPerPageSample = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      ...dimensions.datatable,
      totalWidthNumber: 0
    }
  },
  pagination: {
    pageSelected: 1,
    pageTotal: 20,
    rowsPerPageSelected: 10,
    rowsCurrentPage: chunk(data.rows, 10)[0]
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

export default mergedSetRowsPerPageSample;
