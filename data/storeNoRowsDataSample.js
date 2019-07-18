import {
  title,
  dimensions,
  keyColumn,
  font,
  pagination,
  features,
  refreshRows,
  isRefreshing,
  rowsGlobalEdited,
  stripped,
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
    rowsGlobalEdited,
    rowsSelected: [],
    actions: null,
    refreshRows,
    isRefreshing,
    stripped,
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
