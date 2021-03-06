import mergedPageSample from "./mergedPageSample";
import customTableBodyCellSample from "./customTableBodyCellSample";
import customTableBodyRowSample from "./customTableBodyRowSample";
import customTableHeaderCellSample from "./customTableHeaderCellSample";
import customTableHeaderRowSample from "./customTableHeaderRowSample";
import customDataTypesSample from "./customDataTypesSample";
import textReducer from "./textReducer";

const storeSampleWithPages = {
  datatableReducer: mergedPageSample,
  customComponentsReducer: {
    CustomTableBodyCell: customTableBodyCellSample,
    CustomTableBodyRow: customTableBodyRowSample,
    CustomTableHeaderCell: customTableHeaderCellSample,
    CustomTableHeaderRow: customTableHeaderRowSample,
    customDataTypes: customDataTypesSample
  },
  notifierReducer: { notifications: [] },
  textReducer
};

export default storeSampleWithPages;
