import {
  title,
  dimensions,
  keyColumn,
  font,
  pagination,
  features,
  columns
} from "./optionsObjectSample";

const storeNoRowsDataSample = {
  datatableReducer: {
    title,
    dimensions,
    keyColumn,
    font,
    pagination,
    data: {
      columns,
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

export default storeNoRowsDataSample;
