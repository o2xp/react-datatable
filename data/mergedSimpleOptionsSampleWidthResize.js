import {
  title,
  dimensions,
  keyColumn,
  font,
  data,
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleWidthResize = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      width: "90vw",
      widthNumber: 1800,
      totalWidthNumber: 1138
    },
    columnSizeMultiplier: 1478 / 860
  },
  keyColumn,
  font,
  data,
  features: {
    ...features,
    additionalIcons: []
  }
};

export default mergedSimpleOptionsSampleWidthResize;
