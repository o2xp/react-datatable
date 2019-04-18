import {
  dimensions,
  keyColumn,
  font,
  data,
  selection,
  additionalIcons,
  selectionIcons
} from "./optionsObjectSample";

const mergedMaximumOptionsSample = {
  title: "My super datatable",
  dimensions: {
    ...dimensions,
    datatable: {
      width: "500px",
      widthNumber: 500
    }
  },
  keyColumn,
  font,
  data,
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    canSearch: true,
    canRefreshRows: true,
    canFilterColumns: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["id", "name", "age"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [40],
      selected: 40
    },
    selection,
    additionalIcons,
    selectionIcons
  }
};

export default mergedMaximumOptionsSample;
