import counterReducer from "../src/redux/reducers/counterReducer";

describe("reducers", () => {
  describe("counterReducer", () => {
    it("should provide the initial state", () => {
      expect(counterReducer(undefined, {})).toEqual({ counter: 0 });
    });

    it("should handle INCREMENT action", () => {
      expect(counterReducer({ counter: 1 }, { type: "INCREMENT" })).toEqual({
        counter: 2
      });
    });

    it("should handle DECREMENT action", () => {
      expect(counterReducer({ counter: 1 }, { type: "DECREMENT" })).toEqual({
        counter: 0
      });
    });

    it("should ignore unknown actions", () => {
      expect(counterReducer({ counter: 1 }, { type: "unknown" })).toEqual({
        counter: 1
      });
    });
  });
});
