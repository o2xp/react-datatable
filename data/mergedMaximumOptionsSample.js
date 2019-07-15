import { chunk } from "lodash";
import {
  dimensions,
  keyColumn,
  font,
  data,
  additionalIcons,
  rowsEdited,
  rowsSelected,
  columnAction,
  refreshRows,
  isRefreshing,
  stripped,
  searchTerm,
  orderBy,
  selectionIcons
} from "./optionsObjectSample";

const mergedMaximumOptionsSample = {
  title: "My super datatable",
  dimensions: {
    ...dimensions,
    datatable: {
      width: "500px",
      widthNumber: 500,
      totalWidthNumber: 0
    }
  },
  rowsEdited,
  rowsSelected,
  refreshRows,
  isRefreshing,
  stripped,
  searchTerm,
  actions: null,
  keyColumn,
  font,
  orderBy,
  data: {
    ...data,
    columns: [columnAction, ...data.columns]
  },
  pagination: {
    pageSelected: 1,
    pageTotal: 4,
    rowsPerPageSelected: 50,
    rowsCurrentPage: chunk(data.rows, 50)[0]
  },
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    canSearch: true,
    canDelete: true,
    canRefreshRows: true,
    canSelectRow: true,
    canOrderColumns: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["o2xpActions", "id", "name", "age"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [50],
      selected: 50
    },
    additionalIcons,
    selectionIcons
  }
};

export default mergedMaximumOptionsSample;
