const defaultState = {
  notifications: []
};

const enqueueSnackbar = (state, payload) => {
  return {
    ...state,
    notifications: [
      ...state.notifications,
      {
        key: payload.key,
        ...payload
      }
    ]
  };
};

const closeSnackbar = (state, payload) => {
  return {
    ...state,
    notifications: state.notifications.map(notification =>
      notification.key === payload
        ? { ...notification, dismissed: true }
        : { ...notification }
    )
  };
};

const removeSnackbar = (state, payload) => {
  return {
    ...state,
    notifications: state.notifications.filter(
      notification => notification.key !== payload
    )
  };
};

export default (state = defaultState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "ENQUEUE_SNACKBAR":
      return enqueueSnackbar(state, payload);

    case "CLOSE_SNACKBAR":
      return closeSnackbar(state, payload);

    case "REMOVE_SNACKBAR":
      return removeSnackbar(state, payload);

    default:
      return state;
  }
};
