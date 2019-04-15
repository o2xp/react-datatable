import equal from "fast-deep-equal";
import datatableReducer from "../../../src/redux/reducers/datatableReducer";
import {
  defaultOptionsSample,
  simpleOptionsSample,
  mergedSimpleOptionsSample,
  minimumOptionsSample,
  mergedMinimumOptionsSample,
  maximumOptionsSample,
  mergedMaximumOptionsSample
} from "../../../data/samples";

const sortingOptions = options => {
  const res = options;
  res.data.columns = res.data.columns.map(el => el.id).sort();
  res.data.rows = res.data.rows.map(el => el.id).sort();
  res.features.additionalIcons = res.features.additionalIcons
    .map(el => el.tooltip)
    .sort();
  res.features.selectionIcons = res.features.selectionIcons
    .map(el => el.tooltip)
    .sort();

  return res;
};

describe("datatableReducer reducer", () => {
  it("should return the initial state", () => {
    expect(datatableReducer(undefined, {})).toEqual(defaultOptionsSample);
  });

  describe("should handle INITIALIZE_OPTIONS", () => {
    it("simple options", () => {
      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: simpleOptionsSample
      });

      const initializedOptionsSorted = sortingOptions(initializedOptions);
      const mergedSimpleOptionsSampleSorted = sortingOptions(
        mergedSimpleOptionsSample
      );

      expect(
        equal(initializedOptionsSorted, mergedSimpleOptionsSampleSorted)
      ).toBeTruthy();
    });

    it("minimum options", () => {
      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: minimumOptionsSample
      });

      const initializedOptionsSorted = sortingOptions(initializedOptions);
      const mergedMinimumOptionSampleSorted = sortingOptions(
        mergedMinimumOptionsSample
      );

      expect(
        equal(initializedOptionsSorted, mergedMinimumOptionSampleSorted)
      ).toBeTruthy();
    });

    it("maximum options", () => {
      const initializedOptions = datatableReducer(undefined, {
        type: "INITIALIZE_OPTIONS",
        payload: maximumOptionsSample
      });

      const initializedOptionsSorted = sortingOptions(initializedOptions);
      const mergedMaximumOptionsSampleSorted = sortingOptions(
        mergedMaximumOptionsSample
      );

      expect(
        equal(initializedOptionsSorted, mergedMaximumOptionsSampleSorted)
      ).toBeTruthy();
    });
  });
});
