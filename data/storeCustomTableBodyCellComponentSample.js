import mergedSimpleOptionsSample from "./mergedSimpleOptionsSample";
import customTableBodyCellSample from "./customTableBodyCellSample";
import textReducer from "./textReducer";

const storeCustomTableBodyCellComponentSample = {
  datatableReducer: mergedSimpleOptionsSample,
  customComponentsReducer: {
    CustomTableBodyCell: customTableBodyCellSample,
    CustomTableBodyRow: null,
    CustomTableHeaderCell: null,
    CustomTableHeaderRow: null,
    customDataTypes: []
  },
  notifierReducer: { notifications: [] },
  textReducer
};

export default storeCustomTableBodyCellComponentSample;
