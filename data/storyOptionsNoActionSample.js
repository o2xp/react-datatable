import { title, keyColumn, data } from "./optionsObjectSample";
import rows from "./rows";

const storyOptionsNoActionSample = {
  title,
  dimensions: {
    datatable: {
      width: "90vw",
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
    canDownload: true,
    canSearch: true,
    canRefreshRows: true,
    canOrderColumns: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: [
        "id",
        "name",
        "age",
        "adult",
        "birthDate",
        "eyeColor",
        "iban"
      ],
      copyToClipboard: true
    }
  }
};

export default storyOptionsNoActionSample;
