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
