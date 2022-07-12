import {
  title,
  keyColumn,
  font,
  data,
  additionalIcons,
  selectionIcons,
  additionalActions,
  areFilterFieldsDisplayed,
  isSearchFieldDisplayed,
  filterTerms,
  filterResultForEachColumn
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
  areFilterFieldsDisplayed,
  isSearchFieldDisplayed,
  filterTerms,
  filterResultForEachColumn,
  keyColumn,
  font,
  data,
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    canDelete: true,
    canSearch: true,
    canFilter: true,
    canDuplicate: true,
    canRefreshRows: true,
    canOrderColumns: true,
    canCreatePreset: false,
    columnsPresetsToDisplay: [],
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
