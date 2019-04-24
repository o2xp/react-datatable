import {
  dimensions,
  keyColumn,
  font,
  data,
  userConfiguration,
  rowsPerPage
} from "./optionsObjectSample";

const mergedMinimumOptionsSample = {
  title: "",
  dimensions: {
    ...dimensions,
    datatable: {
      width: "100vw",
      widthNumber: 1024,
      totalWidthNumber: 0
    },
    body: {
      height: "300px",
      heightNumber: 300
    }
  },
  keyColumn,
  data,
  font,
  features: {
    canEdit: false,
    canPrint: false,
    canDownload: false,
    canSearch: false,
    canRefreshRows: false,
    canFilterColumns: false,
    canSaveUserConfiguration: false,
    userConfiguration,
    rowsPerPage,
    selection: {
      rowsSelectable: false,
      selectPageRows: false,
      selectAllRows: false
    },
    additionalIcons: [],
    selectionIcons: []
  }
};
export default mergedMinimumOptionsSample;
