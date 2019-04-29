export const initializeOptions = payload => ({
  type: "INITIALIZE_OPTIONS",
  payload
});

export const updateComponentSize = () => ({
  type: "UPDATE_COMPONENT_SIZE"
});

export const sortColumns = payload => ({
  type: "SORT_COLUMNS",
  payload
});

export const setRowsPerPage = payload => ({
  type: "SET_ROWS_PER_PAGE",
  payload
});

export const setPage = payload => ({
  type: "SET_PAGE",
  payload
});

export const updateOptions = payload => ({
  type: "UPDATE",
  payload
});
