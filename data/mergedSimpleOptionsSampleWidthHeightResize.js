import {
  title,
  dimensions,
  keyColumn,
  font,
  data,
  pagination,
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleWidthHeightResize = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      width: "90vw",
      widthNumber: 1800,
      totalWidthNumber: 1138
    },
    body: {
      height: "30vh",
      heightNumber: 150
    },
    columnSizeMultiplier: 1478 / 860
  },
  pagination: {
    ...pagination,
    rowsCurrentPage: data.rows
  },
  keyColumn,
  font,
  data,
  features: {
    ...features,
    additionalIcons: []
  }
};

export default mergedSimpleOptionsSampleWidthHeightResize;
