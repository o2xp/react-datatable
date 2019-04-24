import {
  title,
  keyColumn,
  data,
  selectionIcons,
  selection
} from "./optionsObjectSample";

const simpleOptionsSample = {
  title,
  dimensions: {
    datatable: {
      width: "90vw"
    },
    body: {
      height: "30vh"
    }
  },
  keyColumn,
  data,
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    selection,
    selectionIcons
  }
};

export default simpleOptionsSample;
