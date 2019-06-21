import notifierReducer from "../../../src/redux/reducers/notifierReducer";

const key = new Date().getTime() + Math.random();
const notification = {
  message: "Refresh error.",
  key,
  options: {
    key,
    variant: "error"
  }
};

const key2 = new Date().getTime() + Math.random();
const notification2 = {
  message: "Refresh error.",
  key: key2,
  options: {
    key: key2,
    variant: "info"
  }
};
describe("notifierReducer reducer", () => {
  it("should return the initial state", () => {
    expect(notifierReducer(undefined, {})).toEqual({ notifications: [] });
  });

  describe("should handle ENQUEUE_SNACKBAR", () => {
    it("new notification", () => {
      const result = notifierReducer(undefined, {
        type: "ENQUEUE_SNACKBAR",
        payload: notification
      });

      expect(result).toEqual({ notifications: [notification] });
    });

    it("with multiple notification", () => {
      let result = notifierReducer(undefined, {
        type: "ENQUEUE_SNACKBAR",
        payload: notification
      });
      result = notifierReducer(result, {
        type: "ENQUEUE_SNACKBAR",
        payload: notification2
      });

      expect(result).toEqual({ notifications: [notification, notification2] });
    });
  });

  describe("should handle CLOSE_SNACKBAR", () => {
    it("with one notification", () => {
      const result = notifierReducer(
        { notifications: [notification] },
        {
          type: "CLOSE_SNACKBAR",
          payload: key
        }
      );

      const resultExpected = {
        notifications: [{ ...notification, dismissed: true }]
      };

      expect(result).toEqual(resultExpected);
    });
    it("with multiple notifications", () => {
      const result = notifierReducer(
        { notifications: [notification, notification2] },
        {
          type: "CLOSE_SNACKBAR",
          payload: key2
        }
      );

      const resultExpected = {
        notifications: [notification, { ...notification2, dismissed: true }]
      };

      expect(result).toEqual(resultExpected);
    });
  });
  describe("should handle REMOVE_SNACKBAR", () => {
    it("with one notification", () => {
      const result = notifierReducer(
        { notifications: [notification] },
        {
          type: "REMOVE_SNACKBAR",
          payload: key
        }
      );

      const resultExpected = {
        notifications: []
      };

      expect(result).toEqual(resultExpected);
    });
    it("with multiple notifications", () => {
      const result = notifierReducer(
        { notifications: [notification, notification2] },
        {
          type: "REMOVE_SNACKBAR",
          payload: key2
        }
      );

      const resultExpected = {
        notifications: [notification]
      };

      expect(result).toEqual(resultExpected);
    });
  });
});
