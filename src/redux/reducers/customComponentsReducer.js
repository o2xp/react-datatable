const defaultState = {
  customProps: null,
  CustomTableBodyCell: null,
  CustomTableBodyRow: null,
  CustomTableHeaderCell: null,
  CustomTableHeaderRow: null,
  customDataTypes: []
};

const customComponentsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "INITIALIZE_CUSTOM_COMPONENTS":
      return action.payload;
    default:
      return state;
  }
};

export default customComponentsReducer;
