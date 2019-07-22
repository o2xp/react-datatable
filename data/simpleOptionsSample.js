import { title, keyColumn, data, selectionIcons } from "./optionsObjectSample";

const simpleOptionsSample = {
  title,
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
    canDownload: true,
    canDelete: true,
    canSelectRow: true,
    selectionIcons
  }
};

export default simpleOptionsSample;
