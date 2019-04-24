import {
  title,
  dimensions,
  keyColumn,
  font,
  data,
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleHeightResize = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      ...dimensions.datatable,
      totalWidthNumber: 1138
    },
    body: {
      height: "30vh",
      heightNumber: 150
    }
  },
  keyColumn,
  font,
  data,
  features: {
    ...features,
    additionalIcons: []
  }
};

export default mergedSimpleOptionsSampleHeightResize;
