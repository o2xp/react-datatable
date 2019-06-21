import * as actions from "../../../src/redux/actions/notifierActions";

describe("Notifier actions", () => {
  it("should create an action to enqueue Snackbar", () => {
    const key = new Date().getTime() + Math.random();
    const payload = {
      message: "Refresh error.",
      key,
      options: {
        key,
        variant: "error"
      }
    };
    const expectedAction = {
      type: "ENQUEUE_SNACKBAR",
      payload
    };
    expect(actions.enqueueSnackbar(payload)).toEqual(expectedAction);
  });

  it("should create an action to close Snackbar", () => {
    const payload = new Date().getTime() + Math.random();
    const expectedAction = {
      type: "CLOSE_SNACKBAR",
      payload
    };
    expect(actions.closeSnackbar(payload)).toEqual(expectedAction);
  });

  it("should create an action to remove Snackbar", () => {
    const payload = new Date().getTime() + Math.random();
    const expectedAction = {
      type: "REMOVE_SNACKBAR",
      payload
    };
    expect(actions.removeSnackbar(payload)).toEqual(expectedAction);
  });
});
