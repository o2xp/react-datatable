import mergedSimpleOptionsSample from "./mergedSimpleOptionsSample";
import customTableHeaderCellSample from "./customTableHeaderCellSample";
import textReducer from "./textReducer";

const storeCustomTableHeaderCellComponentSample = {
  datatableReducer: mergedSimpleOptionsSample,
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: null,
    CustomTableHeaderCell: customTableHeaderCellSample,
    CustomTableHeaderRow: null,
    customDataTypes: []
  },
  notifierReducer: [],
  textReducer
};

export default storeCustomTableHeaderCellComponentSample;
