import {
  title,
  dimensions,
  keyColumn,
  pagination,
  font,
  refreshRows,
  isRefreshing,
  searchTerm,
  features
} from "./optionsObjectSample";

const storeNoDataSample = {
  datatableReducer: {
    title,
    dimensions,
    keyColumn,
    font,
    pagination,
    data: {
      columns: [],
      rows: []
    },
    rowsEdited: [],
    rowsSelected: [],
    refreshRows,
    isRefreshing,
    searchTerm,
    actions: null,
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
