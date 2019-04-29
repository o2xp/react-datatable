import {
  title,
  dimensions,
  keyColumn,
  font,
  data,
  pagination,
  features
} from "./optionsObjectSample";

const mergedSimpleOptionsSampleCustomSize = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      ...dimensions.datatable,
      totalWidthNumber: 1138
    }
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

export default mergedSimpleOptionsSampleCustomSize;
