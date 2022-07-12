import {
  title,
  keyColumn,
  font,
  data,
  additionalIcons,
  selectionIcons,
  additionalActions
} from "./optionsObjectSample";

const maximumOptionsSample = {
  title,
  dimensions: {
    datatable: {
      width: "500px",
      height: "40vh"
    },
    row: {
      height: "33px"
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
    canDuplicate: true,
    canRefreshRows: true,
    canCreatePreset: false,
    canOrderColumns: true,
    canSelectRow: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["id", "name", "age"],
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

export default maximumOptionsSample;
