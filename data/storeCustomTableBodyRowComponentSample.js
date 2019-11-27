import mergedSimpleOptionsSample from "./mergedSimpleOptionsSample";
import customTableBodyRowSample from "./customTableBodyRowSample";
import textReducer from "./textReducer";

const storeCustomTableBodyRowComponentSample = {
  datatableReducer: mergedSimpleOptionsSample,
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: customTableBodyRowSample,
    CustomTableHeaderCell: null,
    CustomTableHeaderRow: null,
    customDataTypes: []
  },
  notifierReducer: { notifications: [] },
  textReducer
};

export default storeCustomTableBodyRowComponentSample;
