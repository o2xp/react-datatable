import {
  title,
  dimensions,
  keyColumn,
  font,
  features
} from "./optionsObjectSample";

const storeNoDataSample = {
  datatableReducer: {
    title,
    dimensions,
    keyColumn,
    font,
    data: {
      columns: [],
      rows: []
    },
    features: {
      ...features,
      additionalIcons: []
    }
  },
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: null,
    CustomTableHeaderCell: null,
    CustomTableHeaderRow: null,
    customDataTypes: null
  }
};

export default storeNoDataSample;
