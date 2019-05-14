import {
  title,
  keyColumn,
  font,
  data,
  selection,
  additionalIcons,
  selectionIcons
} from "./optionsObjectSample";

const maximumOptionsSample = {
  title,
  dimensions: {
    datatable: {
      width: "500px"
    },
    header: {
      height: "60px"
    },
    body: {
      height: "30vh"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn,
  font,
  data,
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    canDelete: true,
    canSearch: true,
    canRefreshRows: true,
    canFilterColumns: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["id", "name", "age"],
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

export default maximumOptionsSample;
