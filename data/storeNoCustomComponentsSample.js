import mergedSimpleOptionsSample from "./mergedSimpleOptionsSample";
import textReducer from "./textReducer";

const storeNoCustomComponentsSample = {
  datatableReducer: mergedSimpleOptionsSample,
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: null,
    CustomTableHeaderCell: null,
    CustomTableHeaderRow: null,
    customDataTypes: []
  },
  notifierReducer: { notifications: [] },
  textReducer
};

export default storeNoCustomComponentsSample;
