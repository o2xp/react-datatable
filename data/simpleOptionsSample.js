import { title, keyColumn, data, selectionIcons, currentScreen } from "./optionsObjectSample";

const simpleOptionsSample = {
  title,
  currentScreen,
  dimensions: {
    datatable: {
      width: "90vw",
      height: "40vh"
    }
  },
  keyColumn,
  data,
  features: {
    canEdit: true,
    canPrint: true,
    canCreatePreset: true,
    canDownload: true,
    canDelete: true,
    canSelectRow: true,
    canSearch: null,
    canFilter: true,
    canSaveUserConfiguration: undefined,
    selectionIcons
  }
};

export default simpleOptionsSample;
