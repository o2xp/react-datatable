import mergedSimpleOptionsSample from "./mergedSimpleOptionsSample";
import customTableHeaderRowSample from "./customTableHeaderRowSample";

const storeCustomTableHeaderRowComponentSample = {
  datatableReducer: mergedSimpleOptionsSample,
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: null,
    CustomTableHeaderCell: null,
    CustomTableHeaderRow: customTableHeaderRowSample,
    customDataTypes: []
  },
  notifierReducer: { notifications: [] }
};

export default storeCustomTableHeaderRowComponentSample;
