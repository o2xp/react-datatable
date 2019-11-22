import { chunk } from "lodash";
import {
  dimensions,
  keyColumn,
  font,
  data,
  additionalIcons,
  rowsEdited,
  rowsGlobalEdited,
  rowsSelected,
  columnAction,
  refreshRows,
  isRefreshing,
  stripped,
  searchTerm,
  newRows,
  rowsDeleted,
  orderBy,
  selectionIcons,
  additionalActions
} from "./optionsObjectSample";

const mergedMaximumOptionsSample = {
  title: "My super datatable",
   
  text: {
    noRow: "There is no data yet, try to refresh"
  },
  dimensions: {
    ...dimensions,
    datatable: {
      ...dimensions.datatable,
      width: "500px",
      widthNumber: 500,
      totalWidthNumber: 0
    }
  },
  rowsEdited,
  rowsGlobalEdited,
  rowsSelected,
  refreshRows,
  isRefreshing,
  newRows,
  rowsDeleted,
  stripped,
  searchTerm,
  actions: null,
  keyColumn,
  font,
  orderBy,
  data: {
    ...data,
    columns: [{ ...columnAction, colSize: "250px" }, ...data.columns]
  },
  pagination: {
    pageSelected: 1,
    pageTotal: 4,
    rowsPerPageSelected: 50,
    rowsCurrentPage: chunk(data.rows, 50)[0]
  },
  features: {
    canEdit: true,
    canEditRow: null,
    canGlobalEdit: false,
    canAdd: false,
    canPrint: true,
    canDownload: true,
    canDuplicate: true,
    canSearch: true,
    canDelete: true,
    canRefreshRows: true,
    canSelectRow: true,
    canOrderColumns: true,
    canSaveUserConfiguration: true,
    editableIdNewRow: [],
    userConfiguration: {
      columnsOrder: ["o2xpActions", "id", "name", "age"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [50],
      selected: 50
    },
    additionalActions,
    additionalIcons,
    selectionIcons
  }
};

export default mergedMaximumOptionsSample;
