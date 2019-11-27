import mergedSimpleOptionsSample from "./mergedSimpleOptionsSample";
import customTableHeaderRowSample from "./customTableHeaderRowSample";
import textReducer from "./textReducer";

const storeCustomTableHeaderRowComponentSample = {
  datatableReducer: mergedSimpleOptionsSample,
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: null,
    CustomTableHeaderCell: null,
    CustomTableHeaderRow: customTableHeaderRowSample,
    customDataTypes: []
  },
  notifierReducer: { notifications: [] },
  textReducer
};

export default storeCustomTableHeaderRowComponentSample;
