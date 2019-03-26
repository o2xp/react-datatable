const defaultState = {
  counter: 0
};

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        counter: state.counter + 1
      };
    case "DECREMENT":
      return {
        counter: state.counter - 1
      };
    default:
      return state;
  }
};

export default reducers;
