import mergedSimpleOptionsSample from "./mergedSimpleOptionsSample";

const storeNoCustomComponentsSample = {
  datatableReducer: mergedSimpleOptionsSample,
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: null,
    CustomTableHeaderCell: null,
    CustomTableHeaderRow: null,
    customDataTypes: []
  }
};

export default storeNoCustomComponentsSample;
