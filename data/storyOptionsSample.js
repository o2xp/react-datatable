import {
  title,
  keyColumn,
  data,
  selectionIcons,
  selection
} from "./optionsObjectSample";
import rows from "./rows";

const storyOptionsSample = {
  title,
  dimensions: {
    datatable: {
      width: "90vw"
    },
    body: {
      height: "50vh"
    }
  },
  keyColumn,
  data: {
    ...data,
    rows
  },
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    selection,
    selectionIcons
  }
};

export default storyOptionsSample;
