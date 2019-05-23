import { chunk } from "lodash";
import {
  dimensions,
  keyColumn,
  font,
  data,
  selection,
  additionalIcons,
  rowsEdited,
  columnAction,
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
  actionsRow: null,
  keyColumn,
  font,
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
    canFilterColumns: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["actions", "id", "name", "age"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [50],
      selected: 50
    },
    selection,
    additionalIcons,
    selectionIcons
  }
};

export default mergedMaximumOptionsSample;
