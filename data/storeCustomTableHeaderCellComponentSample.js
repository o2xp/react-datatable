import mergedSimpleOptionsSample from "./mergedSimpleOptionsSample";
import customTableHeaderCellSample from "./customTableHeaderCellSample";

const storeCustomTableHeaderCellComponentSample = {
  datatableReducer: mergedSimpleOptionsSample,
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: null,
    CustomTableHeaderCell: customTableHeaderCellSample,
    CustomTableHeaderRow: null,
    customDataTypes: []
  },
  notifierReducer: []
};

export default storeCustomTableHeaderCellComponentSample;
