export const enqueueSnackbar = payload => {
  const key = payload.options && payload.options.key;

  return {
    type: "ENQUEUE_SNACKBAR",
    payload: {
      ...payload,
      key
    }
  };
};

export const closeSnackbar = payload => ({
  type: "CLOSE_SNACKBAR",
  payload
});

export const removeSnackbar = payload => ({
  type: "REMOVE_SNACKBAR",
  payload
});
