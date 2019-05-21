import { title, keyColumn, data } from "./optionsObjectSample";
import rows from "./rows";

const storyOptionsNoActionSample = {
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
    canPrint: true,
    canDownload: true
  }
};

export default storyOptionsNoActionSample;
