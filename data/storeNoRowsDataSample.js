import {
  title,
  dimensions,
  keyColumn,
  font,
  pagination,
  features,
  refreshRows,
  isRefreshing,
  orderBy,
  searchTerm,
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
    rowsEdited: [],
    rowsSelected: [],
    actions: null,
    refreshRows,
    isRefreshing,
    orderBy,
    searchTerm,
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
  },
  notifierReducer: { notifications: [] }
};

export default storeNoRowsDataSample;
