import {
  title,
  dimensions,
  keyColumn,
  pagination,
  font,
  refreshRows,
  isRefreshing,
  rowsGlobalEdited,
  stripped,
  orderBy,
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
    rowsGlobalEdited,
    rowsSelected: [],
    refreshRows,
    isRefreshing,
    stripped,
    orderBy,
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
  },
  notifierReducer: { notifications: [] }
};

export default storeNoDataSample;
