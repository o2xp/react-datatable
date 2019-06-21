import mergedSimpleOptionsSample from "./mergedSimpleOptionsSample";
import customTableBodyRowSample from "./customTableBodyRowSample";

const storeCustomTableBodyRowComponentSample = {
  datatableReducer: mergedSimpleOptionsSample,
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: customTableBodyRowSample,
    CustomTableHeaderCell: null,
    CustomTableHeaderRow: null,
    customDataTypes: []
  },
  notifierReducer: { notifications: [] }
};

export default storeCustomTableBodyRowComponentSample;
