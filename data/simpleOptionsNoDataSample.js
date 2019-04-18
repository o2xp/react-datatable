import {
  title,
  keyColumn,
  columns,
  selectionIcons
} from "./optionsObjectSample";

const simpleOptionsNoDataSample = {
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
  data: {
    columns,
    rows: []
  },
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    selectionIcons
  }
};
export default simpleOptionsNoDataSample;
