import { chunk } from "lodash";
import {
  title,
  currentScreen,
  dimensions,
  keyColumn,
  font,
  data,
  columnAction,
  userConfiguration,
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

const mergedSetRowsPerPageSample = {
  title,
  currentScreen,
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
    rowsCurrentPage: chunk(data.rows, 10)[0],
    rowsToUse: data.rows
  },
  keyColumn,
  refreshRows,
  isRefreshing,
  stripped,
  orderBy,
  searchTerm,
  areFilterFieldsDisplayed,
  isSearchFieldDisplayed,
  filterTerms,
  filterResultForEachColumn,
  newRows,
  rowsDeleted,
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

export default mergedSetRowsPerPageSample;
